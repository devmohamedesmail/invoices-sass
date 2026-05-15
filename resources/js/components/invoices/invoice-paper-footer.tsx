import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperFooter({ invoice }: { invoice: any }) {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-10 text-sm py-4 border-t-2 border-t-black text-black  absolute bottom-0 right-0 left-0">
      {/* {t('invoices.thank_you_for_your_business')}    <p>{invoice.company.name} </p> */}

      <div className='flex justify-between items-center px-3'>
        <div className='flex flex-col justify-center items-center'>
          <p className='invoice-font'>{t('common.customer-signature')}</p>
          <div className='h-px bg-black w-50 mt-4'></div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <p className='invoice-font'>{t('common.vendor-signature')}</p>
          <div className='h-px bg-black w-50 mt-4'></div>
        </div>
      </div>
    </div>
  )
}
