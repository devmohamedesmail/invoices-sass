import React from 'react';
import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface Country {
    id: number;
    name_ar: string;
    name_en: string;
}

export default function useUpdateCompany(countries: Country[], company: any) {
    const { t } = useTranslation();

    const { data, setData, put, processing, errors } = useForm({
        name: company?.name || '',
        email: company?.email || '',
        phone: company?.phone || '',
        address: company?.address || '',
        city: company?.city || '',
        state: company?.state || '',
        zip: company?.zip || '',
        country_id: company?.country_id?.toString() || '',
        country: company?.country || '',
        logo: null as File | null,
    });

    const handleCountryChange = (value: string) => {
        const selectedCountry = countries.find(
            (c) => c.id.toString() === value
        );

        setData((prev: any) => ({
            ...prev,
            country_id: value,
            country: selectedCountry ? selectedCountry.name_en : '',
        }));
    };

    const submit = (e: React.FormEvent) => {
        // e.preventDefault();
        // put(`/companies/${company.id}`);


        e.preventDefault();

        put(route('companies.update', company.id), {
            onSuccess: () => {
                toast.success(t('common.updated_successfully'));
            },
            onError: () => {
                toast.error(t('common.something_went_wrong'));
            },
        });

    };

    return {
        t,
        data,
        setData,
        processing,
        errors,
        submit,
        handleCountryChange,
    };
}