import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicesStat({invoices}: any) {
    const { t } = useTranslation();
  return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: t('invoices.invoices'), value: invoices.total, color: 'blue' },
            {
              label: t('invoices.total'),
              value: invoices.data.reduce((s: number, i: any) => s + Number(i.total), 0).toFixed(2),
              color: 'indigo',
            },
            {
              label: t('invoices.paid_amount'),
              value: invoices.data.reduce((s: number, i: any) => s + Number(i.paid_amount), 0).toFixed(2),
              color: 'emerald',
            },
            {
              label: t('invoices.balance'),
              value: invoices.data.reduce((s: number, i: any) => s + Number(i.balance), 0).toFixed(2),
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
  )
}
