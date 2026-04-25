import React from 'react'
import { Button } from './button'
import { useAppearance } from '@/hooks/use-appearance'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();
    const isDark = appearance === 'dark';
    const toggleTheme = () => {
        updateAppearance(isDark ? 'light' : 'dark');
    };
  return (
    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" title="Toggle Theme" onClick={toggleTheme} >
                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </Button>
  )
}
