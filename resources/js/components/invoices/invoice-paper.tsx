import React from 'react'
import { useTranslation } from 'react-i18next'
import InvoicePaperHeader from './invoice-paper-header';
import InvoicePaperClient from './invoice-paper-client';
import InvoicePaperServices from './invoice-paper-services';
import InvoicePaperPayment from './invoice-paper-payment';
import InvoicePaperNotes from './invoice-paper-notes';
import InvoicePaperFooter from './invoice-paper-footer';
import { usePage } from '@inertiajs/react';

export default function InvoicePaper({ invoice }: { invoice: any }) {
  const { t } = useTranslation();
  const {company}= usePage<{company: any}>().props;
  console.log("from invoice page" , company);

  return (
    <div className="w-full h-full border flex flex-col relative overflow-hidden"
      style={{ width: '210mm', height: '297mm', minHeight: '297mm', maxHeight: '297mm', direction: 'rtl' }}>

      <div className="p-4  text-black w-200 mx-auto ">
        <InvoicePaperHeader invoice={invoice}/>
        <InvoicePaperClient invoice={invoice}/>
        <InvoicePaperServices invoice={invoice}/>
        <InvoicePaperPayment invoice={invoice}/>
        <InvoicePaperNotes invoice={invoice}/>
      <InvoicePaperFooter invoice={invoice}/>
      </div>
    </div>
  )
}
