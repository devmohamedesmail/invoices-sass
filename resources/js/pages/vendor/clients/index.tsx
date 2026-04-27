import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import VendorLayout from '@/layouts/vendor/vendor-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Users, PlusCircle, Trash2, Edit2, Phone, Mail, MapPin } from 'lucide-react';
import { Client } from '@/types/vendor';
import ClientsTable from '@/components/clients/clients-table';
import ClientsHeader from '@/components/clients/clients-header';
import ClientsSearch from '@/components/clients/clients-search';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ClientDialog from '@/components/clients/client-dialog';
import ClientDeleteDialog from '@/components/clients/client-delete-dialog';




interface Props {
  clients: {
    data: Client[];
    links: any[];
    meta: any;
  };
  filters: {
    search?: string;
  };
}

export default function ClientsIndex({ clients, filters }: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState(filters.search || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const clientSchema = z.object({
    name: z.string().min(2, t('invoices.client-name-required')),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  });
  type ClientFormData = z.infer<typeof clientSchema>;


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });


  const onSubmit = (data: ClientFormData) => {
    if (editingClient) {
      router.put(`/clients/${editingClient.id}`, data, {
        preserveScroll: true,
        onSuccess: () => setIsModalOpen(false),
      });
    } else {
      router.post('/clients', data, {
        preserveScroll: true,
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const handleOpenCreate = () => {
    setEditingClient(null);
    reset({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
    });
    setIsModalOpen(true);
  };

 

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);

    reset({
      name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      country: client.country || '',
    });

    setIsModalOpen(true);
  };




  const handleSearch = (value: string) => {
    setSearch(value);

    router.get('/clients', { search: value }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleOpenDelete = (client: Client) => {
    // setEditingClient(client);
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  return (
    <VendorLayout title={t('vendor.sidebar.clients')}>
      <div className="max-w-9xl mx-auto pb-16 space-y-6">


        <ClientsHeader
          handleOpenCreate={handleOpenCreate}
        />


        <ClientsSearch
          search={search}
          handleSearch={handleSearch}
          clients={clients}
        />



        <ClientsTable
          clients={clients}
          handleEdit={handleOpenEdit}
          handleDelete={handleOpenDelete}
        />

      </div>

   

      <ClientDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingClient={editingClient}
        setEditingClient={setEditingClient}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        reset={reset}
        onSubmit={onSubmit}
      />



      <ClientDeleteDialog
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        clientToDelete={clientToDelete}
        setClientToDelete={setClientToDelete}
      />
    </VendorLayout>
  );
}
