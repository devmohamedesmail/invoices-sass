import React from 'react';
import Header from '@/components/header';
import useUpdateCompany from '@/hooks/company/useUpdateCompany';
import { Controller } from "react-hook-form";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import {
    BuildingIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
    ImagePlusIcon
} from 'lucide-react';
import VendorLayout from '@/layouts/vendor/vendor-layout';
import InputError from '@/components/input-error';
import ImagePicker from '@/components/ui/image-picker';

export default function UpdateCompany({ company, countries }: any) {

    const {
        t,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        handleCountryChange,
        setValue,
        control,
    } = useUpdateCompany(countries, company);

    return (
        <VendorLayout>
<div className="max-w-9xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                <Card className="border-primary/20 shadow-lg bg-card overflow-hidden">

                    {/* Header */}
                    <CardHeader className="bg-primary/5 border-b border-primary/10 pb-6 px-6 sm:px-10 pt-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="p-4 bg-primary/10 rounded-xl w-fit">
                                <BuildingIcon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl sm:text-3xl text-primary font-bold">
                                    {t("company.update_profile")}
                                </CardTitle>
                                <CardDescription className="text-muted-foreground mt-1 text-base">
                                    {t("company.profile_description")}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8 px-6 sm:px-10 pb-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                            {/* General Info */}
                            <div className="space-y-6">
                                <div className="border-b border-border pb-3">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <BuildingIcon className="w-5 h-5 text-primary" />
                                        {t("company.general_information")}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Name */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.name")}</Label>
                                        <div className="relative">
                                            <BuildingIcon className="absolute left-3 top-3 w-4 h-4" />
                                            <Input className="pl-10 h-11" {...register("name")} />
                                        </div>
                                        <InputError message={errors.name?.message} />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.email")}</Label>
                                        <div className="relative">
                                            <MailIcon className="absolute left-3 top-3 w-4 h-4" />
                                            <Input className="pl-10 h-11" {...register("email")} />
                                        </div>
                                        <InputError message={errors.email?.message} />
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.phone")}</Label>
                                        <div className="relative">
                                            <PhoneIcon className="absolute left-3 top-3 w-4 h-4" />
                                            <Input className="pl-10 h-11" {...register("phone")} />
                                        </div>
                                        <InputError message={errors.phone?.message} />
                                    </div>

                                    {/* Logo */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.logo")}</Label>

                                        {/* Current Logo */}
                                        {company?.logo && (
                                            <img
                                                src={company.logo}
                                                alt="logo"
                                                className="w-20 h-20 rounded-md mb-2"
                                            />
                                        )}

                                        <ImagePicker
                                            label={t("company.logo")}
                                            id="logo"
                                            onChange={(file) =>
                                                setValue("logo", file, { shouldValidate: true })
                                            }
                                            error={errors.logo?.message as string}
                                        />
                                        <InputError message={errors.logo?.message as string} />
                                    </div>

                                    {/* VAT */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.vat_number")}</Label>
                                        <Input className="h-11" {...register("vat_number")} />
                                        <InputError message={errors.vat_number?.message} />
                                    </div>

                                    {/* Tax */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.tax")}</Label>
                                        <Input className="h-11" {...register("tax")} />
                                        <InputError message={errors.tax?.message} />
                                    </div>

                                    {/* Registration */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.registration_number")}</Label>
                                        <Input className="h-11" {...register("registration_number")} />
                                        <InputError message={errors.registration_number?.message} />
                                    </div>

                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-6">
                                <div className="border-b pb-3">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <MapPinIcon className="w-5 h-5 text-primary" />
                                        {t("company.location_details")}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Address */}
                                    <div className="md:col-span-2 space-y-2.5">
                                        <Label>{t("company.address")}</Label>
                                        <div className="relative">
                                            <MapPinIcon className="absolute left-3 top-3 w-4 h-4" />
                                            <Input className="pl-10 h-11" {...register("address")} />
                                        </div>
                                        <InputError message={errors.address?.message} />
                                    </div>

                                    {/* Country */}
                                    <div className="space-y-2.5">
                                        <Label>{t("company.country")}</Label>
                                        <Controller
                                            name="country_id"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        handleCountryChange(value);
                                                    }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="h-11">
                                                        <SelectValue placeholder={t("company.select_country")} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {countries?.map((c: any) => (
                                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                                {c.name_ar}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <InputError message={errors.country_id?.message} />
                                    </div>

                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end pt-6 border-t">
                                <Button disabled={isSubmitting} size="lg">
                                    {isSubmitting ? t('common.saving') : t('common.update')}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>

           
        </VendorLayout>
    );
}