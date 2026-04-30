import { usePage } from '@inertiajs/react'
import React from 'react'

export default function AppLogo() {
    const {settings}:any=usePage().props;
  return (
    <div className='flex items-center justify-between gap-2 px-2'>
        <img src={settings?.app_logo} className='h-10 w-auto' alt={settings?.app_name} />
        <span className='font-bold text-white text-xl'>{settings?.app_name_ar}</span>
    </div>
  )
}
