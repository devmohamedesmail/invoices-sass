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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import InvoiceTypesTable from '@/components/invoice-types/invoice-types-table';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Controller } from "react-hook-form"

export default function InvoiceType({ invoice_types }: { invoice_types: any }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);
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
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      is_active: true,
    },
  });



  const onSubmit = (data: FormData) => {
    if (editItem) {
      console.log(data);
      router.put(`/invoice-types/${editItem.id}`, data, {
        onSuccess: () => {
          reset();
          setOpen(false);
          setEditItem(null);
          toast.success(t('common.updated_successfully'));
        },
        onError: () => {
          toast.error(t('common.error_occurred'));
        }
      });
    } else {
      router.post("/invoice-types", data, {
        onSuccess: () => {
          reset();
          setOpen(false);
          toast.success(t('common.added_successfully'));
        },
        onError: () => {
          toast.error(t('common.error_occurred'));
        }
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

  const handleDelete = (item: any) => {

    setOpenDelete(true);
    setDeleteItem(item);

  };

  const handleDeleteSubmit = () => {
    router.delete(`/invoice-types/${deleteItem?.id}`, {
      onSuccess: () => {
        reset();
        setOpenDelete(false);
        setDeleteItem(null);
        toast.success(t('common.updated_successfully'));
      },
    });
  }
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

             
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="is_active">{t('invoices.is_active')}</Label>
            </div>

            <DialogFooter>
              <Button disabled={isSubmitting} type="submit">{t('common.save')}</Button>
              <Button disabled={isSubmitting} type="button" variant="outline" onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <InvoiceTypesTable invoice_types={invoice_types} handleEdit={handleEdit} handleDelete={handleDelete} />



      <Dialog open={openDelete} onOpenChange={setOpenDelete}>


        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('invoices.delete_invoice_type')}</DialogTitle>
          </DialogHeader>

          <p>{t('invoices.delete_invoice_type_message')}</p>
          <p>{deleteItem?.name_ar}</p>
          <DialogFooter>
            <Button disabled={isSubmitting} type="button" onClick={handleDeleteSubmit}>{t('common.save')}</Button>
            <Button disabled={isSubmitting} type="button" variant="outline" onClick={() => setOpenDelete(false)}>{t('common.cancel')}</Button>
          </DialogFooter>
        </DialogContent>


      </Dialog>

    </VendorLayout>
  )
}
