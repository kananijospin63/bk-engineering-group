export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  location?: string;
  year?: number;
  client?: string;
  images?: string[];
  featured_image?: string;
  status: 'completed' | 'ongoing' | 'planned';
  created_at: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  short_description?: string;
  image?: string;
  icon?: string;
  order_index: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
  order_index: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  category?: string;
  thumbnail?: string;
  author: string;
  published: boolean;
  published_at?: string;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read_status: boolean;
  received_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface AdminStats {
  projects: number;
  services: number;
  team: number;
  posts: number;
  messages: number;
  unreadMessages: number;
}
