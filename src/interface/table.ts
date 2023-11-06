export interface ITable {
  status: string;
  id: string | number;
  name: string;
  qr_code: string | TrustedHTML;
  cookie?: string;
  parents_id?: string;
  branch_id: string | number;
  quantity_chair: number;
  description?: string;
  table_status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface ICheckParentsQr {
  id?: number | string;
  cookie?: string;
}
