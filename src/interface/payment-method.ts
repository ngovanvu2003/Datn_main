export interface IPaymentMethod {
  id: string | number;
  name_method: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
