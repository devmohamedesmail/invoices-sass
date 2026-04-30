import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Country {
    id: number;
    name_ar: string;
    name_en: string;
}

export default function useUpdateCompany(
    countries: Country[],
    company: any
) {
    const { t } = useTranslation();

    // ✅ schema
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

    type FormDataType = z.infer<typeof companySchema>;

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useReactHookForm<FormDataType>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: company?.name || "",
            email: company?.email || "",
            phone: company?.phone || "",
            address: company?.address || "",
            city: company?.city || "",
            state: company?.state || "",
            zip: company?.zip || "",
            country_id: company?.country_id?.toString() || "",
            country: company?.country || "",
            vat_number: company?.vat_number || "",
            registration_number: company?.registration_number || "",
            logo: undefined,
            tax: company?.tax?.toString() || "",
        },
    });

    // ✅ country select
    const handleCountryChange = (value: string) => {
        const selectedCountry = countries.find(
            (c) => c.id.toString() === value
        );

        setValue("country_id", value);
        setValue("country", selectedCountry?.name_en || "");
    };

    // ✅ submit (PUT)
    const onSubmit = (data: FormDataType) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value as any);
            }
        });

        // مهم عشان Laravel يتعرف إنه update
        formData.append("_method", "PUT");

        router.post(route("companies.update", company.id), formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success(t("common.updated_successfully"));
            },
            onError: () => {
                toast.error(t("common.something_went_wrong"));
            },
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