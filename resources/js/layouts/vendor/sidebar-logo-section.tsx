import React from 'react'
import { usePage } from '@inertiajs/react';

export default function SidebarLogoSection({ isCollapsed }: { isCollapsed: boolean }) {
    const { company } = usePage().props as any;
    return (
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg p-2 bg-white ">
                    {company.logo && (
                        <img src={company.logo} alt={company.name} className='object-cover rounded-lg w-full h-full' />
                    )}
                </div>
                {/* <Logo /> */}

                {!isCollapsed && (
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-primary-foreground">{company.name}</span>
                        {/* <span className="text-xs text-muted-foreground">{company.name_ar}</span> */}
                    </div>
                )}
            </div>
        </div>
    )
}
