// import React from 'react'
// import { useForm } from '@inertiajs/react'
// import { useTranslation } from 'react-i18next'

// interface Country {
//     id: number;
//     name_ar: string;
//     name_en: string;
// }

// export default function useCreateCompany(countries: Country[]) {

//     const { t, i18n } = useTranslation()
//     const { data, setData, post, processing, errors } = useForm({
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         city: '',
//         state: '',
//         zip: '',
//         country_id: '',
//         country: '',
//         vat_number: '',
//         registration_number: '',
//         logo: null as File | null,
//     });

//     const submit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Adjust the post URL to your actual store route
//         post('/companies/store');
//     };

//     const handleCountryChange = (value: string) => {
//         const selectedCountry = countries.find((c:any) => c.id.toString() === value);
//         setData((prevData) => ({
//             ...prevData,
//             country_id: value,
//             country: selectedCountry ? selectedCountry.name_en : '',
//         }));
//     };

//     return {
//  t,
//         data,
//         setData,
//         post,
//         processing,
//         errors,
//         submit,
//         handleCountryChange,
//     }
// }






import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";







interface Country {
    id: number;
    name_ar: string;
    name_en: string;
}

export default function useCreateCompany(countries: Country[]) {
    const { t, i18n } = useTranslation();


 const companySchema = z.object({
    name: z.string().min(1, t("company.name_required")),
    email: z.string().optional(),
    phone: z.string().min(1, t("company.phone_required")),
    address: z.string().min(1, t("company.address_required")),
    city: z.string().min(1, t("company.city_required")),
    state: z.string().optional(),
    zip: z.string().optional(),
    country_id: z.string().min(1, t("company.country_required")),
    country: z.string().optional(),
    vat_number: z.string().optional(),
    registration_number: z.string().optional(),
    tax: z.string().optional(),
    logo: z
        .any()
        .optional()
        .refine((file) => {
            if (!file) return true;
            return file instanceof File;
        }, t("company.file_invalid"))
        .refine((file) => {
            if (!file) return true;
            return file.size <= 2 * 1024 * 1024;
        }, t("company.file_size_invalid"))
        .refine((file) => {
            if (!file) return true;
            return file.type?.startsWith("image/");
        }, "لازم صورة فقط"),
});

type FormData = z.infer<typeof companySchema>;
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useReactHookForm<FormData>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country_id: "",
            country: "",
            vat_number: "",
            registration_number: "",
            tax: "",
            logo: undefined,
        },
    });

    // const onSubmit = (data: FormData) => {
    //     router.post("/companies/store", data);
    // };

    const handleCountryChange = (value: string) => {
        const selectedCountry = countries.find(
            (c) => c.id.toString() === value
        );

        setValue("country_id", value);
        setValue("country", selectedCountry?.name_en || "");
    };
    const onSubmit = (data: FormData) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        router.post("/companies/store", formData, {
            forceFormData: true,
        });
    };

    return {
        t,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
        handleCountryChange,
        setValue,
        control,
    };
}
