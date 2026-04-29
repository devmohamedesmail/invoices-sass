import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useTranslation } from 'react-i18next';
import { FileText, Trash2, Printer, Pencil, Eye ,MoreVertical} from 'lucide-react';
import ReactDOM from "react-dom/client";
import InvoicePaper from "./invoice-paper";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

export default function InvoicesTable({ invoices, handleDelete, paymentBadge, balanceClass }: any) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';





     const printInvoice = (invoice: any) => {
        const printContainer = document.createElement('div');
        printContainer.className = 'printable-area';
        document.body.appendChild(printContainer);

        const root = ReactDOM.createRoot(printContainer);
        root.render(<InvoicePaper invoice={invoice}  />);

        const printStyles = `
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-area, .printable-area * {
              visibility: visible;
            }
            .printable-area {
              position: absolute;
              left: 0;
              top: 0;
            }
            @page {
              margin: 20px;
            }
            .no-print {
              display: none !important;
            }
              .bg-gray-200 {
                background-color: #d3d3d3 !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
          }
        `;

        const styleTag = document.createElement('style');
        styleTag.innerHTML = printStyles;
        document.head.appendChild(styleTag);

        setTimeout(() => {
            window.print();

            setTimeout(() => {
                root.unmount();
                document.body.removeChild(printContainer);
                document.head.removeChild(styleTag);
            }, 500);
        }, 2000);
    };
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader className="bg-neutral-50 dark:bg-neutral-800">
                    <TableRow className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">
                        <TableHead className="px-5 py-3.5 text-center">#</TableHead>
                        <TableHead className="px-5 py-3.5 text-center">{t('invoices.invoice_number')}</TableHead>
                        <TableHead className="px-5 py-3.5 text-center">{t('invoices.client_name')}</TableHead>
                        <TableHead className="px-5 py-3.5 text-center">{t('invoices.invoice_type')}</TableHead>
                        <TableHead className="px-5 py-3.5 text-center">{t('invoices.payment_type')}</TableHead>
                        <TableHead className="px-5 py-3.5 text-center">{t('invoices.total')}</TableHead>
                        <TableHead className="px-5 py-3.5 text-right">{t('invoices.balance')}</TableHead>
                        <TableHead className="px-5 py-3.5 text-right">{t('common.actions')}</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {invoices.data.map((invoice: any, idx: number) => (
                        <TableRow
                            key={invoice.id}
                            className="hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
                        >
                            <TableCell className="px-5 py-3.5 text-neutral-400 text-center">
                                {invoices.from + idx}
                            </TableCell>

                            <TableCell className="px-5 py-3.5 font-semibold text-neutral-800 dark:text-neutral-100 text-center">
                                <span className="flex items-center gap-1.5">
                                    <FileText size={14} className="text-blue-500 shrink-0" />
                                    {invoice.invoice_number}
                                </span>
                            </TableCell>

                            <TableCell className="px-5 py-3.5 text-neutral-700 dark:text-neutral-300 text-center">
                                {invoice.client?.name ?? '—'}
                            </TableCell>

                            <TableCell className="px-5 py-3.5 text-neutral-600 dark:text-neutral-400 text-center">
                                {invoice.invoice_type
                                    ? (isRTL ? invoice.invoice_type.name_ar : invoice.invoice_type.name_en)
                                    : '—'}
                            </TableCell>

                          

                            <TableCell className="px-5 py-3.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize text-center ${paymentBadge(invoice.payment_type)}`}>
                                    {t(`invoices.payment_${invoice.payment_type}`) || invoice.payment_type}
                                </span>
                            </TableCell>

                            <TableCell className="px-5 py-3.5 text-right font-medium text-neutral-800 dark:text-neutral-200 text-center">
                                {Number(invoice.total).toFixed(2)}
                            </TableCell>

                            <TableCell className={`px-5 py-3.5  ${balanceClass(invoice.balance)} text-center`}>
                                {Number(invoice.balance).toFixed(2)}
                            </TableCell>

                            <TableCell className="px-5 py-3.5 text-right">


                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-8 h-8"
                                        >
                                            <MoreVertical size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end" className="w-40">

                                      

                                         <DropdownMenuItem
                                            onClick={() => printInvoice(invoice)}
                                        >
                                            <Printer size={14} />
                                            {t('invoices.print-invoice')}
                                        </DropdownMenuItem>

                                         <DropdownMenuItem
                                            onClick={() => router.visit(`/invoices/show/preview/${invoice.id}`)}
                                        >
                                            <Eye size={14} />
                                            {t('invoices.preview-invoice')}
                                        </DropdownMenuItem>



                                         <DropdownMenuItem
                                            onClick={() => router.visit(`/invoices/show/${invoice.id}`)}
                                        >
                                            <Eye size={14} />
                                            {t('invoices.show-invoice')}
                                        </DropdownMenuItem>

                                        {/* Separator */}
                                        <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-1" />

                                        {/* Delete */}
                                        <DropdownMenuItem
                                            variant="destructive"
                                            onClick={() => handleDelete(invoice.id)}
                                        >
                                            <Trash2 size={14} />
                                            {t('common.delete')}
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                        
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
