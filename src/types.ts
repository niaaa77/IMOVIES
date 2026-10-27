export interface Task {
  id: string;
  epicId: string;
  title: string;
  description: string;
  complexity: 'Low' | 'Medium' | 'High';
  estimatedHours: number;
  status: 'backlog' | 'in_progress' | 'review' | 'completed';
  acceptanceCriteria: string[];
}

export interface Epic {
  id: string;
  title: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  storiesCount: number;
  tasks: Task[];
}

export interface DemoVideoData {
  title: string;
  url: string;
  videoType: 'custom_url' | 'recorded' | 'uploaded' | 'built_in';
  duration: string;
  addedAt?: string;
  description: string;
  timestamps: { time: string; title: string }[];
  isApproved?: boolean;
}

export interface GithubSubmission {
  repoUrl: string;
  branch: string;
  submittedAt?: string;
  status: 'pending' | 'verified' | 'needs_update';
}

export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  genre: string[];
  duration: string;
  rating: number;
  description: string;
  releaseDate: string;
  theaters: string[];
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'standard' | 'premium' | 'vip_recliner';
  price: number;
  status: 'available' | 'selected' | 'occupied';
}
