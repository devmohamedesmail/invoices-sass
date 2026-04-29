import React from 'react'
import { useTranslation } from 'react-i18next';

export default function InvoicePaperFooter({invoice}: {invoice: any}) {
  const {t}=useTranslation();
  return (
      <div className="text-center mt-10 text-sm py-4 bg-gray-200 text-black border-t border-gray-300 absolute bottom-0 right-0 left-0">
          {t('invoices.thank_you_for_your_business')}    <p>{invoice.company.name} </p>
        </div>
  )
}
