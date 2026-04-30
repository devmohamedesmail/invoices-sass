import React, { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router } from '@inertiajs/react';
import VendorLayout from '@/layouts/vendor/vendor-layout';
import { Button } from '@/components/ui/button';

import InvoiceInfo from '@/components/invoices/invoice-info';
import InvoiceCarInfo from '@/components/invoices/invoice-car-info';
import InvoiceServices from '@/components/invoices/invoice-services';
import InvoiceSummery from '@/components/invoices/invoice-summery';
import InvoiceNotes from '@/components/invoices/invoice-notes';
import CreateInvoiceHeader from '@/components/invoices/create-invoice-header';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { t } from 'i18next';
interface Props {
  invoice: any;
  clients: any[];
  invoice_types: any[];
}

export default function EditInvoice({ invoice, clients, invoice_types }: Props) {
    const { i18n } = useTranslation();
    
   const isRTL = i18n.dir() === 'rtl';
  /* ───────────────── schema (same as create) ───────────────── */
  const schema = useMemo(() => {
    return z.object({
      client_id: z.coerce.number().min(1),
      invoice_type_id: z.coerce.number().min(1),
      invoice_number: z.string(),
      payment_type: z.string(),
      invoice_date: z.string(),
      due_date: z.string(),

      car_no: z.string().optional(),
      car_type: z.string().optional(),
      car_model: z.string().optional(),
      car_color: z.string().optional(),
      car_year: z.string().optional(),
      car_vin: z.string().optional(),

      tax: z.coerce.number().min(0),
      paid_amount: z.coerce.number().min(0),
      notes: z.string().optional(),
      terms: z.string().optional(),

      services: z.array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          unit_price: z.coerce.number(),
          quantity: z.coerce.number(),
        })
      ),
    });
  }, []);

  type FormData = z.infer<typeof schema>;

  /* ───────────────── form ───────────────── */
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      client_id: invoice.client_id,
      invoice_type_id: invoice.invoice_type_id,
      invoice_number: invoice.invoice_number,
      payment_type: invoice.payment_type,
      invoice_date: invoice.invoice_date,
      due_date: invoice.due_date,

      car_no: invoice.car_no,
      car_type: invoice.car_type,
      car_model: invoice.car_model,
      car_color: invoice.car_color,
      car_year: invoice.car_year,
      car_vin: invoice.car_vin,

      tax: invoice.tax,
      paid_amount: invoice.paid_amount,
      notes: invoice.notes,
      terms: invoice.terms,

      services: invoice.services?.map((s: any) => ({
        name: s.name,
        description: s.description,
        unit_price: s.unit_price,
        quantity: s.quantity,
      })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  /* ───────────────── submit ───────────────── */
  const onSubmit = (data: FormData) => {
    console.log(data)
    router.put(`/invoices/${invoice.id}`, data, {
      preserveScroll: true,
    });
  };

  return (
    <VendorLayout>
      <div className="mx-auto pb-16">

        <CreateInvoiceHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <InvoiceInfo
            control={control}
            errors={errors}
            clients={clients}
            invoice_types={invoice_types}
            register={register}
            isRTL={isRTL}
          />

          <InvoiceCarInfo register={register} errors={errors} />

          <InvoiceServices
            control={control}
            errors={errors}
            register={register}
            watch={watch}
          />

          <InvoiceSummery
            register={register}
            errors={errors}
            subtotal={0}
            taxAmount={0}
            total={0}
            watchedPaid={0}
            balance={0}
          />

          <InvoiceNotes register={register} />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => router.visit('/invoices')}>
              {t('common.cancel')}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('common.update')}
            </Button>
          </div>

        </form>
      </div>
    </VendorLayout>
  );
}
