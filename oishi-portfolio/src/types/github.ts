export interface GitHubArticle {
  slug: string;
  title: string;
  emoji: string;
  type: 'tech' | 'idea';
  topics: string[];
  published: boolean;
  published_at: string;
}

export interface ZennFrontMatter {
  title?: string;
  emoji?: string;
  type?: 'tech' | 'idea';
  topics?: string[];
  published?: boolean;
  published_at?: string;
}

export interface GraphQLEntry {
  name: string;
  type: string;
  object?: {
    text?: string;
  };
}

export interface GraphQLResponse {
  data?: {
    repository?: {
      object?: {
        entries?: GraphQLEntry[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}