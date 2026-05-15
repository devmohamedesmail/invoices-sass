import React from 'react'
import { useTranslation } from 'react-i18next'

export default function InvoicePaperTerms({terms}: {terms: any}) {
  const {t}=useTranslation();
    return (
    <div className='mt-10'>
        <h2>{t('invoices.terms-conditions')}</h2>

        <div>
            {terms?.length > 0 ? (<>
            {terms?.map((term: any,idx:number) => (
              <p className='invoice-font' key={term.id}>{idx+1}- {term.term}</p>
            ))}
            </>):(<>
            <p className='invoice-font'>{t('invoices.no-terms')}</p>
            </>)}
          
        </div>
    </div>
  )
}
