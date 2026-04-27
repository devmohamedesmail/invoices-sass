import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import InputError from '../input-error';

export default function ClientDialog({ isModalOpen, setIsModalOpen, editingClient, handleSubmit, register, errors, reset, isSubmitting, onSubmit }: any) {
    const { t } = useTranslation();


    // const clientSchema = z.object({
    //     name: z.string().min(2, 'Name is required'),
    //     email: z.string().email().optional().or(z.literal('')),
    //     phone: z.string().optional(),
    //     address: z.string().optional(),
    //     city: z.string().optional(),
    //     state: z.string().optional(),
    //     country: z.string().optional(),
    // });
    // type ClientFormData = z.infer<typeof clientSchema>;


    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors, isSubmitting },
    // } = useForm<ClientFormData>({
    //     resolver: zodResolver(clientSchema),
    // });


    // const onSubmit = (data: ClientFormData) => {
    //     if (editingClient) {
    //         router.put(`/clients/${editingClient.id}`, data, {
    //             preserveScroll: true,
    //             onSuccess: () => setIsModalOpen(false),
    //         });
    //     } else {
    //         router.post('/clients', data, {
    //             preserveScroll: true,
    //             onSuccess: () => setIsModalOpen(false),
    //         });
    //     }
    // };

    return (
       <>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>{editingClient ? t('common.edit') : t('common.create')} {t('invoices.client')}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <Label>{t('invoices.client-name')}</Label>
                            <Input
                                {...register('name')}
                                placeholder={t('invoices.client-name')}
                            />
                            <InputError message={errors.name?.message} />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('auth.email')}</Label>
                            <Input
                                {...register('email')}

                                placeholder={t('invoices.client-email')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('invoices.client-phone')}</Label>
                            <Input
                                {...register('phone')}

                                placeholder={t('invoices.client-phone')}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>{t('invoices.client-address')}</Label>
                            <Input
                                {...register('address')}

                                placeholder={t('invoices.client-address')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('company.city', { defaultValue: 'City' })}</Label>
                            <Input {...register('city')} />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('company.state', { defaultValue: 'State' })}</Label>
                            <Input {...register('state')} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>{t('company.country', { defaultValue: 'Country' })}</Label>
                            <Input {...register('country')} />
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? t('common.loading') : (editingClient ? t('common.update', { defaultValue: 'Update' }) : t('common.save'))}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
       
       </>
    )
}
