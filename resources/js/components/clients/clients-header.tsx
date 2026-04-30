import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { PlusCircle, Users } from 'lucide-react'
import { usePage } from '@inertiajs/react'

export default function ClientsHeader({ handleOpenCreate }: any) {
    const { t } = useTranslation();
    const { company } = usePage().props as any;
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                    <Users size={24} className="text-blue-600" />
                    {t('invoices.clients')}
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{company?.name}</p>
            </div>
            <Button onClick={handleOpenCreate}>
                <PlusCircle size={16} />
                {t('common.create')} {t('invoices.client')}
            </Button>
        </div>
    )
}
