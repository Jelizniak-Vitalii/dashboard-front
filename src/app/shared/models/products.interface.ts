export interface IProduct {
  id?: number;
  title: string;
  category_id: number;
  price: string;
  category_name?: string | null;
  rating?: number;
  currency?: number;
  currency_symbol?: string;
  price_with_discount?: string;
  discount?: string;
  image_url?: string;
}
