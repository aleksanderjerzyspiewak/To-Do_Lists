export interface ListItem {
    id: number;
    title: string;
    description: string;
  }

  export interface Lists{
    id: number;
    title: string;
    description: string;
    left: ListItem[];
    middle: ListItem[];
    right: ListItem[];
  }