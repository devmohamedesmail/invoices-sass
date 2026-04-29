import React from 'react'
import { useTranslation } from 'react-i18next'

export default function InvoicePaperNotes({invoice}: {invoice: any}) {
  const {t} = useTranslation()
  return (
    
       <>
        {invoice.notes && (
          <div className="mt-6 mx-10">
            <h3 className="font-semibold">{t('invoices.notes')} : </h3>
            <p>{invoice.notes}</p>
          </div>
        )}

        {/* Terms */}
        {invoice.terms && (
          <div className="mt-4 mx-10">
            <h3 className="font-semibold">{t('invoices.terms_and_conditions')} : </h3>
            <p>{invoice.terms}</p>
          </div>
        )}
       </>
  )
}
