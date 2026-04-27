import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTranslation } from 'react-i18next';
import {
    Menu,
    X,
    Bell,
    Search,
    LayoutDashboard,
    FileText,
    Settings,
    HelpCircle,
    LogOut,
    CreditCard,
    Users,
    Sun,
    Moon
} from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import SidebarLogoSection from '@/layouts/vendor/sidebar-logo-section';
import SidebarFooter from '@/layouts/vendor/sidebar-footer';


interface SidebarProps {
    isCollapsed: boolean
    isMobileOpen: boolean
    onClose?: () => void
}


export default function VendorSidebar({ isCollapsed, isMobileOpen, onClose }: SidebarProps) {
    const { t, i18n } = useTranslation()
    const isRtl = i18n.language === 'ar';
    const { company } = usePage().props as any;
    
    


    const navigation = [
        { 
            name: t('vendor.sidebar.dashboard'), 
            href: '/dashboard', 
            icon: LayoutDashboard, 
            active: false 
        },
        { 
            name: t('vendor.sidebar.clients'), 
            href: '/clients', 
            icon: Users, 
            // active: route().current('clients.*') ?? false 
        },
        { 
            name: t('vendor.sidebar.new_invoice'), 
            href: '/invoices/create', 
            icon: FileText, 
            // active: route().current('invoices.*') ?? false 
        },
        { 
            name: t('vendor.sidebar.invoices'), 
            href: '/invoices', 
            icon: FileText, 
            // active: route().current('invoices.*') ?? false 
        },
        { 
            name: t('vendor.sidebar.invoices-types'), 
            href: '/invoices-types', 
            icon: CreditCard, 
            // active: route().current('invoices-types.*') ?? false 
        },
        { 
            name: t('vendor.sidebar.team'), 
            href: '#', 
            icon: Users, 
            active: false 
        },
        { 
            name: t('vendor.sidebar.settings'), 
            href: '/companies/edit/page', 
            icon: Settings, 
            active: false 
        },
    ];
    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    `fixed bg-primary ${i18n.language === 'ar' ? 'right-0 border-l-2 ' : 'left-0' } top-0 z-50 h-screen  border-r border-border transition-all duration-300 ease-in-out`,
                    'flex flex-col',
                    isCollapsed && !isMobileOpen ? 'w-20' : 'w-64',
                    isMobileOpen ? 'translate-x-0' : `${i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'} lg:translate-x-0`
                )}
            >
               
                <SidebarLogoSection isCollapsed={isCollapsed} />
                
                

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    <ul className="space-y-1">
                       

                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                        'hover:bg-accent hover:text-accent-foreground',
                                        item.active
                                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                                            : 'text-white',
                                        isCollapsed && 'justify-center'
                                    )}
                                >
                                    <item.icon className={cn('h-5 w-5 shrink-0', item.active && 'animate-pulse')} />
                                    {!isCollapsed && <span>{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <SidebarFooter isCollapsed={isCollapsed} />
                
            </aside>
        </>

    )
}