import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import InputError from '../input-error';

export default function ClientDialog({ isModalOpen, setIsModalOpen, editingClient, handleSubmit, register, errors, reset, isSubmitting, onSubmit }: any) {
    const { t } = useTranslation();
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
