import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperServices({invoice}: {invoice: any}) {
    const {t} = useTranslation();

  return (
      <table className="w-full mt-6 border border-black">
          <thead className="">
            <tr>
              <th className="border border-black p-2 text-center invoice-font">{t('invoices.service')}</th>
              <th className="border border-black p-2 text-center invoice-font">{t('invoices.description')}</th>
              <th className="border border-black p-2 text-center invoice-font">{t('invoices.quantity')}</th>
              <th className="border border-black p-2 text-center invoice-font">{t('invoices.unit_price')}</th>
              <th className="border border-black p-2 text-center invoice-font">{t('invoices.total_price')}</th>
            </tr>
          </thead>
          <tbody>
            {invoice.services.map((s: any) => (
              <tr key={s.id}>
                <td className="border border-black p-2 text-center invoice-font">{s.name}</td>
                <td className="border border-black p-2 text-center text-xs invoice-font">{s.description}</td>
                <td className="border border-black p-2 text-center invoice-font">{s.quantity}</td>
                <td className="border border-black p-2 text-center invoice-font">{s.unit_price}</td>
                <td className="border border-black p-2 text-center invoice-font">{s.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}
