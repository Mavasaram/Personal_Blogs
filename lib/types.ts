export interface BlogPost {
  id: string;
  title: string;
  content: string; // HTML
  publishedAt: string; // ISO date string
  labels: string[];
  originalUrl: string; // original Blogspot URL
  slug: string[]; // e.g. ['2021', '09', 'reflection-1-sep-26th']
  source: 'blogspot' | 'local';
}
