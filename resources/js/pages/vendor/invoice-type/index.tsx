import VendorLayout from '@/layouts/vendor/vendor-layout'
import React from 'react'
import { usePage } from '@inertiajs/react'
import type { SharedData } from '@/types';
import { z } from 'zod';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';


export default function InvoiceType({ invoice_types }: { invoice_types: any }) {
  const { company } = usePage().props as any;
  const { auth } = usePage<SharedData>().props;
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const { t } = useTranslation()

  // ✅ Zod Schema
  const schema = z.object({
    name_ar: z.string().min(2, "Arabic name is required"),
    name_en: z.string().min(2, "English name is required"),
    is_active: z.boolean().optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      is_active: true,
    },
  });

  // const onSubmit = (data: FormData) => {
  //   router.post("/invoice-types", data, {
  //     onSuccess: () => {
  //       reset();
  //       setOpen(false);
  //     },
  //   });
  // };

  const onSubmit = (data: FormData) => {
    if (editItem) {
      router.put(`/invoice-types/${editItem.id}`, data, {
        onSuccess: () => {
          reset();
          setOpen(false);
          setEditItem(null);
        },
      });
    } else {
      router.post("/invoice-types", data, {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    }
  };

  const handleEdit = (item: any) => {
    setEditItem(item);
    setOpen(true);

    reset({
      name_ar: item.name_ar,
      name_en: item.name_en,
      is_active: item.is_active,
    });
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure?")) return;

    router.delete(`/invoice-types/${id}`, {
      preserveScroll: true,
    });
  };
  return (
    <VendorLayout>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{t('invoices.add_invoice_type')}</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('invoices.add_invoice_type')}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Arabic Name */}
            <div>
              <Label>{t('invoices.name_ar')}</Label>
              <Input
                placeholder={t('invoices.name_ar')}
                {...register("name_ar")} />
              <InputError message={errors.name_ar?.message} />
            </div>

            {/* English Name */}
            <div>
              <Label>{t('invoices.name_en')}</Label>
              <Input
                placeholder={t('invoices.name_en')}
                {...register("name_en")} />
              <InputError message={errors.name_en?.message} />
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("is_active")} />
              <span>{t('invoices.is_active')}</span>
            </div>

            <DialogFooter>
              <Button disabled={isSubmitting} type="submit">{t('common.save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


      <div className="mt-6">
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
              <tr>

                <th className="p-3">{t('invoices.name_ar')}</th>
                <th className="p-3">{t('invoices.name_en')}</th>
                <th className="p-3">{t('invoices.is_active')}</th>
                <th className="p-3 text-right">{t('common.actions')}</th>
              </tr>
            </thead>

            <tbody>
              {invoice_types?.length > 0 ? (
                invoice_types.map((item: any, index: number) => (
                  <tr
                    key={item.id}
                    className="border-t border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                  

                    <td className="p-3 font-medium">{item.name_ar}</td>

                    <td className="p-3">{item.name_en}</td>

                    <td className="p-3">
                      {item.is_active ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-500">Inactive</span>
                      )}
                    </td>

                    <td className="p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                          {t('common.edit')}
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          {t('common.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center text-neutral-500" colSpan={5}>
                    No invoice types found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </VendorLayout>
  )
}
