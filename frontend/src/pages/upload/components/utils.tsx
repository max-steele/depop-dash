export type RowItem = {
  title: string;
  files: (FileWithPreview | null)[]
  isSelected: boolean;
  filter: string;
};

export type Filter = {
  id: string;
  name: string;
}

export interface FileWithPreview extends File {
  preview: string;
};

export const INITIAL_LISTINGS: RowItem[] = [
  {
    title: 'Listing 1',
    files: Array(8).fill(null),
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 2',
    files: Array(8).fill(null),
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 3',
    files: Array(8).fill(null),
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 4',
    files: Array(8).fill(null),
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 5',
    files: Array(8).fill(null),
    isSelected: false,
    filter: ''
  },
];

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

export const calculateSelectedFilter = (rows: RowItem[]): string => {
  const uniqueFilters = new Set(rows.filter(row => row.isSelected).map(row => row.filter));
  return uniqueFilters.size === 1 ? [...uniqueFilters][0] : '';
};

export const isTitleUnique = (title: string, rows: RowItem[], index: number): boolean => {
  if (index === -1) {
    return !rows.some(row => title.toLowerCase() === row.title.toLowerCase());
  } else {
    return !rows.some(
      (curRow, rowIndex) =>
        rowIndex !== index && curRow.title.toLowerCase() === title.toLowerCase()
    );
  }
};