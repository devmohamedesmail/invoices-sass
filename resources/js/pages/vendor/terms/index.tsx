import { Button } from '@/components/ui/button';
import VendorLayout from '@/layouts/vendor/vendor-layout'
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import InputError from '@/components/input-error';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';


export default function TermsAndCondition({ terms }: { terms: any }) {

    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTerm, setEditingTerm] = useState<any>(null);
    const [deleteTerm, setDeleteTerm] = useState<any>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const schema = z.object({
        term: z
            .string()
            .min(1, t('validation.required')),

        index: z.number(),
    });
    type FormData = z.infer<typeof schema>;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            term: '',
            index: 0,
        }
    });

    const onSubmit = async (data: FormData) => {

        if (editingTerm) {

            router.put(
                route('terms.conditions.update', editingTerm.id),
                data,
                {
                    onSuccess: () => {
                        reset();
                        setEditingTerm(null);
                        setIsModalOpen(false);
                        toast.success(t('common.updated_successfully'));
                    },
                    onError: () => {
                        toast.error(t('common.error_occurred'));
                    }
                }
            );

            return;
        }

        router.post(
            route('terms.conditions.store'),
            data,
            {
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                    toast.success(t('common.added_successfully'));
                },
                onError: () => {
                    toast.error(t('common.error_occurred'));
                }
            }
        );
    };


    const handleDelete = () => {
        // router.delete(route('terms.conditions.destroy', id), {
        //     onSuccess: () => {
        //         setDeleteOpen(false);

        //         toast.success(t('common.deleted_successfully'));
        //     },
        //     onError: () => {
        //         toast.error(t('common.error_occurred'));
        //     }
        // });

        router.delete(
            route(
                'terms.conditions.destroy',
                deleteTerm?.id
            ),{
                 onSuccess: () => {
                    reset();
                    setDeleteOpen(false);
                    toast.success(t('common.deleted_successfully'));
                },
                onError: () => {
                    toast.error(t('common.error_occurred'));
                }
            }
        );
    };


    return (
        <VendorLayout title=''>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-extrabold text-xl'>{t('invoices.terms-conditions')}</h1>
                </div>



                <Button
                    onClick={() => {
                        setEditingTerm(null);

                        reset({
                            term: '',
                            index: 0,
                        });

                        setIsModalOpen(true);
                    }}
                >
                    <PlusCircle size={16} />
                    {t('terms.create')}
                </Button>
            </div>


            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle>
                            {editingTerm ? t('terms.update') : t('terms.create')}
                        </DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>

                        <Label>{t('terms.band')}</Label>
                        <Input
                            {...register("term", { required: t('validation.required') })} />

                        <InputError message={errors?.term?.message} />

                        <Label>{t('terms.index')}</Label>
                        <Input
                            type='number'
                            {...register("index", {
                                required: t('validation.required'),
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: t('validation.min_value', { min: 1 }),
                                },
                            })}
                            min={1}
                            onKeyDown={(e) => {
                                if (e.key === '-') {
                                    e.preventDefault();
                                }
                            }}
                        />
                        {errors.index && <span className="text-red-500 text-sm">{errors.index.message}</span>}
                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                {t('common.cancel')}
                            </Button>
                            {/* <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? t('common.loading') : t('common.save')}
                            </Button> */}

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting
                                    ? t('common.loading')
                                    : editingTerm
                                        ? t('common.update')
                                        : t('common.save')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle>
                            {t('common.confirm-deletion')}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {t('terms.delete-term-description', { term: editingTerm?.term })}
                    </DialogDescription>
                    <DialogFooter className="mt-6">


                        <Button type="button" variant="outline" onClick={() => setDeleteOpen(false)}>
                            {t('common.cancel')}
                        </Button>


                        <Button onClick={() => handleDelete()} disabled={isSubmitting}>
                            {isSubmitting
                                ? t('common.loading')
                                : t('common.confirm-deletion')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>



            <div className="mt-6 space-y-3">
                {terms?.length > 0 ? (
                    terms.map((item: any) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {item.term}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Index: {item.index}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsModalOpen(true);

                                        reset({
                                            term: item.term,
                                            index: item.index,
                                        });

                                        setEditingTerm(item);
                                    }}
                                >
                                    {t('common.edit')}
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setDeleteTerm(item);
                                        setDeleteOpen(true);
                                        // router.delete(
                                        //     route(
                                        //         'terms.conditions.destroy',
                                        //         item.id
                                        //     )
                                        // );
                                    }}
                                >
                                    {t('common.delete')}
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground">
                        {t('terms.no_terms_found')}
                    </div>
                )}
            </div>

        </VendorLayout>
    )
}
