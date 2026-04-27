import React from 'react'
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';

export default function CreateInvoiceHeader() {
    const { t, i18n } = useTranslation();
    const { company } = usePage().props as any;
  return (
     <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                            {t('invoices.create_invoice')}
                        </h1>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{company?.name}</p>
                    </div>
                    <Button variant="outline" type="button" onClick={() => router.visit('/invoices')}>
                        {t('common.back')}
                    </Button>
                </div>
  )
}
