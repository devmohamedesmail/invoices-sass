
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BuildingIcon, MailIcon, MapPinIcon, PhoneIcon, ImagePlusIcon } from 'lucide-react';
import Header from '@/components/header';
import useCreateCompany from '@/hooks/company/useCreateCompany';

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
    data,
    setData,
    processing,
    errors,
    submit,
    handleCountryChange,
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
                        <form onSubmit={submit} className="space-y-10">
                            
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
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
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
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                        </div>
                                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
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
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                        </div>
                                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-2.5 flex flex-col justify-start">
                                        <Label htmlFor="logo" className="text-foreground">
                                            {t("company.logo")}
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="logo"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                                className="h-11 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer pt-2"
                                            />
                                            <ImagePlusIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground/50 pointer-events-none" />
                                        </div>
                                        {errors.logo && <p className="text-sm text-destructive">{errors.logo}</p>}
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
                                                value={data.address}
                                                onChange={(e) => setData('address', e.target.value)}
                                            />
                                        </div>
                                        {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
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
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                        />
                                        {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
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
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                        />
                                        {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
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
                                            value={data.zip}
                                            onChange={(e) => setData('zip', e.target.value)}
                                        />
                                        {errors.zip && <p className="text-sm text-destructive">{errors.zip}</p>}
                                    </div>

                                    <div className="space-y-2.5 border-none">
                                        <Label htmlFor="country_id" className="text-foreground">
                                            {t("company.country")}
                                            </Label>
                                        <Select
                                            value={data.country_id}
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
                                        {errors.country_id && <p className="text-sm text-destructive">{errors.country_id}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-8 border-t border-border mt-8">
                                <Button 
                                    type="submit" 
                                    disabled={processing} 
                                    size="lg" 
                                    className="px-8 h-12 text-base font-medium transition-transform active:scale-95"
                                >
                                    {processing ? t('common.saving') : t('common.save')}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
       </>
    );
}
