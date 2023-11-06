export interface ICoupon {
  id: string | number;
  coupon_code: string;
  amount_discount: number;
  coupon_quantity?: number;
  description?: string;
  expiration_date: Date;
  coupon_status?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}