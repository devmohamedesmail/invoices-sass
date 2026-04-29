import React, { useState } from 'react';
import VendorSidebar from '@/layouts/vendor/vendor-sidebar';
import VendorHeader from '@/layouts/vendor/vendor-header';
import { cn } from '@/lib/utils'


interface VendorLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function VendorLayout({ children, title = 'Vendor Dashboard' }: VendorLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
    }

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false)
    }


    return (
        <div className="relative min-h-screen bg-background">
            {/* Sidebar */}
            <VendorSidebar
                isCollapsed={isSidebarCollapsed}
                isMobileOpen={isMobileSidebarOpen}
                onClose={closeMobileSidebar}
            />

            {/* Main Content */}
            <div
                className={cn(
                    'transition-all duration-300 ease-in-out',
                    // isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
                    isSidebarCollapsed
                        ? 'ltr:lg:pl-20 rtl:lg:pr-20'
                        : 'ltr:lg:pl-72 rtl:lg:pr-72'
                )}
            >
                {/* Header */}
                <VendorHeader
                    onMenuClick={toggleMobileSidebar}
                    isCollapsed={isSidebarCollapsed}
                    onToggleCollapse={toggleSidebar}
                />

                {/* Page Content */}
                <main className="p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
