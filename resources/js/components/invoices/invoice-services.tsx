import React from 'react'
import SectionCard from './section-card'
import { Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Input } from '../ui/input'
import InputError from '../input-error'
import { Trash2, PlusCircle } from 'lucide-react'
import { useFieldArray } from 'react-hook-form'


export default function InvoiceServices({ control, errors, register,watch }: any) {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({ control, name: 'services' });
      const watchedServices = watch('services');
  return (
      <SectionCard icon={<Wrench size={18} />} title={t('invoices.services')}>
                        <div className="space-y-4">
                            {/* Header row */}
                            <div className="hidden sm:grid grid-cols-[2fr_3fr_1fr_1fr_auto] gap-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 px-1">
                                <span>{t('invoices.service_name')}</span>
                                <span>{t('invoices.description')}</span>
                                <span>{t('invoices.unit_price')}</span>
                                <span>{t('invoices.quantity')}</span>
                                <span />
                            </div>

                            {fields.map((field, index) => {
                                const lineTotal = (Number(watchedServices?.[index]?.unit_price) || 0)
                                    * (Number(watchedServices?.[index]?.quantity) || 0);
                                return (
                                    <div
                                        key={field.id}
                                        className="grid grid-cols-1 sm:grid-cols-[2fr_3fr_1fr_1fr_auto] gap-3 items-start bg-neutral-50 dark:bg-neutral-800/40 rounded-xl p-3 border border-neutral-100 dark:border-neutral-700"
                                    >
                                        <div>
                                            <Input
                                                placeholder={t('invoices.service_name')}
                                                {...register(`services.${index}.name`)}
                                            />
                                            {errors.services?.[index]?.name && (
                                                <InputError message={errors.services[index]?.name?.message} />
                                            )}
                                        </div>
                                        <div>
                                            <Input
                                                placeholder={t('invoices.description')}
                                                {...register(`services.${index}.description`)}
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                {...register(`services.${index}.unit_price`)}
                                            />
                                            {errors.services?.[index]?.unit_price && (
                                                <InputError message={errors.services[index]?.unit_price?.message} />
                                            )}
                                        </div>
                                        <div>
                                            <Input
                                                type="number"
                                                min="1"
                                                placeholder="1"
                                                {...register(`services.${index}.quantity`)}
                                            />
                                            {errors.services?.[index]?.quantity && (
                                                <InputError message={errors.services[index]?.quantity?.message} />
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-1 pt-1">
                                            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                                                {lineTotal.toFixed(2)}
                                            </span>
                                            {fields.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-red-500 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Add service */}
                            <button
                                type="button"
                                onClick={() =>
                                    append({ name: '', description: '', unit_price: 0, quantity: 1 })
                                }
                                className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors mt-2"
                            >
                                <PlusCircle size={16} />
                                {t('invoices.add_service')}
                            </button>

                            {errors.services?.root?.message && (
                                <InputError message={errors.services.root.message} />
                            )}
                        </div>
                    </SectionCard>
  )
}
