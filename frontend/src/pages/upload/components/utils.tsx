export type RowItem = {
  title: string;
  images: any[]
  isSelected: boolean;
}

export const INITIAL_LISTINGS: RowItem[] = [
  {
    title: 'Listing 1',
    images: [],
    isSelected: false
  },
  {
    title: 'Listing 2',
    images: [],
    isSelected: false
  },
  {
    title: 'Listing 3',
    images: [],
    isSelected: false
  },
  {
    title: 'Listing 4',
    images: [],
    isSelected: false
  },
  {
    title: 'Listing 5',
    images: [],
    isSelected: false
  },
];

/**
 * Splits a string of the format "word x" into an array where:
 * - The first element is the word (string)
 * - The second element is the number (number)
 *
 * @param input - The input string to split
 * @returns An array containing the word and number
 */
export const splitListing = (input: string): { title: string, number: number } => {
  // Regular expression to match the word followed by a space and a number
  const regex = /^(\D+)\s(\d+)$/;

  // Execute the regex on the input string
  const match = input.match(regex);

  if (!match) {
    throw new Error('Bad title input.');
  } else {
    // Destructure matched groups
    const [, word, numberString] = match;
    // Parse the number string to a number
    const number = parseInt(numberString, 10);
    return {
      title: word,
      number: number
    }
  }
};