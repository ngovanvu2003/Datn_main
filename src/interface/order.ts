import { ReactNode } from "react";

interface IOrder {
  id?: string | number;
  reservation_id: string | number;
  table_id?: string | number;
  payment_method_id?: string | number;
  coupon_id?: string | number;
  vat?: string;
  username?: string;
  branch_name?: string;
  phone?: string;
  order_amount?: number;
  order_amount_discount?: number;
  order_status?: number|string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface IOrderDetail {
  order_amount: number;
  branch_name: ReactNode;
  id: string | number;
  order_id?: string | number;
  product_id?: string | number;
  product_name?: string;
  table_name?: string;
  image?: string;
  type_id?: string | number;
  orderable_type: string;
  quantity?: number;
  total_price?: number;
  orderable_status?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export type { IOrder, IOrderDetail };
