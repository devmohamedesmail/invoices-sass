import React from 'react'
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import NoResultFount from '../ui/no-result-fount'

export default function InvoiceTypesTable({ invoice_types, handleEdit, handleDelete }: { invoice_types: any, handleEdit: (item: any) => void, handleDelete: (id: number) => void }) {
    const { t } = useTranslation()
    return (
        <div className="mt-6">
            <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
                <Table>
                    <TableHeader className="bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                        <TableRow>
                            <TableHead className="text-center">{t('invoices.name_ar')}</TableHead>
                            <TableHead className="text-center">{t('invoices.name_en')}</TableHead>
                            <TableHead className="text-center">{t('invoices.is_active')}</TableHead>
                            <TableHead className="text-center">
                                {t('common.actions')}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {invoice_types?.length > 0 ? (
                            invoice_types.map((item: any) => (
                                <TableRow
                                    key={item.id}
                                    className="hover:bg-neutral-50 dark:hover:bg-neutral-900"
                                >
                                    <TableCell className="font-medium text-center">
                                        {item.name_ar}
                                    </TableCell>

                                    <TableCell className="text-center">{item.name_en}</TableCell>

                                    <TableCell className="text-center">
                                        {item.is_active ? (
                                            <span className="text-green-600 text-center">{t('common.active')}</span>
                                        ) : (
                                            <span className="text-red-500 text-center">{t('common.inactive')}</span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                onClick={() => handleEdit(item)}
                                                className="px-3 py-1 text-xs rounded-md bg-green-700 text-white hover:bg-green-600"
                                                variant="outline"
                                                size="sm"  
                                            >
                                                {t('common.edit')}
                                            </Button>

                                            <Button
                                                onClick={() => handleDelete(item)}
                                                className="px-3 py-1 text-xs rounded-md bg-red-500 text-white hover:bg-red-600"
                                                variant="outline"
                                                size="sm"
                                            >
                                                {t('common.delete')}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            // <TableRow>
                            //     <TableCell colSpan={4} className="p-4 text-center text-neutral-500">
                            //         No invoice types found
                            //     </TableCell>
                            // </TableRow>
                            <NoResultFount colSpan={4} />
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}