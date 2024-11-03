
export interface Item {
    id: number;
    name: string;
  }
  
  export interface AppState {
    items: Item[];
    theme: 'light' | 'dark';
    status: 'idle' | 'loading' | 'failed';
  }
  