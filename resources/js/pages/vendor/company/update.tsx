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


            <div className=" mx-auto py-8 px-4">

                <Card>
                    <CardHeader>
                        <CardTitle>
                            {t("company.update_profile")}
                        </CardTitle>

                        <CardDescription>
                            {t("company.profile_description")}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Name */}
                            <div>
                                <Label>{t("company.name")}</Label>
                                <div className="relative">
                                    <BuildingIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        {...register("name")}

                                    />
                                </div>
                                <InputError message={errors.name?.message} />
                            </div>

                            {/* Email */}
                            <div>
                                <Label>{t("company.email")}</Label>
                                <div className="relative">
                                    <MailIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        {...register("email")}

                                    />
                                </div>
                                <InputError message={errors.email?.message} />
                            </div>

                            {/* Phone */}
                            <div>
                                <Label>{t("company.phone")}</Label>
                                <div className="relative">
                                    <PhoneIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        {...register("phone")}

                                    />
                                </div>
                                <InputError message={errors.phone?.message} />
                            </div>


                            <div className="space-y-2.5">
                                <Label htmlFor="vat_number" className="text-foreground">
                                    {t("company.vat_number")}
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <BuildingIcon className="h-4 w-4 text-muted-foreground/70" />
                                    </div>
                                    <Input
                                        id="vat_number"
                                        type="text"
                                        className="pl-10 h-11"
                                        placeholder="123456789"
                                        {...register("vat_number")}

                                    />
                                </div>
                                <InputError message={errors.vat_number?.message} />
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="registration_number" className="text-foreground">
                                    {t("company.registration_number")}
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <BuildingIcon className="h-4 w-4 text-muted-foreground/70" />
                                    </div>
                                    <Input
                                        id="registration_number"
                                        type="text"
                                        className="pl-10 h-11"
                                        placeholder="123456789"
                                        {...register("registration_number")}

                                    />
                                </div>
                                <InputError message={errors.registration_number?.message} />
                            </div>

                            {/* Address */}
                            <div>
                                <Label>{t("company.address")}</Label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        {...register("address")}

                                    />
                                </div>
                                <InputError message={errors.address?.message} />
                            </div>

                            {/* Logo */}

                            <img src={company?.logo} alt={company.name} className="w-20 h-20" />
                            <ImagePicker
                                label={t("company.logo")}
                                id="logo"
                                onChange={(file) => setValue("logo", file, { shouldValidate: true })}
                                error={errors.logo?.message as string}
                            />
                            <InputError message={errors.logo?.message as string} />
                            {/* <div>
                                
                                <Label>{t("company.logo")}</Label>
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        setData(
                                            'logo',
                                            e.target.files?.[0] || null
                                        )
                                    }
                                />
                            </div> */}

                            {/* Country */}
                            <div>
                                {/* <Label>{t("company.country")}</Label>

                                <Select
                                    value={data.country_id}
                                    onValueChange={handleCountryChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {countries.map((c: any) => (
                                            <SelectItem
                                                key={c.id}
                                                value={c.id.toString()}
                                            >
                                                {c.name_ar}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select> */}



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
                                                <SelectTrigger className="w-full h-11">
                                                    <SelectValue placeholder={t("company.select_country")} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countries?.map((country: any) => (
                                                        <SelectItem key={country.id} value={country.id.toString()}>
                                                            {country.name_ar}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />

                                    <InputError message={errors.country_id?.message} />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <Button disabled={isSubmitting}>
                                    {isSubmitting
                                        ? t('common.saving')
                                        : t('common.update')}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </VendorLayout>
    );
}