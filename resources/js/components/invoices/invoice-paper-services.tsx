import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperServices({invoice}: {invoice: any}) {
    const {t} = useTranslation();

  return (
      <table className="w-full mt-6 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-center">{t('invoices.service')}</th>
              <th className="border p-2 text-center">{t('invoices.description')}</th>
              <th className="border p-2 text-center">{t('invoices.quantity')}</th>
              <th className="border p-2 text-center">{t('invoices.unit_price')}</th>
              <th className="border p-2 text-center">{t('invoices.total_price')}</th>
            </tr>
          </thead>
          <tbody>
            {invoice.services.map((s: any) => (
              <tr key={s.id}>
                <td className="border p-2 text-center">{s.name}</td>
                <td className="border p-2 text-center">{s.description}</td>
                <td className="border p-2 text-center">{s.quantity}</td>
                <td className="border p-2 text-center">{s.unit_price}</td>
                <td className="border p-2 text-center">{s.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}
