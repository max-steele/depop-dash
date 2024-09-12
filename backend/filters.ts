export type Filter = {
  id: string;
  name: string;
}

export const FILTERS: Filter[] = [
  {
    id: 'grayscale',
    name: 'Monotone Grayscale'
  },
  {
    id: 'remove_bg',
    name: 'Remove Background'
  }
];