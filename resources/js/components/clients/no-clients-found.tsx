import React from 'react'
import { useTranslation } from 'react-i18next'

export default function NoClientsFound() {
    const {t}=useTranslation();
  return (
     <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500">
                    {t('common.no_results')}
                  </td>
                </tr>
  )
}