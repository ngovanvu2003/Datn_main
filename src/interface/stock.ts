export interface IStock {
    id: string | number;
    product_id: number|string ;
    in_stock: number|string;
    stock_status: string|number;
    add_to_stock: number|string;
    out_stock: string|number;
    created_at:Date;
    updated_at:Date;
    deleted_at:Date;
  }
