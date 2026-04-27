import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router } from '@inertiajs/react';


export default function CreateClientDialog({isClientModalOpen,setClientModalOpen}: any) {
    const { t } = useTranslation();


    const clientSchema = z.object({
            name: z.string().min(1, t('validation.required', { defaultValue: 'Required' })),
            email: z.string().email(t('validation.invalid_email', { defaultValue: 'Invalid email' })).optional().or(z.literal('')),
            phone: z.string().optional(),
        });
    
        type ClientFormData = z.infer<typeof clientSchema>;
    
        const {
            register: clientRegister,
            handleSubmit: handleClientSubmit,
            reset: resetClientForm,
            formState: { errors: clientErrors, isSubmitting: isCreatingClient },
        } = useForm<ClientFormData>({
            resolver: zodResolver(clientSchema),
            defaultValues: {
                name: '',
                email: '',
                phone: '',
            },
        });
    
    
        const onCreateClient = (data: ClientFormData) => {
            router.post('/clients', data, {
                preserveScroll: true,
                onSuccess: () => {
                    setClientModalOpen(false);
                    resetClientForm();
                },
            });
        };
  return (
       <Dialog open={isClientModalOpen} onOpenChange={setClientModalOpen}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>{t('common.create')} {t('invoices.client')}</DialogTitle>
                    </DialogHeader>
                    {/* <form onSubmit={handleCreateClient} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>{t('invoices.client-name')}</Label>
                            <Input
                                value={newClientName} onChange={e => setNewClientName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('auth.email')}</Label>
                            <Input type="email" value={newClientEmail} onChange={e => setNewClientEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('company.phone')}</Label>
                            <Input type="tel" value={newClientPhone} onChange={e => setNewClientPhone(e.target.value)} />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setClientModalOpen(false)}>
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" disabled={isCreatingClient}>
                                {isCreatingClient ? t('common.save') + '...' : t('common.save')}
                            </Button>
                        </DialogFooter>
                    </form> */}

                    <form onSubmit={handleClientSubmit(onCreateClient)} className="space-y-4 py-4">

                        <div className="space-y-2">
                            <Label>{t('invoices.client-name')}</Label>
                            <Input {...clientRegister('name')} />
                            {clientErrors.name && <p className="text-red-500 text-sm">{clientErrors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>{t('auth.email')}</Label>
                            <Input type="email" {...clientRegister('email')} />
                            {clientErrors.email && <p className="text-red-500 text-sm">{clientErrors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>{t('company.phone')}</Label>
                            <Input type="tel" {...clientRegister('phone')} />
                            {clientErrors.phone && <p className="text-red-500 text-sm">{clientErrors.phone.message}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setClientModalOpen(false)}>
                                {t('common.cancel')}
                            </Button>

                            <Button type="submit" disabled={isCreatingClient}>
                                {isCreatingClient ? t('common.save') + '...' : t('common.save')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
  )
}
