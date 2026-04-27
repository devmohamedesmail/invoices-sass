import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/react';
import { FileText } from 'lucide-react';

export default function Footer() {
    const { t } = useTranslation();
    const { company } = usePage().props as any;

    return (
        <footer className="bg-background border-t border-border/40 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            {company?.logo ? (
                                <img src={company.logo} alt={company.name} className="h-10 w-10 rounded object-cover shadow-sm" />
                            ) : (
                                <div className="h-10 w-10 bg-primary rounded flex items-center justify-center shadow-sm">
                                    <FileText className="h-6 w-6 text-primary-foreground" />
                                </div>
                            )}
                            <span className="font-bold text-2xl tracking-tight">{company?.name || 'Invoicer'}</span>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground w-4/5">
                             {t('home.hero.subtitle')}
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-foreground">{t('home.footer.product')}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><a href="#features" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">{t('home.footer.features')}</a></li>
                                    <li><a href="#" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">{t('home.footer.pricing')}</a></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-foreground">{t('home.footer.company')}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><a href="#" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">{t('home.footer.about')}</a></li>
                                    <li><a href="#" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">{t('home.footer.contact')}</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-foreground">{t('home.footer.legal')}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><a href="#" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">{t('home.footer.privacy')}</a></li>
                                    <li><a href="#" className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors">{t('home.footer.terms')}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs leading-5 text-muted-foreground">
                        &copy; {new Date().getFullYear()} {company?.name || 'Invoicer'}. {t('home.footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
