
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BuildingIcon, MailIcon, MapPinIcon, PhoneIcon, ImagePlusIcon } from 'lucide-react';
import Header from '@/components/header';
import useCreateCompany from '@/hooks/company/useCreateCompany';
import InputError from '@/components/input-error';
import { Controller } from "react-hook-form";
import ImagePicker from '@/components/ui/image-picker';

interface Country {
    id: number;
    name_ar: string;
    name_en: string;
}



interface Props {
    countries: Country[];

}

export default function CreateCompany({ countries }: Props) {

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
    } = useCreateCompany(countries);

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Card className="border-primary/20 shadow-lg bg-card overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b border-primary/10 pb-6 px-6 sm:px-10 pt-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="p-4 bg-primary/10 rounded-xl w-fit">
                                <BuildingIcon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl sm:text-3xl text-primary font-bold">
                                    {t("company.profile")}
                                </CardTitle>
                                <CardDescription className="text-muted-foreground mt-1 text-base">
                                    {t("company.profile_description")}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8 px-6 sm:px-10 pb-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                            {/* General Information Section */}
                            <div className="space-y-6">
                                <div className="border-b border-border pb-3">
                                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                        <BuildingIcon className="w-5 h-5 text-primary" />
                                        {t("company.general_information")}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2.5">
                                        <Label htmlFor="name" className="text-foreground">
                                            {t("company.name")}
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <BuildingIcon className="h-4 w-4 text-muted-foreground/70" />
                                            </div>
                                            <Input
                                                id="name"
                                                type="text"
                                                className="pl-10 h-11"
                                                placeholder="Acme Corp"
                                                {...register("name")}
                                            />
                                        </div>
                                        <InputError message={errors.name?.message} />
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label htmlFor="email" className="text-foreground">
                                            {t("company.email")}
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <MailIcon className="h-4 w-4 text-muted-foreground/70" />
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                className="pl-10 h-11"
                                                placeholder="contact@acme.com"
                                                {...register("email")}
                                            />
                                        </div>
                                        <InputError message={errors.email?.message} />
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label htmlFor="phone" className="text-foreground">
                                            {t("company.phone")}
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <PhoneIcon className="h-4 w-4 text-muted-foreground/70" />
                                            </div>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                className="pl-10 h-11"
                                                placeholder="+1 (555) 000-0000"
                                                {...register("phone")}
                                            />
                                        </div>
                                        <InputError message={errors.phone?.message} />
                                    </div>
                                    <ImagePicker
                                        label={t("company.logo")}
                                        id="logo"
                                        onChange={(file) => setValue("logo", file, { shouldValidate: true })}
                                        error={errors.logo?.message as string}
                                    />
                                    <InputError message={errors.logo?.message as string} />
                                    {/* <div className="space-y-2.5 flex flex-col justify-start">
                                        <Label htmlFor="logo" className="text-foreground">
                                            {t("company.logo")}
                                        </Label>

                                        <div className="relative">
                                            <Input
                                                id="logo"
                                                type="file"
                                                accept="image/*"
                                                {...register("logo")}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    setValue("logo", file, { shouldValidate: true });
                                                }}
                                                className="h-11 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer pt-2"
                                            />

                                            <ImagePlusIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground/50 pointer-events-none" />
                                        </div>

                                        <InputError message={errors.logo?.message as string} />
                                    </div> */}



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
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="space-y-6">
                                <div className="border-b border-border pb-3 mt-6">
                                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                        <MapPinIcon className="w-5 h-5 text-primary" />
                                        {t("company.location_details")}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-2.5 md:col-span-2">
                                        <Label htmlFor="address" className="text-foreground">
                                            {t("company.street_address")}
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <MapPinIcon className="h-4 w-4 text-muted-foreground/70" />
                                            </div>
                                            <Input
                                                id="address"
                                                type="text"
                                                className="pl-10 h-11"
                                                placeholder="123 Main St, Suite 100"
                                                {...register("address")}
                                            />
                                        </div>
                                        <InputError message={errors.address?.message} />
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label htmlFor="city" className="text-foreground">
                                            {t("company.city")}
                                        </Label>
                                        <Input
                                            id="city"
                                            type="text"
                                            className="h-11"
                                            placeholder="New York"
                                            {...register("city")}
                                        />
                                        <InputError message={errors.city?.message} />
                                    </div>

                                    <div className="space-y-2.5 border-none">
                                        <Label htmlFor="state" className="text-foreground">
                                            {t("company.state")}
                                        </Label>
                                        <Input
                                            id="state"
                                            type="text"
                                            className="h-11"
                                            placeholder="NY"
                                            {...register("state")}
                                        />
                                        <InputError message={errors.state?.message} />
                                    </div>

                                    <div className="space-y-2.5">
                                        <Label htmlFor="zip" className="text-foreground">
                                            {t("company.zip")}
                                        </Label>
                                        <Input
                                            id="zip"
                                            type="text"
                                            className="h-11"
                                            placeholder="10001"
                                            {...register("zip")}
                                        />
                                        <InputError message={errors.zip?.message} />
                                    </div>

                                    {/* <div className="space-y-2.5 border-none">
                                        <Label htmlFor="country_id" className="text-foreground">
                                            {t("company.country")}
                                        </Label>
                                        <Select
                                            // value={data.country_id}
                                            onValueChange={handleCountryChange}
                                        >
                                            <SelectTrigger id="country_id" className="w-full h-11">
                                                <SelectValue placeholder={t("company.select_country")} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries?.map((country) => (
                                                    <SelectItem key={country.id} value={country.id.toString()}>
                                                        {country.name_ar}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.country_id?.message} />
                                    </div> */}

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
                                                    {countries?.map((country) => (
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
                            </div>

                            <div className="flex justify-end pt-8 border-t border-border mt-8">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    size="lg"
                                    className="px-8 h-12 text-base font-medium transition-transform active:scale-95"
                                >
                                    {isSubmitting ? t('common.saving') : t('common.save')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
