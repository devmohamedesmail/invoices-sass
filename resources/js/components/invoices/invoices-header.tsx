import React from 'react'
import { useTranslation } from 'react-i18next';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function InvoicesHeader() {
    const { t } = useTranslation();
    const { company }  = usePage().props as any;
  return (
   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {t('invoices.invoices')}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{company?.name}</p>
          </div>
          <Button
            onClick={() => router.visit('/invoices/create')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusCircle size={16} />
            {t('invoices.new_invoice')}
          </Button>
        </div>
  )
}
