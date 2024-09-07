export type RowItem = {
  title: string;
  images: any[]
  isSelected: boolean;
  filter: string;
};

export type Filter = {
  id: string;
  name: string;
}

export const INITIAL_LISTINGS: RowItem[] = [
  {
    title: 'Listing 1',
    images: [],
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 2',
    images: [],
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 3',
    images: [],
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 4',
    images: [],
    isSelected: false,
    filter: ''
  },
  {
    title: 'Listing 5',
    images: [],
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