import VendorLayout from '@/layouts/vendor/vendor-layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@inertiajs/react'
import { Users, FileText, Calendar } from 'lucide-react'

export default function index({ clients, invoices, todayInvoices }: any) {
  const { t } = useTranslation();
  const stats = [
    {
      title: t('dashboard.clients'),
      value: clients,
      color: 'bg-green-400',
      icon: <Users className='text-white text-2xl' />,
    },
    {
      title: t('dashboard.invoices'),
      value: invoices,
      color: 'bg-blue-400',
      icon: <FileText className='text-white text-2xl' />,
    },
    {
      title: t('dashboard.todayInvoices'),
      value: todayInvoices,
      color: 'bg-red-400',
      icon: <Calendar className='text-white text-2xl' />,
    },
  ]
  return (
    <VendorLayout>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={` ${stat.color} flex flex-col items-center justify-center rounded-md p-4`}>
            {stat?.icon}
            <h5 className="text-white text-2xl">{stat.title}</h5>
            <p className="text-white text-xl">{stat.value}</p>
          </div>
        ))}
      </div>

    </VendorLayout>
  )
}
