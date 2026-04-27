import React, { useMemo, useState } from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import VendorLayout from '@/layouts/vendor/vendor-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { PlusCircle, Trash2, FileText, Car, Wrench, DollarSign, StickyNote, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import SectionCard from '@/components/invoices/section-card';
import Field from '@/components/invoices/field';
import InvoiceInfo from '@/components/invoices/invoice-info';
import InvoiceCarInfo from '@/components/invoices/invoice-car-info';
import InvoiceServices from '@/components/invoices/invoice-services';
import InvoiceSummery from '@/components/invoices/invoice-summery';
import InvoiceNotes from '@/components/invoices/invoice-notes';

/* ─────────────────────── Types ─────────────────────── */
interface Client { id: number; name: string; email?: string; phone?: string; }
interface InvoiceType { id: number; name_ar: string; name_en: string; }

interface Props {
    clients: Client[];
    invoice_types: InvoiceType[];
    next_invoice_number: string;
}



// const Field = ({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string; }) => (
//     <div className={`flex flex-col gap-1.5 ${className}`}>
//         <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</Label>
//         {children}
//         {error && <InputError message={error} />}
//     </div>
// );

/* ─────────────────────── Main Component ─────────────────── */
export default function CreateInvoice({ clients, invoice_types, next_invoice_number }: Props) {
    const { t, i18n } = useTranslation();
    const { company } = usePage().props as any;
    const isRTL = i18n.dir() === 'rtl';

    const [isClientModalOpen, setClientModalOpen] = useState(false);

    /* ─────────────────────── Zod Schema (Inside for t()) ────────────────── */
    const schema = useMemo(() => {
        const serviceSchema = z.object({
            name: z.string().min(1, t('validation.required', { defaultValue: 'Required' })),
            description: z.string().optional(),
            unit_price: z.coerce.number().min(0, t('validation.min', { defaultValue: 'Must be >= 0' })),
            quantity: z.coerce.number().int().min(1, t('validation.min', { defaultValue: 'Must be >= 1' })),
        });

        return z.object({
            client_id: z.coerce.number().min(1, t('validation.required', { defaultValue: 'Client is required' })),
            invoice_type_id: z.coerce.number().min(1, t('validation.required', { defaultValue: 'Invoice type is required' })),
            invoice_number: z.string().min(1, t('validation.required', { defaultValue: 'Invoice number is required' })),
            payment_type: z.string().min(1, t('validation.required', { defaultValue: 'Payment type is required' })),
            invoice_date: z.string().min(1, t('validation.required', { defaultValue: 'Invoice date is required' })),
            due_date: z.string().min(1, t('validation.required', { defaultValue: 'Due date is required' })),
            car_no: z.string().optional(),
            car_type: z.string().optional(),
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
            invoice_number: next_invoice_number || '', /* Auto-generated number */
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
        router.post('/invoices', data as any, { preserveScroll: true });
    };

    /* ── Client Creation Modal State ── */
    const [newClientName, setNewClientName] = useState('');
    const [newClientEmail, setNewClientEmail] = useState('');
    const [newClientPhone, setNewClientPhone] = useState('');
    const [isCreatingClient, setIsCreatingClient] = useState(false);

    const handleCreateClient = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClientName) return;

        setIsCreatingClient(true);
        router.post('/clients', {
            name: newClientName,
            email: newClientEmail,
            phone: newClientPhone,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreatingClient(false);
                setClientModalOpen(false);
                setNewClientName('');
                setNewClientEmail('');
                setNewClientPhone('');
                // NOTE: Actually, to auto-select the new client, we'd need its ID.
                // It's fetched on the next render, but inertia may blur focus. 
                // We let the user select it from the top of the list manually for simplicity given it's Inertia.
            },
            onError: () => {
                setIsCreatingClient(false);
            }
        });
    };

    /* ─────────────────── Render ─────────────────────────────── */

    return (
        <VendorLayout title={t('invoices.create_invoice')}>
            <div className=" mx-auto pb-16">

                {/* ── Page header ── */}
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* ══════════════ 1. Basic Info ══════════════ */}
                    <InvoiceInfo
                        control={control}
                        errors={errors}
                        clients={clients}
                        invoice_types={invoice_types}
                        isRTL={isRTL}
                        setClientModalOpen={setClientModalOpen}
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
                        <Button type="submit" disabled={isSubmitting} className="min-w-36 bg-blue-600 hover:bg-blue-700 text-white">
                            {isSubmitting ? t('common.loading') : t('invoices.create_invoice')}
                        </Button>
                    </div>

                </form>
            </div>

            {/* ── Client Creation Dialog ── */}
            <Dialog open={isClientModalOpen} onOpenChange={setClientModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('common.create')} {t('invoices.client')}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateClient} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>{t('company.name')}</Label>
                            <Input value={newClientName} onChange={e => setNewClientName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('auth.email')}</Label>
                            <Input type="email" value={newClientEmail} onChange={e => setNewClientEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('company.phone')}</Label>
                            <Input type="tel" value={newClientPhone} onChange={e => setNewClientPhone(e.target.value)} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setClientModalOpen(false)}>
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" disabled={isCreatingClient}>
                                {isCreatingClient ? t('common.save') + '...' : t('common.save')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </VendorLayout>
    );
}
