import React from 'react'
import { TableCell, TableRow } from './table'
import { useTranslation } from 'react-i18next'

export default function NoResultFount({ colSpan }: { colSpan: number }) {
    const { t } = useTranslation()
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="p-4 text-center text-neutral-500">
                {t('common.no_results')}
            </TableCell>
        </TableRow>
    )
}
