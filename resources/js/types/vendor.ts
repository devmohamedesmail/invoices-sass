export interface Client {
  id: number; 
  name: string; 
  email?: string; 
  phone?: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  currency?: string;
  invoices_count?: number;
}
export interface Invoice {
  id: number;
  invoice_number: string;
  client_id: number;
  client_name: string;
  issue_date: string;
  due_date: string;
  total: number;
  paid: number;
  balance: number;
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceType {
   id: number; 
   name_ar: string; 
   name_en: string;
}