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

export default function VendorSidebar({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void }) {
    const { t, i18n } = useTranslation()
    const isRtl = i18n.language === 'ar';


    const navigation = [
        { name: 'Dashboard', href: '#', icon: LayoutDashboard, active: true },
        { name: 'Invoices', href: '#', icon: FileText, active: false },
        { name: 'Payments', href: '#', icon: CreditCard, active: false },
        { name: 'Team', href: '#', icon: Users, active: false },
        { name: 'Settings', href: '#', icon: Settings, active: false },
    ];
    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}



            <aside
                className={cn(
                    "fixed top-0 bottom-0 z-50 w-72 bg-white dark:bg-neutral-900 border-e border-neutral-200 dark:border-neutral-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col shadow-xl lg:shadow-none",
                    sidebarOpen ? "translate-x-0" : (isRtl ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0"),
                    isRtl ? "right-0" : "left-0"
                )}
            >
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                            I
                        </div>
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-foreground dark:from-primary dark:to-primary-foreground">
                            InvoiceSaaS
                        </span>
                    </div>
                    <button
                        className="lg:hidden p-2 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
                    <p className="px-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4 mt-2">
                        Main Menu
                    </p>
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200",
                                item.active
                                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-primary dark:text-primary"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-100"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                item.active ? "text-primary dark:text-primary" : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
                            )} />
                            {item.name}
                            {item.active && (
                                <div className="ms-auto w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
                        <div className="absolute top-0 end-0 -mt-4 -me-4 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-2xl rounded-full" />
                        <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1 relative z-10">Need help?</h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 relative z-10">Please check our docs</p>
                        <Button className="w-full text-xs h-8 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 shadow-sm relative z-10">
                            <HelpCircle className="w-3.5 h-3.5 me-1.5" /> Documentation
                        </Button>
                    </div>
                </div>
            </aside>
        </>

    )
}