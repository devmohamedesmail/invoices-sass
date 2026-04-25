import React from 'react'
import { Button } from './button'
import { Globe } from 'lucide-react'
import i18n from '@/i18n'

export default function LanguageToggle() {
  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  const switch_language = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    changeLanguage(newLang);
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={switch_language}
    >
      <Globe className="h-4 w-4" />
    </Button>
  )
}
