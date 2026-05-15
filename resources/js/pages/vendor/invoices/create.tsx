import React, { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import VendorLayout from '@/layouts/vendor/vendor-layout';
import { Button } from '@/components/ui/button';

import InvoiceInfo from '@/components/invoices/invoice-info';
import InvoiceCarInfo from '@/components/invoices/invoice-car-info';
import InvoiceServices from '@/components/invoices/invoice-services';
import InvoiceSummery from '@/components/invoices/invoice-summery';
import InvoiceNotes from '@/components/invoices/invoice-notes';
import CreateClientDialog from '@/components/invoices/create-client-dialog';
import CreateInvoiceHeader from '@/components/invoices/create-invoice-header';
import { Client, InvoiceType } from '@/types/vendor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';



interface Props {
    clients: Client[];
    invoice_types: InvoiceType[];
    next_invoice_number: string;
}





/* ─────────────────────── Main Component ─────────────────── */
export default function CreateInvoice({ clients, invoice_types, next_invoice_number }: Props) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const [successModal, setSuccessModal] = useState(false);
    const { props } = usePage();
     const successInvoice = props.successInvoice as any;

     console.log(successInvoice);


    /* ─────────────────────── Zod Schema (Inside for t()) ────────────────── */
    const schema = useMemo(() => {
        const serviceSchema = z.object({
            name: z.string().min(1, t('validation.required', { defaultValue: 'Required' })),
            description: z.string().optional(),
            unit_price: z.coerce.number().min(0, t('validation.min', { defaultValue: 'Must be >= 0' })),
            quantity: z.coerce.number().int().min(1, t('validation.min', { defaultValue: 'Must be >= 1' })),
        });

        const toNumber = (val: any) =>
            val === '' || val === null || val === undefined ? undefined : Number(val);
        return z.object({
            // client_id: z.coerce.number().min(1, t('validation.required', { defaultValue: 'Client is required' })),
            // client_id: z.preprocess(toNumber, z.number().min(1)),
            client_name: z.string().min(1, t('validation.required')),
            client_phone: z.string().min(1, t('validation.required')),
            // invoice_type_id: z.coerce.number().min(1, t('validation.required', { defaultValue: 'Invoice type is required' })),
            invoice_type_id: z.coerce.number().min(1, t('validation.required')),
            // invoice_type_id: z.string().min(1, t('validation.required')),
            invoice_number: z.string().min(1, t('validation.required', { defaultValue: 'Invoice number is required' })),
            // payment_type: z.string().min(1, t('validation.required', { defaultValue: 'Payment type is required' })),
            payment_type: z.enum(['cash', 'card', 'bank', 'check'], {
                message: t('validation.required'),
            }),
            invoice_date: z.string().min(1, t('validation.required')),
            due_date: z.string().min(1, t('validation.required')),
            // car_no: z.string().optional(),
            // car_type: z.string().optional(),
            car_no: z.string().min(1, t('validation.required')),
            car_type: z.string().min(1, t('validation.required')),
            car_model: z.string().optional(),
            car_color: z.string().optional(),
            car_year: z.string().optional(),
            car_vin: z.string().optional(),
            car_plate: z.string().optional(),
            car_chassis: z.string().optional(),
            car_engine: z.string().optional(),
            car_transmission: z.string().optional(),
            car_fuel: z.string().optional(),
            tax: z.coerce.number().min(0),
            paid_amount: z.coerce.number().min(0),
            notes: z.string().optional(),
            terms: z.string().optional(),
            services: z.array(serviceSchema).min(1, t('validation.required_service', { defaultValue: 'At least one service is required' })),
        });
    }, [t]);

    type FormData = z.infer<typeof schema>;

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            // client_id: 0,
            client_name: '',
            client_phone: '',
            invoice_type_id: 0,
            payment_type: 'cash',
            invoice_number: next_invoice_number || '', 
            car_no: '',
            car_type: '',
            tax: 0,
            paid_amount: 0,
            services: [{ name: '', description: '', unit_price: 0, quantity: 1 }],
            invoice_date: new Date().toISOString().split('T')[0],
            due_date: new Date().toISOString().split('T')[0],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'services' });

    /* ── Live totals ── */
    const watchedServices = watch('services');
    const watchedTax = watch('tax') ?? 0;
    const watchedPaid = watch('paid_amount') ?? 0;

    const subtotal = (watchedServices ?? []).reduce(
        (sum, s) => sum + (Number(s.unit_price) || 0) * (Number(s.quantity) || 0),
        0
    );
    const taxAmount = subtotal * (Number(watchedTax) / 100);
    const total = subtotal + taxAmount;
    const balance = total - Number(watchedPaid);

    /* ── Submit ── */
    const onSubmit = (data: FormData) => {
        router.post('/invoices', data as any, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(t('invoices.invoice_created'));
                router.visit('/invoices');
            },
            onError: () => {
                toast.error(t('invoices.invoice_created_error'));
            }
        });
    };


    return (
        <VendorLayout title={t('invoices.create_invoice')}>
            <div className=" mx-auto pb-16">

                {/* ── Page header ── */}
                <CreateInvoiceHeader />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* ══════════════ 1. Basic Info ══════════════ */}
                    <InvoiceInfo
                        control={control}
                        errors={errors}
                        clients={clients}
                        invoice_types={invoice_types}
                        isRTL={isRTL}
                        // setClientModalOpen={setClientModalOpen}
                        register={register}
                    />


                    {/* ══════════════ 2. Vehicle Info ══════════════ */}
                    <InvoiceCarInfo
                        register={register}
                        errors={errors}
                    />

                    {/* ══════════════ 3. Services ══════════════ */}
                    <InvoiceServices
                        control={control}
                        errors={errors}
                        register={register}
                        watch={watch}
                    />




                    {/* ══════════════ 4. Summary ══════════════ */}
                    <InvoiceSummery
                        register={register}
                        errors={errors}
                        subtotal={subtotal}
                        taxAmount={taxAmount}
                        total={total}
                        watchedPaid={watchedPaid}
                        balance={balance}
                    />

                    {/* ══════════════ 5. Notes & Terms ══════════════ */}
                    <InvoiceNotes
                        register={register}

                    />

                    {/* ══════════════ Submit ══════════════ */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => router.visit('/invoices')}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? t('common.loading') : t('invoices.create_invoice')}
                        </Button>
                    </div>

                </form>
            </div>


            {/* <Dialog open={successModal} onOpenChange={setSuccessModal}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle className='text-center py-4'>{t('invoices.invoice_created')}</DialogTitle>
                    </DialogHeader>


                    <DialogFooter className="sm:justify-center">
                       
                        <Button type="button" variant="outline" onClick={() => router.visit('/invoices')}>
                            {t('common.close')}
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog> */}
        </VendorLayout>
    );
}
