import React from 'react'
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {

    LayoutDashboard,
    Settings,
    Users,

} from 'lucide-react';
// import SidebarFooter from '../vendor/sidebar-footer';
import AppLogo from '@/components/ui/app-logo';
import SidebarFooter from '../vendor/sidebar-footer';


export default function AdminSidebar({ isCollapsed, isMobileOpen, onClose }: { isCollapsed: boolean, isMobileOpen: boolean, onClose: () => void }) {
    const { t, i18n } = useTranslation()


    const navigation = [
        {
            name: t('vendor.sidebar.dashboard'),
            href: '/dashboard',
            icon: LayoutDashboard,
            active: false
        },
        {
            name: t('admin.sidebar.countries'),
            href: '/admin/countries',
            icon: Users,
            // active: route().current('clients.*') ?? false 
        },




        {
            name: t('admin.sidebar.settings'),
            href: '/admin/settings',
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
                    `fixed bg-primary overflow-hidden ${i18n.language === 'ar' ? 'right-0 border-l-2 ' : 'left-0'} top-0 z-50 h-screen  border-r border-border transition-all duration-300 ease-in-out`,
                    'flex flex-col',
                    isCollapsed && !isMobileOpen ? 'w-20' : 'w-64',
                    isMobileOpen ? 'translate-x-0' : `${i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'} lg:translate-x-0`
                )}
            >

                {/* <SidebarLogoSection isCollapsed={isCollapsed} /> */}

                <AppLogo />





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
