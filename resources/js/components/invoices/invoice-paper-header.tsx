import React from 'react'
import { useTranslation } from 'react-i18next'

export default function InvoicePaperHeader({invoice}: {invoice: any}) {
    const {t}=useTranslation();
  return (
     <div className="flex justify-between items-start border-b pb-4">
          <div>
            <img src={invoice.company.logo} alt={invoice.company.name} className='w-20 h-20 rounded-full' />
            <h1 className="text-2xl font-bold">{invoice.company.name}</h1>

            <div className='flex items-center'>
              <p>{t('invoices.company_address')} : </p>
              <p className='font-semibold'>{invoice.company.address} </p>
            </div>

            <div className='flex items-center'>
              <p>{t('invoices.company_phone')} : </p>
              <p className='font-semibold'>{invoice.company.phone} </p>
            </div>

            <div className='flex items-center'>
              <p>{t('invoices.company_vat_number')} : </p>
              <p className='font-semibold'>{invoice.company.vat_number} </p>
            </div>




          </div>

          <div className="text-right">
            <h2 className="text-xl font-semibold bg-gray-100 p-2 text-center border"> {invoice.invoice_type.name_ar} </h2>
             <div className='flex items-center'>
              <p>{t('invoices.invoice_number')} : </p>
              <p className='font-semibold'>{invoice.invoice_number} </p>
            </div>
            <div className='flex items-center'>
              <p>{t('invoices.invoice_date')} : </p>
              <p className='font-semibold'>{invoice.invoice_date} </p>
            </div>
            <div className='flex items-center'>
              <p>{t('invoices.due_date')} : </p>
              <p className='font-semibold'>{invoice.due_date} </p>
            </div>
          </div>
        </div>
  )
}
