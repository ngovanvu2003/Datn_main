export interface IProduct {
  id?: string | number;
  name?: string;
  price?: number;
  unit?: string;
  image?: string;
  quantity?: number;
  description?: string;
  product_status?: number | string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  category_id?: string | number;
  add_to_stock?:number |string
}
