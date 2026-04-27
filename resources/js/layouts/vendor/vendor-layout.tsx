import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import VendorSidebar from '@/layouts/vendor/vendor-sidebar';
import VendorHeader from '@/layouts/vendor/vendor-header';
import { cn } from '@/lib/utils'


interface VendorLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function VendorLayout({ children, title = 'Vendor Dashboard' }: VendorLayoutProps) {
    // const [sidebarOpen, setSidebarOpen] = useState(false);





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
        <>
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

        </>
        // <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
        //     <Head title={title} />

        //     <VendorSidebar
        //         sidebarOpen={sidebarOpen}
        //         setSidebarOpen={setSidebarOpen}
        //     />




        //     <main className="flex-1 flex flex-col min-w-0">
        //         <VendorHeader
        //             setSidebarOpen={setSidebarOpen}
        //         />

        //         {/* Page Content */}
        //         <div className="flex-1">
        //             <div className="p-4 sm:p-6 lg:p-3 mx-auto">
        //                 {children}
        //             </div>
        //         </div>
        //     </main>
        // </div>
    );
}
