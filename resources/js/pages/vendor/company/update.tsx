import React from 'react';
import Header from '@/components/header';
import useUpdateCompany from '@/hooks/company/useUpdateCompany';

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

export default function UpdateCompany({ company, countries }: any) {

const {
    t,
    data,
    setData,
    processing,
    errors,
    submit,
    handleCountryChange,
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
                        <form onSubmit={submit} className="space-y-8">

                            {/* Name */}
                            <div>
                                <Label>{t("company.name")}</Label>
                                <div className="relative">
                                    <BuildingIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                </div>
                                {errors.name && <p>{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <Label>{t("company.email")}</Label>
                                <div className="relative">
                                    <MailIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <Label>{t("company.phone")}</Label>
                                <div className="relative">
                                    <PhoneIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <Label>{t("company.address")}</Label>
                                <div className="relative">
                                    <MapPinIcon className="absolute left-3 top-3 w-4 h-4" />
                                    <Input
                                        className="pl-10"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Logo */}
                            <div>
                              <img src={company.logo} alt={company.name} className="w-20 h-20" />
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
                            </div>

                            {/* Country */}
                            <div>
                                <Label>{t("company.country")}</Label>

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
                                </Select>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <Button disabled={processing}>
                                    {processing
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