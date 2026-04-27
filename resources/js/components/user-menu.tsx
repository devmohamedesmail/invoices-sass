import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Settings, LogOut } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { logout } from '@/routes'
import { useTranslation } from 'react-i18next'
import { usePage } from '@inertiajs/react'
import { SharedData } from '@/types'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import { router } from '@inertiajs/react'

export default function UserMenu() {
    const { t } = useTranslation();
    const { auth } = usePage<SharedData>().props;
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
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
    )
}
