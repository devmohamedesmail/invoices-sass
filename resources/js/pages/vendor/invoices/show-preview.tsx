import InvoicePaper from '@/components/invoices/invoice-paper'
import VendorLayout from '@/layouts/vendor/vendor-layout'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useTranslation } from 'react-i18next'

export default function ShowPreview({invoice}: {invoice: any}) {
    const {t} = useTranslation()
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `invoice-${invoice.invoice_number}`,
  })
  return (
    <VendorLayout>
        <button onClick={handlePrint} className='bg-primary text-white px-4 py-2 rounded-lg mb-4'>{t('invoices.print-invoice')}</button>
        <div className='flex justify-center items-center'>
          <div ref={printRef}>
          <InvoicePaper invoice={invoice} />
        </div>
        </div>
    </VendorLayout>
  )
}
