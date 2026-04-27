import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useTranslation } from 'react-i18next'

export default function ClientsSearch({search,handleSearch,clients}:any) {
    const {t}=useTranslation();
  return (
     <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:max-w-md">
            <Label className="mb-2 block">{t('common.search')}</Label>

            <Input
              value={search}
              placeholder={t('common.search')}

              onChange={e => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex-1" />
          <div className="flex gap-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2 flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-xs text-neutral-500 uppercase font-semibold">{t('invoices.clients')}</span>
              <span className="text-xl font-bold">{clients.data.length}</span>
            </div>
          </div>
        </div>
  )
}
