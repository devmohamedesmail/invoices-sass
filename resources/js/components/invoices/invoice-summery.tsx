import React from 'react'
import SectionCard from './section-card'
import { DollarSign } from 'lucide-react'
import Field from './field'
import { Input } from '../ui/input'
import { useTranslation } from 'react-i18next'

export default function InvoiceSummery({register,errors,subtotal,taxAmount,total,watchedPaid,balance}:any) {
    const {t}=useTranslation()
  return (
      <SectionCard icon={<DollarSign size={18} />} title={t('invoices.summary')}>
                        <div className="flex flex-col lg:flex-row gap-6">

                            {/* Tax & Paid Amount */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                                <Field label={t('invoices.tax')} error={errors.tax?.message}>
                                    <Input type="number" min="0" max="100" step="0.01" placeholder="0" {...register('tax')} />
                                </Field>
                                <Field label={t('invoices.paid_amount')} error={errors.paid_amount?.message}>
                                    <Input type="number" min="0" step="0.01" placeholder="0.00" {...register('paid_amount')} />
                                </Field>
                            </div>

                            {/* Totals panel */}
                            <div className="lg:w-72 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl p-5 space-y-3 border border-blue-100 dark:border-neutral-700">
                                {[
                                    { label: t('invoices.subtotal'), value: subtotal },
                                    { label: t('invoices.tax'), value: taxAmount },
                                    { label: t('invoices.total'), value: total, bold: true },
                                    { label: t('invoices.paid_amount'), value: Number(watchedPaid) },
                                    { label: t('invoices.balance'), value: balance, accent: true },
                                ].map(({ label, value, bold, accent }) => (
                                    <div
                                        key={label}
                                        className={`flex justify-between items-center text-sm ${bold ? 'font-bold text-base border-t border-blue-200 dark:border-neutral-600 pt-2' :
                                            accent ? 'font-semibold text-red-600 dark:text-red-400' : 'text-neutral-700 dark:text-neutral-300'
                                            }`}
                                    >
                                        <span>{label}</span>
                                        <span>{value.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionCard>
  )
}
