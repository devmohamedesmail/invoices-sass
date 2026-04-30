import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { SharedData } from '@/types';
import UserMenu from '@/components/user-menu';
import ToggleLang from '@/components/ui/language-toggle';
import ThemeToggle from '@/components/ui/theme-toggle';
import { FileText } from 'lucide-react';

export default function Header() {
    const { t, i18n } = useTranslation();
    const { auth, company } = usePage<SharedData>().props;
    const { settings }:any = usePage().props

    console.log(auth)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                <div className="flex items-center gap-3">
                    {settings?.app_logo ? (
                        <img src={settings.app_logo} alt={settings?.app_name} className="h-8 w-8 rounded object-cover shadow-sm" />
                    ) : (
                        <div className="h-8 w-8 bg-primary rounded flex items-center justify-center shadow-sm">
                            <FileText className="h-5 w-5 text-primary-foreground" />
                        </div>
                    )}
                    <span className="font-bold text-lg hidden sm:inline-block tracking-tight">{i18n.language === 'ar' ? settings?.app_name_ar : settings?.app_name_en}</span>
                </div>
                
                {/* <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#features" className="transition-colors hover:text-primary text-muted-foreground">{t('home.footer.features')}</a>
                    <a href="#" className="transition-colors hover:text-primary text-muted-foreground">{t('home.footer.pricing')}</a>
                    <a href="#" className="transition-colors hover:text-primary text-muted-foreground">{t('home.footer.about')}</a>
                </nav> */}

                <div className="flex items-center gap-3 relative">
                    <div className="flex items-center gap-2 me-2 border-e pe-4 border-border/40">
                        <ToggleLang />
                        <ThemeToggle />
                    </div>
                    {auth.user ? (
                        <UserMenu />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="text-sm font-semibold px-4 py-2 hover:text-primary transition-colors hidden sm:block">
                                {t('auth.login')}
                            </Link>
                            <Link href="/register" className="text-sm font-semibold px-4 py-2 bg-primary text-white hover:text-primary transition-colors hidden sm:block">
                                {t('auth.register_account')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
