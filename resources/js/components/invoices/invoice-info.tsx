import React, { useState } from 'react'
import SectionCard from './section-card'
import { FileText, UserPlus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import InputError from '../input-error'
import Field from './field'
import { UseFormRegister } from 'react-hook-form';
import CreateClientDialog from './create-client-dialog'

type Props = {
    control: any;
    errors: any;
    clients: any;
    invoice_types: any;
    isRTL: boolean;
    register: UseFormRegister<any>; 
};

export default function InvoiceInfo({ control, errors, clients, invoice_types, isRTL , register }: Props) {
    const { t } = useTranslation();
    const [isClientModalOpen, setClientModalOpen] = useState(false);
    return (
        <SectionCard icon={<FileText size={18} />} title={t('invoices.invoice_number')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Client Select using UI */}
                <div className="flex flex-col gap-1.5 col-span-1">
                    <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                        {t('invoices.client')}
                        <button type="button" onClick={() => setClientModalOpen(true)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                            <UserPlus size={12} /> {t('common.create')}
                        </button>
                    </Label>
                    <Controller
                        name="client_id"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? field.value.toString() : ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('invoices.select_client')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients.map((c: any) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.client_id?.message && <InputError message={errors.client_id.message as string} />}
                </div>

                {/* Invoice Type using UI */}
                <div className="flex flex-col gap-1.5 col-span-1">
                    <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('invoices.invoice_type')}</Label>
                    <Controller
                        name="invoice_type_id"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value ? field.value.toString() : ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('invoices.select_invoice_type')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {invoice_types.map((it: any) => (
                                        <SelectItem key={it.id} value={it.id.toString()}>
                                            {isRTL ? it.name_ar : it.name_en}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.invoice_type_id?.message && <InputError message={errors.invoice_type_id.message as string} />}
                </div>

                {/* Invoice Number */}
                <Field label={t('invoices.invoice_number')} error={errors.invoice_number?.message}>
                    <Input placeholder="INV-0001" {...register('invoice_number')} />
                </Field>

                {/* Payment Type using UI */}
                <div className="flex flex-col gap-1.5 col-span-1">
                    <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t('invoices.payment_type')}</Label>
                    <Controller
                        name="payment_type"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('invoices.select_payment_type')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cash">{t('invoices.payment_cash')}</SelectItem>
                                    <SelectItem value="card">{t('invoices.payment_card')}</SelectItem>
                                    <SelectItem value="bank">{t('invoices.payment_bank')}</SelectItem>
                                    <SelectItem value="check">{t('invoices.payment_check')}</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.payment_type?.message && <InputError message={errors.payment_type.message as string} />}
                </div>

                {/* Invoice Date */}
                <Field label={t('invoices.invoice_date')} error={errors.invoice_date?.message}>
                    <Input type="date" {...register('invoice_date')} />
                </Field>

                {/* Due Date */}
                <Field label={t('invoices.due_date')} error={errors.due_date?.message}>
                    <Input type="date" {...register('due_date')} />
                </Field>
            </div>
            
            <CreateClientDialog isClientModalOpen={isClientModalOpen} setClientModalOpen={setClientModalOpen} />
        </SectionCard>
    )
}
