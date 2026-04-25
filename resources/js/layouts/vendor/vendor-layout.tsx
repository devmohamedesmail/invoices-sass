import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import VendorSidebar from '@/components/vendor-sidebar';
import VendorHeader from '@/components/vendor-header';


interface VendorLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function VendorLayout({ children, title = 'Vendor Dashboard' }: VendorLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 flex font-sans transition-colors duration-300">
            <Head title={title} />

            <VendorSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />



            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <VendorHeader
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Page Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-4 sm:p-6 lg:p-3  mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
