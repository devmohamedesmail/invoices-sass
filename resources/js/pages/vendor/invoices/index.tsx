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

/* ─────────────────────── Types ─────────────────────── */
interface Client      { id: number; name: string; }
interface InvoiceType { id: number; name_ar: string; name_en: string; }

interface Invoice {
  id:             number;
  invoice_number: string;
  invoice_date:   string;
  due_date:       string;
  total:          number;
  paid_amount:    number;
  balance:        number;
  payment_type:   string;
  client:         Client | null;
  invoice_type:   InvoiceType | null;
}

interface PaginatedInvoices {
  data:          Invoice[];
  current_page:  number;
  last_page:     number;
  per_page:      number;
  total:         number;
  from:          number;
  to:            number;
  links:         { url: string | null; label: string; active: boolean }[];
}

interface Props {
  invoices: PaginatedInvoices;
  filters:  { search?: string };
}

/* ─────────────────────── Component ─────────────────── */
export default function InvoicesIndex({ invoices, filters }: Props) {
  const { t, i18n } = useTranslation();
  const { company }  = usePage().props as any;
  const isRTL        = i18n.dir() === 'rtl';

  const [search, setSearch] = useState(filters?.search ?? '');

  /* ── Search (debounce via form submit) ── */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/invoices', { search }, { preserveState: true, replace: true });
  };

  const handleDelete = (id: number) => {
    if (!confirm(t('invoices.delete_confirm'))) return;
    router.delete(`/invoices/${id}`, { preserveScroll: true });
  };

  /* ── Payment badge colour ── */
  const paymentBadge = (type: string) => {
    const map: Record<string, string> = {
      cash:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
      card:  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
      bank:  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
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
      <div className="max-w-7xl mx-auto pb-16 space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {t('invoices.invoices')}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{company?.name}</p>
          </div>
          <Button
            onClick={() => router.visit('/invoices/create')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusCircle size={16} />
            {t('invoices.new_invoice')}
          </Button>
        </div>

        {/* ── Search ── */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('invoices.search_placeholder')}
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="outline">
            {t('common.search')}
          </Button>
        </form>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: t('invoices.invoices'), value: invoices.total, color: 'blue' },
            {
              label: t('invoices.total'),
              value: invoices.data.reduce((s, i) => s + Number(i.total), 0).toFixed(2),
              color: 'indigo',
            },
            {
              label: t('invoices.paid_amount'),
              value: invoices.data.reduce((s, i) => s + Number(i.paid_amount), 0).toFixed(2),
              color: 'emerald',
            },
            {
              label: t('invoices.balance'),
              value: invoices.data.reduce((s, i) => s + Number(i.balance), 0).toFixed(2),
              color: 'red',
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className={`rounded-xl border border-${color}-100 dark:border-${color}-900/40 bg-${color}-50 dark:bg-${color}-900/20 p-4`}
            >
              <p className={`text-xs font-medium text-${color}-600 dark:text-${color}-400 uppercase tracking-wide`}>
                {label}
              </p>
              <p className={`text-xl font-bold text-${color}-700 dark:text-${color}-300 mt-1`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Table ── */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
          {invoices.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-neutral-400">
              <Receipt size={48} strokeWidth={1} />
              <p className="text-base font-medium">{t('invoices.no_invoices')}</p>
              <Button
                onClick={() => router.visit('/invoices/create')}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <PlusCircle size={15} />
                {t('invoices.new_invoice')}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-5 py-3.5">#</th>
                    <th className="px-5 py-3.5">{t('invoices.invoice_number')}</th>
                    <th className="px-5 py-3.5">{t('invoices.client_name')}</th>
                    <th className="px-5 py-3.5">{t('invoices.invoice_type')}</th>
                    <th className="px-5 py-3.5">{t('invoices.invoice_date')}</th>
                    <th className="px-5 py-3.5">{t('invoices.due_date')}</th>
                    <th className="px-5 py-3.5">{t('invoices.payment_type')}</th>
                    <th className="px-5 py-3.5 text-right">{t('invoices.total')}</th>
                    <th className="px-5 py-3.5 text-right">{t('invoices.balance')}</th>
                    <th className="px-5 py-3.5 text-right">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {invoices.data.map((invoice, idx) => (
                    <tr
                      key={invoice.id}
                      className="hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-neutral-400">
                        {invoices.from + idx}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-neutral-800 dark:text-neutral-100">
                        <span className="flex items-center gap-1.5">
                          <FileText size={14} className="text-blue-500 shrink-0" />
                          {invoice.invoice_number}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-neutral-700 dark:text-neutral-300">
                        {invoice.client?.name ?? '—'}
                      </td>
                      <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-400">
                        {invoice.invoice_type
                          ? (isRTL ? invoice.invoice_type.name_ar : invoice.invoice_type.name_en)
                          : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-400">
                        {invoice.invoice_date}
                      </td>
                      <td className="px-5 py-3.5 text-neutral-600 dark:text-neutral-400">
                        {invoice.due_date}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${paymentBadge(invoice.payment_type)}`}>
                          {t(`invoices.payment_${invoice.payment_type}`) || invoice.payment_type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-medium text-neutral-800 dark:text-neutral-200">
                        {Number(invoice.total).toFixed(2)}
                      </td>
                      <td className={`px-5 py-3.5 text-right ${balanceClass(invoice.balance)}`}>
                        {Number(invoice.balance).toFixed(2)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          title={t('common.delete')}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {invoices.last_page > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('common.showing', {
                from:  invoices.from,
                to:    invoices.to,
                total: invoices.total,
                defaultValue: `Showing ${invoices.from}–${invoices.to} of ${invoices.total}`,
              })}
            </p>

            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                disabled={invoices.current_page === 1}
                onClick={() =>
                  router.get('/invoices', { search, page: invoices.current_page - 1 }, {
                    preserveState: true, replace: true,
                  })
                }
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page numbers */}
              {invoices.links
                .filter((l) => !l.label.includes('Previous') && !l.label.includes('Next'))
                .map((link, i) => (
                  <button
                    key={i}
                    disabled={!link.url}
                    onClick={() => {
                      if (!link.url) return;
                      const page = new URL(link.url).searchParams.get('page');
                      router.get('/invoices', { search, page }, { preserveState: true, replace: true });
                    }}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors
                      ${link.active
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }
                      ${!link.url ? 'opacity-40 cursor-default' : ''}
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}

              {/* Next */}
              <button
                disabled={invoices.current_page === invoices.last_page}
                onClick={() =>
                  router.get('/invoices', { search, page: invoices.current_page + 1 }, {
                    preserveState: true, replace: true,
                  })
                }
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </VendorLayout>
  );
}
