import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';

export default function InvoicesSearch({search, setSearch}: any) {
    const { t } = useTranslation();
      const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/invoices', { search }, { preserveState: true, replace: true });
      };
  return (
    <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('invoices.search_placeholder')}
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="outline">
            {t('common.search')}
          </Button>
        </form>
  )
}
