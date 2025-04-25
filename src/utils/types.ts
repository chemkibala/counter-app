export interface Task {
  id: number;
  title: string;
  completed?: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}
