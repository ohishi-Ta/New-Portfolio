// app/api/github/route.ts

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

export async function GET() {
  const token = process.env.GITHUB_TOKEN; // NEXT_PUBLIC_なし
  
  if (!token) {
    return NextResponse.json(
      { error: 'GitHub token is not configured' },
      { status: 500 }
    );
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
      next: { revalidate: 3600 } // 1時間キャッシュ
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
      .filter((article: ArticleData | null): article is ArticleData => 
        article !== null && article.published
      )
      .sort((a: ArticleData, b: ArticleData) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

    return NextResponse.json(articles);
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}