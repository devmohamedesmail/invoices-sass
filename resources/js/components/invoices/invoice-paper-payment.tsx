import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperPayment({invoice}: {invoice: any}) {
    const {t}=useTranslation();
  return (
      <div className="mt-6 flex justify-end mx-10">
          <div className="w-75">
            <div className="flex justify-between border-b py-2">
              <span>{t('invoices.subtotal')} : </span>
              <span>{invoice.subtotal}</span>
            </div>

            <div className="flex justify-between border-b py-2">
              <span>{t('invoices.tax')} : </span>
              <span>{invoice.tax}</span>
            </div>

            <div className="flex justify-between border-b py-2 font-bold">
              <span>{t('invoices.total')} : </span>
              <span>{invoice.total}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>{t('invoices.paid')} : </span>
              <span>{invoice.paid_amount}</span>
            </div>

            <div className="flex justify-between py-2 font-bold text-red-600">
              <span>{t('invoices.balance')} : </span>
              <span>{invoice.balance}</span>
            </div>
          </div>
        </div>
  )
}
