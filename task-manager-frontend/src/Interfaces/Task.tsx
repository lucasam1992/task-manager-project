export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Backlog' | 'To Do' | 'In Progress' | 'Done';
}
  
export interface TaskListProps {
  token: string;
}

export interface TaskData {
  title: string;
  description: string;
  status: 'Backlog' | 'To Do' | 'In Progress' | 'Done';
}