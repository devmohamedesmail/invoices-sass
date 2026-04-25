import React from 'react'
import ThemeToggle from './ui/theme-toggle'
import LanguageToggle from './ui/language-toggle'

export default function Header() {
  return (
    <div>
        <ThemeToggle/>
        <LanguageToggle/>
    </div>
  )
}
