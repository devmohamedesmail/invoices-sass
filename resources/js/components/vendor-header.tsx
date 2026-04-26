
import { Menu, Bell, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import ToggleLang from './ui/language-toggle';
import ThemeToggle from './ui/theme-toggle';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Link } from '@inertiajs/react';
import { logout } from '@/routes';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { router } from '@inertiajs/react';
export default function VendorHeader({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {

    const { t } = useTranslation();
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };




    return (
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    className="lg:hidden p-2 -ms-2 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">

                <div className="hidden sm:flex items-center gap-1 me-2 border-e border-neutral-200 dark:border-neutral-800 pe-4">
                    <ToggleLang />
                    <ThemeToggle />

                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" />
                </Button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                            <Avatar className="h-9 w-9 border border-neutral-200 dark:border-neutral-800">
                                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@user" />
                                <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">JD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                                <p className="text-xs leading-none text-neutral-500 dark:text-neutral-400">
                                    {auth.user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer gap-2">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950">
                            <LogOut className="w-4 h-4" />
                            <Link href={logout()}
                                as="button"
                                onClick={handleLogout}>{t('auth.logout')}</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
