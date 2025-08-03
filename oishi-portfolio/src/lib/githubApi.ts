import matter from 'gray-matter';
import {
  GitHubArticle,
  GraphQLResponse,
  GraphQLEntry,
  ZennFrontMatter
} from '../types/github';

export async function getArticlesWithGraphQL(
  username: string,
  repo: string = 'Zenn'
): Promise<GitHubArticle[]> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('GITHUB_TOKEN が設定されていません');
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