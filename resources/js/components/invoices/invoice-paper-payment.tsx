import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperPayment({invoice}: {invoice: any}) {
    const {t}=useTranslation();
  return (
      <div className="mt-6 flex justify-start mx-10">
          <div className="w-75">
            <div className="flex justify-between border-b py-2">
              <span className='invoice-font'>{t('invoices.subtotal')} : </span>
              <span className='invoice-font'>{invoice.subtotal}</span>
            </div>

            <div className="flex justify-between border-b py-2">
              <span className='invoice-font'>{t('invoices.tax')} : </span>
              <span className='invoice-font'>{invoice.tax}</span>
            </div>

            <div className="flex justify-between border-b py-2 font-bold">
              <span className='invoice-font'>{t('invoices.total')} : </span>
              <span className='invoice-font'>{invoice.total}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className='invoice-font'>{t('invoices.paid')} : </span>
              <span className='invoice-font'>{invoice.paid_amount}</span>
            </div>

            <div className="flex justify-between py-2 font-bold text-red-600">
              <span className='invoice-font'>{t('invoices.balance')} : </span>
              <span className='invoice-font'>{invoice.balance}</span>
            </div>
          </div>
        </div>
  )
}
