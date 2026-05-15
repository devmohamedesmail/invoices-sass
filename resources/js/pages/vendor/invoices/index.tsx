import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import VendorLayout from '@/layouts/vendor/vendor-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  PlusCircle,
  Trash2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from 'lucide-react';
import InvoicesHeader from '@/components/invoices/invoices-header';
import InvoicesSearch from '@/components/invoices/invoices-search';
import InvoicesStat from '@/components/invoices/invoices-stat';
import InvoicesTable from '@/components/invoices/invoices-table';

/* ─────────────────────── Types ─────────────────────── */
interface Client { id: number; name: string; }
interface InvoiceType { id: number; name_ar: string; name_en: string; }

interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  total: number;
  paid_amount: number;
  balance: number;
  payment_type: string;
  client: Client | null;
  invoice_type: InvoiceType | null;
}

interface PaginatedInvoices {
  data: Invoice[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
  invoices: PaginatedInvoices;
  filters: { search?: string };
}

/* ─────────────────────── Component ─────────────────── */
export default function InvoicesIndex({ invoices, filters }: Props) {
  const { t, i18n } = useTranslation();
  const { company } = usePage().props as any;
  const isRTL = i18n.dir() === 'rtl';

  const [search, setSearch] = useState(filters?.search ?? '');

  /* ── Search (debounce via form submit) ── */
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   router.get('/invoices', { search }, { preserveState: true, replace: true });
  // };

 

  /* ── Payment badge colour ── */
  const paymentBadge = (type: string) => {
    const map: Record<string, string> = {
      cash: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
      card: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
      bank: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
      check: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    };
    return map[type] ?? 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300';
  };

  /* ── Balance colour ── */
  const balanceClass = (balance: number) =>
    balance <= 0
      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
      : 'text-red-600 dark:text-red-400 font-semibold';

  /* ─────────────────── Render ─────────────────────────── */
  return (
    <VendorLayout title={t('invoices.invoices')}>
      <div className="max-w-9xl mx-auto pb-16 space-y-6">

        <InvoicesHeader />
        <InvoicesSearch search={search} setSearch={setSearch} />


        <InvoicesStat
          invoices={invoices} />

        <InvoicesTable
          invoices={invoices}
          
          paymentBadge={paymentBadge}
          balanceClass={balanceClass} />



      
      </div>
    </VendorLayout>
  );
}
