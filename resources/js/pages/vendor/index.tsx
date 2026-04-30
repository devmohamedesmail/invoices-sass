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



      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={` ${stat.color} flex flex-col items-center justify-center rounded-md p-4`}>
            {stat?.icon}
            <h5 className="text-white text-2xl">{stat.title}</h5>
            <p className="text-white text-xl">{stat.value}</p>
          </div>
        ))}
      </div> */}


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0  group-hover:opacity-20 transition ${stat.color}`} />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">

              {/* Text */}
              <div>
                <p className="text-sm text-white mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-white">
                  {stat.value}
                </h3>
              </div>

              {/* Icon */}
              <div className={`p-3 rounded-xl ${stat.color} shadow-md`}>
                {stat.icon}
              </div>
            </div>

            {/* Bottom subtle line */}
            <div className="mt-4 h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        ))}
      </div>

    </VendorLayout>
  )
}
