import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperClient({invoice}: {invoice: any}) {
    const {t}=useTranslation();
  return (
    <div className="mt-6">
          <h3 className="font-semibold mb-2">{t('invoices.client_info')}</h3>
          <div className='flex items-center'>
            <p>{t('invoices.client_name')} : </p>
            <p className='font-semibold'>{invoice.client.name} </p>
          </div>
          <div className='flex items-center'>
            <p>{t('invoices.client_email')} : </p>
            <p className='font-semibold'>{invoice.client.email} </p>
          </div>
          <div className='flex items-center'>
            <p>{t('invoices.client_phone')} : </p>
            <p className='font-semibold'>{invoice.client.phone} </p>
          </div>
        </div>
  )
}
