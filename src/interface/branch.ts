export interface IBranch {
  id: string | number;
  name: string;
  city: string;
  district: string;
  street: string;
  address_details: string;
  branch_status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}