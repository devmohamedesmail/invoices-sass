import VendorLayout from '@/layouts/vendor/vendor-layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FileText, User, Car, Receipt } from 'lucide-react'
import InvoicePaper from '@/components/invoices/invoice-paper'

export default function Show({ invoice }: { invoice: any }) {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <VendorLayout title={`Invoice ${invoice.invoice_number}`}>
   
      <div className="max-w-9xl mx-auto space-y-6 pb-16">

        {/* 🔥 Header */}
        <div className="flex items-center justify-between bg-white dark:bg-neutral-900 border rounded-2xl p-6 shadow-sm">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <FileText size={18} />
              {invoice.invoice_number}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              {invoice.invoice_date}
            </p>
          </div>

          <div className={`px-3 py-1 rounded-full text-sm font-medium ${invoice.balance <= 0
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-red-100 text-red-700'
            }`}>
            {invoice.balance <= 0 ? t('invoices.paid') : t('invoices.unpaid')}
          </div>
        </div>

        {/* 🧑 Client + Car */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Client */}
          <div className="bg-white dark:bg-neutral-900 border rounded-xl p-5 space-y-2">
            <h2 className="font-semibold flex items-center gap-2">
              <User size={16} />
              {t('invoices.client')}
            </h2>

            <p className="text-sm">{invoice.client?.name}</p>
            <p className="text-sm text-neutral-500">{invoice.client?.email}</p>
            <p className="text-sm text-neutral-500">{invoice.client?.phone}</p>
          </div>

          {/* Car */}
          <div className="bg-white dark:bg-neutral-900 border rounded-xl p-5 space-y-2">
            <h2 className="font-semibold flex items-center gap-2">
              <Car size={16} />
              {t('invoices.car_info')}
            </h2>

            <p className="text-sm">{invoice.car_no || '—'}</p>
            <p className="text-sm text-neutral-500">{invoice.car_model || '—'}</p>
          </div>
        </div>

        {/* 🧾 Services */}
        <div className="bg-white dark:bg-neutral-900 border rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center gap-2 font-semibold">
            <Receipt size={16} />
            {t('invoices.services')}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-800 text-neutral-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-center">{t('invoices.service')}</th>
                  <th className="px-4 py-3 text-center">{t('invoices.description')}</th>
                  <th className="px-4 py-3 text-center">{t('invoices.qty')}</th>
                  <th className="px-4 py-3 text-center">{t('invoices.price')}</th>
                  <th className="px-4 py-3 text-center">{t('invoices.total')}</th>
                </tr>
              </thead>

              <tbody>
                {invoice.services.map((s: any) => (
                  <tr key={s.id} className="border-t">
                    <td className="px-4 py-3">{s.name}</td>
                    <td className="px-4 py-3 text-neutral-500">{s.description}</td>
                    <td className="px-4 py-3 text-center">{s.quantity}</td>
                    <td className="px-4 py-3 text-center">{Number(s.unit_price).toFixed(2)}</td>
                    <td className="px-4 py-3 text-center font-medium">
                      {Number(s.total_price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 💰 Summary */}
        <div className="bg-white dark:bg-neutral-900 border rounded-xl p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span>{t('invoices.subtotal')}</span>
            <span>{Number(invoice.subtotal).toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>{t('invoices.tax')}</span>
            <span>{Number(invoice.tax).toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-base font-semibold border-t pt-3">
            <span>{t('invoices.total')}</span>
            <span>{Number(invoice.total).toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm text-emerald-600">
            <span>{t('invoices.paid_amount')}</span>
            <span>{Number(invoice.paid_amount).toFixed(2)}</span>
          </div>

          <div className={`flex justify-between text-sm font-semibold ${invoice.balance > 0 ? 'text-red-600' : 'text-emerald-600'
            }`}>
            <span>{t('invoices.balance')}</span>
            <span>{Number(invoice.balance).toFixed(2)}</span>
          </div>
        </div>

        {/* 📝 Notes */}
        {invoice.notes && (
          <div className="bg-white dark:bg-neutral-900 border rounded-xl p-5">
            <h3 className="font-semibold mb-2">{t('invoices.notes')}</h3>
            <p className="text-sm text-neutral-600">{invoice.notes}</p>
          </div>
        )}

      </div>
    </VendorLayout>
  )
}
