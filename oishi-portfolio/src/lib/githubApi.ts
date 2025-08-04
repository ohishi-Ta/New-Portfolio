import matter from 'gray-matter';
import {
  GitHubArticle,
  GraphQLResponse,
  GraphQLEntry,
  ZennFrontMatter
} from '../types/github';

// 設定をここで管理
const GITHUB_CONFIG = {
  username: 'ohishi-Ta', // ここでユーザー名を設定
  repo: 'Zenn',
};

export async function getArticlesWithGraphQL(
  username: string = GITHUB_CONFIG.username,
  repo: string = GITHUB_CONFIG.repo
): Promise<GitHubArticle[]> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  if (!token) {
    console.error('NEXT_PUBLIC_GITHUB_TOKEN が設定されていません');
    return [];
  }

  const query = `
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        object(expression: "HEAD:articles") {
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
      }
    }
  `;

  try {
    console.time('GraphQL取得');
    
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          owner: username,
          name: repo
        }
      }),
      // キャッシュ設定
      next: { revalidate: 3600 } // 1時間キャッシュ
    });

    if (!response.ok) {
      throw new Error(`GraphQL API Error: ${response.status}`);
    }

    const result: GraphQLResponse = await response.json();
    
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return [];
    }

    const entries = result.data?.repository?.object?.entries || [];
    console.log(`${entries.length}個のファイルを取得`);

    const articles: GitHubArticle[] = entries
      .filter((entry: GraphQLEntry) =>
        entry.name.endsWith('.md') &&
        entry.type === 'blob' &&
        entry.object?.text
      )
      .map((entry: GraphQLEntry): GitHubArticle | null => {
        try {
          if (!entry.object?.text) return null;
          
          const { data: frontMatter }: { data: ZennFrontMatter } = matter(entry.object.text);
          
          return {
            slug: entry.name.replace('.md', ''),
            title: frontMatter.title || 'Untitled',
            emoji: frontMatter.emoji || '📝',
            type: frontMatter.type || 'tech',
            topics: frontMatter.topics || [],
            published: frontMatter.published !== false,
            published_at: frontMatter.published_at || '',
          };
        } catch (error) {
          console.error(`Front Matter解析エラー: ${entry.name}`, error);
          return null;
        }
      })
      .filter((article): article is GitHubArticle =>
        article !== null && article.published
      )
      .sort((a: GitHubArticle, b: GitHubArticle) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

    console.timeEnd('GraphQL取得');
    console.log(`${articles.length}件の記事を処理完了`);
    
    return articles;
  } catch (error) {
    console.error('GraphQL取得エラー:', error);
    return [];
  }
}

// 簡単に記事を取得するためのヘルパー関数
export async function getArticles(limit?: number): Promise<GitHubArticle[]> {
  const allArticles = await getArticlesWithGraphQL();
  
  // limitが指定されている場合のみ制限
  if (limit && limit > 0) {
    return allArticles.slice(0, limit);
  }
  
  // limitが未指定またはnullの場合は全件返す
  return allArticles;
}