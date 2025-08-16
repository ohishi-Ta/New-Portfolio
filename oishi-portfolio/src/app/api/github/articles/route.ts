// app/api/github/articles/route.ts

import { NextResponse } from 'next/server';
import matter from 'gray-matter';

interface GraphQLEntry {
  name: string;
  type: string;
  object?: {
    text?: string;
  };
}

interface GraphQLResponse {
  data?: {
    repository?: {
      object?: {
        entries?: GraphQLEntry[];
      };
      tagMappingFile?: {
        text?: string;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

interface ArticleData {
  slug: string;
  title: string;
  emoji: string;
  type: string;
  topics: string[];
  published: boolean;
  published_at: string;
}

interface TagMapping {
  tagMapping: {
    [key: string]: string;
  };
}

// トピックを変換する関数
function transformTopics(topics: string[], mapping: { [key: string]: string }): string[] {
  return topics.map(topic => {
    // 完全一致を優先
    if (mapping[topic]) {
      return mapping[topic];
    }
    
    // 小文字変換での一致を確認
    const lowerTopic = topic.toLowerCase();
    if (mapping[lowerTopic]) {
      return mapping[lowerTopic];
    }
    
    // マッピングにない場合は元のトピックをそのまま返す
    return topic;
  });
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return NextResponse.json(
      { error: 'GitHub token is not configured' },
      { status: 500 }
    );
  }

  // 1回のGraphQLクエリで異なるブランチから記事とタグマッピングを取得
  const query = `
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        # mainブランチから記事を取得
        object(expression: "main:articles") {
          ... on Tree {
            entries {
              name
              type
              object {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
        # main-actionsブランチからタグマッピングを取得
        tagMappingFile: object(expression: "main-actions:public/tags-mapping.json") {
          ... on Blob {
            text
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          owner: 'ohishi-Ta',
          name: 'Zenn'
        }
      }),
      // next: { revalidate: 3600 } // 1時間キャッシュ
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`GraphQL API Error: ${response.status}`);
    }

    const result: GraphQLResponse = await response.json();
    
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return NextResponse.json(
        { error: 'Failed to fetch articles' },
        { status: 500 }
      );
    }

    // タグマッピングを解析
    let tagMapping: { [key: string]: string } = {};
    const tagMappingContent = result.data?.repository?.tagMappingFile?.text;
    
    if (tagMappingContent) {
      try {
        const parsedMapping: TagMapping = JSON.parse(tagMappingContent);
        tagMapping = parsedMapping.tagMapping || {};
        console.log('タグマッピング取得成功 (main-actionsブランチ):', Object.keys(tagMapping).length, '件');
      } catch (error) {
        console.warn('タグマッピングファイルの解析に失敗しました:', error);
      }
    } else {
      console.warn('タグマッピングファイルが見つかりませんでした (main-actionsブランチ)');
    }

    // 記事データを処理
    const entries = result.data?.repository?.object?.entries || [];
    
    const articles = entries
      .filter((entry: GraphQLEntry) =>
        entry.name.endsWith('.md') &&
        entry.type === 'blob' &&
        entry.object?.text
      )
      .map((entry: GraphQLEntry): ArticleData | null => {
        try {
          if (!entry.object?.text) return null;
          
          const { data: frontMatter } = matter(entry.object.text);
          
          // 元のトピックを取得
          const originalTopics = frontMatter.topics || [];
          
          // タグマッピングを適用
          const transformedTopics = transformTopics(originalTopics, tagMapping);
          
          return {
            slug: entry.name.replace('.md', ''),
            title: frontMatter.title || 'Untitled',
            emoji: frontMatter.emoji || '📝',
            type: frontMatter.type || 'tech',
            topics: transformedTopics, // 変換されたトピック
            published: frontMatter.published !== false,
            published_at: frontMatter.published_at || '',
          };
        } catch (error) {
          console.error(`Front Matter解析エラー: ${entry.name}`, error);
          return null;
        }
      })
      .filter((article: ArticleData | null): article is ArticleData => 
        article !== null && article.published
      )
      .sort((a: ArticleData, b: ArticleData) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

    console.log(`記事取得成功 (mainブランチ): ${articles.length}件`);

    return NextResponse.json(articles);
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}