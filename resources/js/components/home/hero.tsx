import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { SharedData } from '@/types';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
    const { t, i18n } = useTranslation();
    const { auth } = usePage<SharedData>().props;
    const isRtl = i18n.language === 'ar';

    return (
        <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-36 lg:pb-40">
            {/* Background Gradients */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 ring-1 ring-border/50 hover:ring-border/80 transition-all cursor-default bg-card/30 backdrop-blur-sm">
                            <span className="text-muted-foreground mr-2">{t('home.hero.subtitle')}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl mb-8 leading-tight">
                        {t('home.hero.title')}
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
                        {t('home.hero.subtitle')}
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        {auth.user ? (
                            <Link href="/dashboard" className="w-full sm:w-auto rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                                {t('home.hero.dashboard')}
                                <ChevronRight className={isRtl ? "rotate-180 w-4 h-4 ml-1" : "w-4 h-4 ml-1"} strokeWidth={3} />
                            </Link>
                        ) : (
                            <>
                                <Link href="/register" className="w-full sm:w-auto rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                                    {t('home.hero.get_started')}
                                    <ChevronRight className={isRtl ? "rotate-180 w-4 h-4 ml-1" : "w-4 h-4 ml-1"} strokeWidth={3} />
                                </Link>
                                <Link href="#features" className="w-full sm:w-auto rounded-full px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-card transition-colors flex items-center justify-center border border-border bg-card/50">
                                    {t('home.hero.learn_more')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-[#ff80b5] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>
        </section>
    );
}
