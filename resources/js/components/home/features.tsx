import React from 'react';
import { useTranslation } from 'react-i18next';
import { Receipt, Users, Languages, BarChart3 } from 'lucide-react';

export default function Features() {
    const { t } = useTranslation();

    const features = [
        {
            title: t('home.features.invoicing.title'),
            description: t('home.features.invoicing.desc'),
            icon: Receipt,
        },
        {
            title: t('home.features.clients.title'),
            description: t('home.features.clients.desc'),
            icon: Users,
        },
        {
            title: t('home.features.multilingual.title'),
            description: t('home.features.multilingual.desc'),
            icon: Languages,
        },
        {
            title: t('home.features.tracking.title'),
            description: t('home.features.tracking.desc'),
            icon: BarChart3,
        },
    ];

    return (
        <section id="features" className="py-24 sm:py-32 bg-sidebar border-y border-border/40 overflow-hidden relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
                        {t('home.hero.learn_more')}
                    </h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        {t('home.features.title')}
                    </p>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {t('home.features.subtitle')}
                    </p>
                </div>
                
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-2">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex flex-col bg-background/50 border border-border/60 p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                                <dt className="flex items-center gap-x-4 text-base font-bold leading-7 text-foreground">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 transform transition-transform hover:scale-110">
                                        <feature.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                                    </div>
                                    <span className="text-xl mb-4">{feature.title}</span>
                                </dt>
                                <dd className="flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
            
            {/* Soft decorative background circles */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
