import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import i18n from './i18n/index';
import ClientLayout from '@/layouts/vendor/vendor-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const lang = i18n.language || 'en'

document.documentElement.lang = lang
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

// listen to language change
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
})



createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    // layout: (name) => {
    //     switch (true) {
    //         case name === 'home':
    //             return null;
    //         case name === 'vendor/company/create':
    //             return null;
    //         case name === 'vendor/dashboard':
    //             return ClientLayout;
    //         case name.startsWith('auth/'):
    //             return AuthLayout;
    //         case name.startsWith('settings/'):
    //             return [AppLayout, SettingsLayout];
    //         default:
    //             return AppLayout;
    //     }
    // },
    layout: (page) => page,
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
