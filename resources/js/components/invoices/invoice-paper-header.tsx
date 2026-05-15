import React from 'react'
import { useTranslation } from 'react-i18next'

export default function InvoicePaperHeader({ invoice }: { invoice: any }) {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-start border-b border-b-black pb-4">
      <div>
        <img src={invoice.company.logo} alt={invoice.company.name} className='w-24 h-24 rounded-full' />
        <h1 className="text-2xl font-bold invoice-font">{invoice.company.name}</h1>

        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.company_address')} : </p>
          <p className='font-semibold invoice-font'>{invoice.company.address} </p>
        </div>

        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.company_phone')} : </p>
          <p className='font-semibold invoice-font'>{invoice.company.phone} </p>
        </div>


        {invoice.company.vat_number ? (<div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.company_vat_number')} : </p>
          <p className='font-semibold invoice-font'>{invoice.company.vat_number} </p>
        </div>) : null}





      </div>

      <div className="text-right">
        <h2 className="text-xl font-semibold  p-2 text-center border-black border-2 invoice-font"> {invoice.invoice_type.name_ar} </h2>
        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.invoice_number')} : </p>
          <p className='font-semibold invoice-font'>{invoice.invoice_number} </p>
        </div>
        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.invoice_date')} : </p>
          <p className='font-semibold invoice-font'>{invoice.invoice_date} </p>
        </div>
        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.due_date')} : </p>
          <p className='font-semibold invoice-font'>{invoice.due_date} </p>
        </div>
      </div>
    </div>
  )
}
