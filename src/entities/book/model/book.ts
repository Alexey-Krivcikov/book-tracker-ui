export type Book = {
  externalId: string;
  title: string;
  authors: string[];
  cover?: string;
  description?: string;
  isAdded: boolean;
};
