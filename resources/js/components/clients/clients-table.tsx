import React from 'react'
import { useTranslation } from 'react-i18next'
import { Edit2, Trash2 } from 'lucide-react'
import { router } from '@inertiajs/react'
import NoClientsFound from './no-clients-found';
import { Button } from '../ui/button';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'

export default function ClientsTable({ clients, handleEdit, handleDelete }: any) {
    const { t } = useTranslation();

    return (
        <div>

            <div>
                <div className="rounded-xl border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-neutral-900">
                            <TableRow>
                                <TableHead className="text-center">
                                    {t('invoices.client-name')}
                                </TableHead>
                                <TableHead className="text-center">
                                    {t('invoices.client-email')}
                                </TableHead>
                                <TableHead className="text-center">
                                    {t('invoices.client-phone')}
                                </TableHead>
                                <TableHead className="text-center">
                                    {t('invoices.client-invoices')}
                                </TableHead>
                                <TableHead className="text-center">
                                    {t('common.actions')}
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {clients.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <NoClientsFound />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                clients.data.map((client: any) => (
                                    <TableRow key={client.id}>
                                        <TableCell className="text-center font-medium">
                                            {client.name}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {client.email || '-'}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {client.phone || '-'}
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                                {client.invoices_count}
                                            </span>
                                        </TableCell>

                                        <TableCell className="flex justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleEdit(client)}
                                            >
                                                <Edit2 size={16} />
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleDelete(client)}
                                                className="text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* 🔥 Pagination */}
                <div className="flex justify-end gap-2 flex-wrap mt-4">
                    {clients.links.map((link: any, index: number) => (
                        <button
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                            onClick={() =>
                                link.url &&
                                router.visit(link.url, { preserveScroll: true })
                            }
                            className={`px-3 py-1 rounded text-sm ${link.active
                                    ? 'bg-primary text-white'
                                    : 'bg-white border hover:bg-gray-100'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
