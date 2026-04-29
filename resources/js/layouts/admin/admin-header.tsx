import React from 'react'
import ToggleLang from '../../components/ui/language-toggle'
import ThemeToggle from '../../components/ui/theme-toggle'
import UserMenu from '../../components/user-menu'
import DestopCollapseButton from '@/layouts/vendor/destop-collapse-button'
import MobileMenuButton from '@/layouts/vendor/mobile-menu-button'

export default function AdminHeader({onMenuClick, isCollapsed, onToggleCollapse}: {onMenuClick: () => void, isCollapsed: boolean, onToggleCollapse: () => void}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 justify-between items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-6">
                <MobileMenuButton onClick={onMenuClick} />
    
                <DestopCollapseButton onClick={onToggleCollapse} />
                <div className="flex items-center gap-2">
                    <ToggleLang />
                    <ThemeToggle />
                    
                    <UserMenu />
                </div>
            </header>
  )
}
