import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperClient({ invoice }: { invoice: any }) {
  const { t } = useTranslation();
  return (
    <div className='flex items-center justify-between'>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">{t('invoices.client_info')}</h3>
        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.client_name')} : </p>
          <p className='font-semibold invoice-font'>{invoice.client.name} </p>
        </div>

        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.client_phone')} : </p>
          <p className='font-semibold invoice-font'>{invoice.client.phone} </p>
        </div>
      </div>


      <div className="mt-6">
        <h3 className="font-bold mb-2">{t('invoices.car_info')}</h3>
        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.car_no')} : </p>
          <p className='font-semibold invoice-font'>{invoice.car_no} </p>
        </div>

        <div className='flex items-center'>
          <p className='invoice-font'>{t('invoices.client_phone')} : </p>
          <p className='font-semibold invoice-font'>{invoice.car_type} </p>
        </div>
      </div>
    </div>
  )
}
