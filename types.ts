export interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  movieUrl: string;
}

export interface Slider {
  id: string;
  imageUrl: string;
}

export interface AppUser {
    uid: string;
    email: string;
}

export interface Group {
  id: string;
  groupName: string;
  link: string;
  buttonName: string;
}

// FIX: Add Order and ChartData type definitions to resolve compilation errors.
export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
}

export interface ChartData {
  name: string;
  revenue: number;
}