"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { router } from "@inertiajs/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

export default function Countries({countries}: {countries: CountryForm[]}) {
  const { t, i18n } = useTranslation();

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
    console.log("data", data);
    try {
      if (editing) {
       router.put(`/admin/countries/${(editing as any).id}`, data);
      } else {
       router.post("/admin/countries", data);
      }

      reset();
      setEditing(null);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  // open edit
  const handleEdit = (country: any) => {
    setEditing(country);
    reset(country);
    setOpen(true);
  };

  // delete
  const handleDelete = async (id: number) => {
    await axios.delete(`/admin/countries/${id}`);
  };

  return (
    <div className="p-6">
      {/* ADD BUTTON */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-black text-white px-4 py-2 rounded">
            {t("countries.add_country")}
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? t("countries.edit_country") : t("countries.add_country")}
            </DialogTitle>
          </DialogHeader>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder={t("countries.name_ar")}
              {...register("name_ar")}
              className="w-full border p-2 rounded"
            />

            <Input
              placeholder={t("countries.name_en")}
              {...register("name_en")}
              className="w-full border p-2 rounded"
            />

            <Input
              placeholder={t("countries.code")}
              {...register("code")}
              className="w-full border p-2 rounded"
            />

            <Input
              placeholder={t("countries.currency")}
              {...register("currency")}
              className="w-full border p-2 rounded"
            />

            <Input
              placeholder={t("countries.currency_symbol")}
              {...register("currency_symbol")}
              className="w-full border p-2 rounded"
            />

            <Input
              placeholder={t("countries.flag")}
              {...register("flag")}
              className="w-full border p-2 rounded"
            />

            <Input
              placeholder={t("countries.vat")}
              {...register("vat")}
              className="w-full border p-2 rounded"
            />

            <div className="flex items-center gap-2">
              <Input type="checkbox" {...register("is_active")} />
              <label>{t("active")}</label>
            </div>

            <DialogFooter>
              
              <Button type="submit">
                {t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Example list (replace with real data) */}
    

      {/* list */}
      <div className="mt-6 space-y-2">
        {countries.map((country:any) => (
          <div key={country.id} className="flex gap-2">
            <p>{country.name_ar}</p>
            <p>{country.name_en}</p>
            <p>{country.code}</p>
            <p>{country.currency}</p>
            <p>{country.currency_symbol}</p>
            <p>{country.flag}</p>
            <p>{country.vat}</p>
            <p>{country.is_active}</p>
            <button
              onClick={() => handleEdit(country)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              {t("edit")}
            </button>

            <button
              onClick={() => handleDelete(country.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              {t("delete")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}