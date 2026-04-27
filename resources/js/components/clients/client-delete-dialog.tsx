import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';


export default function ClientDeleteDialog({ isDeleteModalOpen, setIsDeleteModalOpen, clientToDelete, setClientToDelete }: any) {
    const { t } = useTranslation();
     const handleDelete = () => {
        // if (!confirm(t('common.delete_confirm', { defaultValue: 'Are you sure you want to delete?' }))) return;
        router.delete(`/clients/${clientToDelete?.id}`, { preserveScroll: true });
        setIsDeleteModalOpen(false);
        setClientToDelete(null);

    };
  return (
   <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>{t('invoices.delete-client')}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {t('invoices.delete-client-description')}
                </DialogDescription>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                        {t('common.cancel')}
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete()}>
                        {t('common.delete')}
                    </Button>
                </DialogFooter>
            
            </DialogContent>
        </Dialog>
  )
}
