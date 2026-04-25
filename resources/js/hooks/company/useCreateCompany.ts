import React from 'react'
import { useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'

interface Country {
    id: number;
    name_ar: string;
    name_en: string;
}

export default function useCreateCompany(countries: Country[]) {

    const { t, i18n } = useTranslation()
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country_id: '',
        country: '',
        logo: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Adjust the post URL to your actual store route
        post('/companies/store');
    };

    const handleCountryChange = (value: string) => {
        const selectedCountry = countries.find((c:any) => c.id.toString() === value);
        setData((prevData) => ({
            ...prevData,
            country_id: value,
            country: selectedCountry ? selectedCountry.name_en : '',
        }));
    };

    return {
 t,
        data,
        setData,
        post,
        processing,
        errors,
        submit,
        handleCountryChange,
    }
}
