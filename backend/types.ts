export type Category = {
  id: string;
  name: string;
  parentId: string | null;
  products?: Product[];
};

export type Product = {
  id: string;
  name: string;
  category?: Category | null;
  categoryId: string;
};

export type CategoryChild = {
  _id: string;
  name: string;
  children: CategoryChild[];
};
