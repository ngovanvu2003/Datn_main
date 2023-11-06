export interface IReservation {
  id?: string | number;
  branch_id?: string | number;
  user_id?: string | number;
  username?: string;
  phone?: string;
  email?: string;
  quantity_person?: number;
  meal_time?: Date | string;
  note?: string;
  reservation_status?: string | number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
