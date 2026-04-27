import React from 'react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/home/header';
import Hero from '@/components/home/hero';
import Features from '@/components/home/features';
import Footer from '@/components/home/footer';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary flex flex-col font-sans">
            <Head title={t('home.hero.title')} />
            <Header />
            <main className="flex-1">
                <Hero />
                <Features />
            </main>
            <Footer />
        </div>
    );
}
