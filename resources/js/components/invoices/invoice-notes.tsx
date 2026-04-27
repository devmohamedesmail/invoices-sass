import React from 'react'
import SectionCard from './section-card'
import { StickyNote } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'

export default function InvoiceNotes({ register }: { register: any }) {
    const { t } = useTranslation();
  return (
     <SectionCard icon={<StickyNote size={18} />} title={t('invoices.additional_info')}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    {t('invoices.notes')}
                                </Label>
                                <textarea
                                    rows={4}
                                    placeholder={t('invoices.notes')}
                                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    {...register('notes')}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    {t('invoices.terms')}
                                </Label>
                                <textarea
                                    rows={4}
                                    placeholder={t('invoices.terms')}
                                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    {...register('terms')}
                                />
                            </div>
                        </div>
                    </SectionCard>
  )
}
