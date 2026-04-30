"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { router } from "@inertiajs/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/layouts/admin/admin-layout";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// schema
const countrySchema = z.object({
  name_ar: z.string().min(2),
  name_en: z.string().min(2),
  code: z.string().min(2),
  currency: z.string().min(2),
  currency_symbol: z.string().min(1),
  flag: z.string().optional(),
  vat: z.string().optional(),
  is_active: z.boolean(),
});

type CountryForm = z.infer<typeof countrySchema>;

export default function Countries({ countries }: { countries: CountryForm[] }) {
  const { t, i18n } = useTranslation();
  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false)
  const [deleteItem, setDeleteItem] = useState<any>(null)

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CountryForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CountryForm>({
    resolver: zodResolver(countrySchema),
    defaultValues: {
      is_active: true,
    },
  });

  // submit
  const onSubmit = async (data: CountryForm) => {

    try {
      if (editing) {
        router.put(`/admin/countries/${(editing as any).id}`, data);
      } else {
        router.post("/admin/countries", data);
      }

      reset();
      setEditing(null);
      setOpen(false);
      toast.success(t('country.added_success'))
    } catch (e) {
      toast.error(t('common.error'))
    }
  };

  // open edit
  const handleEdit = (country: any) => {
    setEditing(country);
    reset(country);
    setOpen(true);
  };

  // delete
  const handleDelete = async (country: any) => {
    setDeleteDialogOpened(true)
    setDeleteItem(country)
  };

  const confirmDelete = () => {
    if (!deleteItem?.id) return

    router.delete(`/admin/countries/${deleteItem.id}`, {
      preserveScroll: true,

      onSuccess: () => {
        toast.success(t('country.deleted_success', 'Deleted successfully'))
        setDeleteDialogOpened(false)
        setDeleteItem(null)
      },

      onError: () => {
        toast.error(t('common.error', 'Something went wrong'))
      }
    })
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* ADD BUTTON */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              {t("admin.countries.add_country")}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? t("admin.countries.edit_country") : t("admin.countries.add_country")}
              </DialogTitle>
            </DialogHeader>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                placeholder={t("admin.countries.name_ar")}
                {...register("name_ar")}
                className="w-full border p-2 rounded"
              />

              <Input
                placeholder={t("admin.countries.name_en")}
                {...register("name_en")}
                className="w-full border p-2 rounded"
              />

              <Input
                placeholder={t("admin.countries.code")}
                {...register("code")}
                className="w-full border p-2 rounded"
              />

              <Input
                placeholder={t("admin.countries.currency")}
                {...register("currency")}
                className="w-full border p-2 rounded"
              />

              <Input
                placeholder={t("admin.countries.currency_symbol")}
                {...register("currency_symbol")}
                className="w-full border p-2 rounded"
              />

              <Input
                placeholder={t("admin.countries.flag")}
                {...register("flag")}
                className="w-full border p-2 rounded"
              />

              <Input
                placeholder={t("admin.countries.vat")}
                {...register("vat")}
                className="w-full border p-2 rounded"
              />

              <div className="flex items-center gap-2">
                {/* <Input type="checkbox" {...register("is_active")} /> */}
                <Checkbox {...register("is_active")} />
                <Label>{t("common.active")}</Label>
              </div>

              <DialogFooter>

                <Button type="submit">
                  {t("common.save")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>




        {/* delete Dialog */}
        <Dialog open={deleteDialogOpened} onOpenChange={setDeleteDialogOpened}>


          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                {t("admin.countries.delete_country_title")}
              </DialogTitle>

              <DialogDescription className="text-center">
                {t("admin.countries.delete_country_message")}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button variant="secondary" className="cursor-pointer" onClick={() => setDeleteDialogOpened(false)}>
                {t("common.cancel")}
              </Button>
              <Button variant="destructive" className="cursor-pointer" onClick={confirmDelete}>
                {t("common.delete")}
              </Button>
            </DialogFooter>

          </DialogContent>
        </Dialog>

        {/* Example list (replace with real data) */}
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">{t("admin.countries.name_ar")}</TableHead>
                <TableHead className="text-center">{t("admin.countries.name_en")}</TableHead>
                <TableHead className="text-center">{t("admin.countries.code")}</TableHead>
                <TableHead className="text-center">{t("admin.countries.currency")}</TableHead>
                <TableHead className="text-center">{t("admin.countries.currency_symbol")}</TableHead>
                <TableHead className="text-center">{t("admin.countries.flag")}</TableHead>
                <TableHead className="text-center">{t("admin.countries.vat")}</TableHead>
                <TableHead className="text-center">{t("admin.countries.status")}</TableHead>
                <TableHead className="text-center">{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {countries.map((country: any) => (
                <TableRow key={country.id}>
                  <TableCell className="text-center">{country.name_ar}</TableCell>
                  <TableCell className="text-center">{country.name_en}</TableCell>
                  <TableCell className="text-center">{country.code}</TableCell>
                  <TableCell className="text-center">{country.currency}</TableCell>
                  <TableCell className="text-center">{country.currency_symbol}</TableCell>

                  {/* Flag */}
                  <TableCell className="text-center">
                    {country.flag}
                  </TableCell>

                  {/* VAT */}
                  <TableCell className="text-center">{country.vat}%</TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs text-center ${country.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {country.is_active ? t("active") : t("inactive")}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right space-x-2">
                    <Button
                      onClick={() => handleEdit(country)}
                      variant="secondary"
                    >
                      {t("common.edit")}
                    </Button>

                    <Button
                      onClick={() => handleDelete(country)}
                      variant="destructive"
                    >
                      {t("common.delete")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>


      </div>
    </AdminLayout>
  );
}