
import { Menu, Bell, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import ToggleLang from '../../components/ui/language-toggle';
import ThemeToggle from '../../components/ui/theme-toggle';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { logout } from '@/routes';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { router } from '@inertiajs/react';
import UserMenu from '../../components/user-menu';
import MobileMenuButton from '@/layouts/vendor/mobile-menu-button';
import DestopCollapseButton from '@/layouts/vendor/destop-collapse-button';

interface HeaderProps {
    onMenuClick: () => void
    isCollapsed: boolean
    onToggleCollapse: () => void
}
export default function VendorHeader({ onMenuClick, isCollapsed, onToggleCollapse }: HeaderProps) {

    const { t } = useTranslation();
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };




    return (
        // <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30">
        //     <div className="flex items-center gap-4">
        //         <button
        //             className="lg:hidden p-2 -ms-2 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        //             onClick={() => setSidebarOpen(true)}
        //         >
        //             <Menu className="w-5 h-5" />
        //         </button>
        //     </div>

        //     <div className="flex items-center gap-2 sm:gap-4">

        //         <div className="hidden sm:flex items-center gap-1 me-2 border-e border-neutral-200 dark:border-neutral-800 pe-4">
        //             <ToggleLang />
        //             <ThemeToggle />

        //         </div>


        //         <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">
        //             <Bell className="w-5 h-5" />
        //             <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" />
        //         </Button>


        //         <UserMenu />
        //     </div>
        // </header>


        <header className="sticky top-0 z-30 flex h-16 justify-between items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 lg:px-6">
            <MobileMenuButton onClick={onMenuClick} />

            <DestopCollapseButton onClick={onToggleCollapse} />
            <div className="flex items-center gap-2">
                <ToggleLang />
                <ThemeToggle />
                {/* <HeaderIcon
                    icon={<Bell className="h-5 w-5 text-muted-foreground" />}
                    label="Notifications" onClick={() => { }}
                /> */}
                <UserMenu />
            </div>
        </header>
    )
}
