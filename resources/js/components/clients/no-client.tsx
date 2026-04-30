import React from 'react'
import { useTranslation } from 'react-i18next';
import { UserPlus } from 'lucide-react';

export default function NoClient() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">


            <div className="mb-4">
                <UserPlus className="w-12 h-12 text-gray-400" />
            </div>


            <p className="text-lg font-semibold text-gray-700">
                {t('clients.no_clients')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
                {t('clients.add_first_client')}
            </p>
        </div>
    )
}
