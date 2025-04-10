"use client";
import { IconAlignLeft, IconBrandLine, IconChartArcs, IconDeviceLaptop, IconMoonStars, IconNorthStar, IconPhoneSpark, IconSparkles, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sparkle, Sparkles, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";


const Side: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname()
    const hiddenPaths = ['/auth/login', '/auth/signup'];

    const toggleSidebar = () => setIsOpen(!isOpen);

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else if (theme === "dark") {
            setTheme("light");
        }
    };

    if (hiddenPaths.includes(pathname)) return null;

    return (
        <div className={`bg-zinc-50 dark:bg-accent transition-all rounded-2xl duration-300 fixed top-4 left-4 bottom-4 ${isOpen ? 'w-64' : 'w-20 flex flex-col items-center'} z-50`}>
            {/* Header */}
            <div className="px-2 pt-3 space-y-2">
                <div className="flex items-center p-2">
                    <Sparkles width={32} height={32} className="text-orange-500" />
                    {isOpen && <span className="ml-3 text-2xl font-bold">GupChup</span>}
                </div>
                <button
                    onClick={toggleSidebar}
                    className="hover:bg-orange-100 dark:bg-accent hover:text-orange-500 p-3 cursor-pointer rounded-xl"
                >
                    <IconAlignLeft stroke={2} />
                </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col space-y-2 px-2">
                <Link className="flex items-center hover:bg-orange-100 dark:bg-accent hover:text-orange-500 p-3 rounded-xl" href="/">
                    <IconBrandLine stroke={2} />
                    {isOpen && <span className="ml-3">Chats</span>}
                </Link>

                <Link className="flex items-center hover:bg-orange-100 dark:bg-accent hover:text-orange-500 p-3 rounded-xl" href="/calls">
                    <IconPhoneSpark stroke={2} />
                    {isOpen && <span className="ml-3">Calls</span>}
                </Link>

                <Link className="flex items-center hover:bg-orange-100 dark:bg-accent hover:text-orange-500 p-3 rounded-xl" href="/status">
                    <IconChartArcs stroke={2} />
                    {isOpen && <span className="ml-3">Status</span>}
                </Link>
                <div className={`flex flex-col items-center fixed bottom-8 ${isOpen ? "w-60" : "w-12"}`}>
                    <button className={`flex items-center p-3 hover:bg-orange-100 dark:bg-accent hover:text-orange-500 rounded-xl cursor-pointer w-full`} onClick={toggleTheme}>
                        {theme === "dark" ? <IconMoonStars stroke={2} /> : <IconSun stroke={2} />}
                        {isOpen && <span className="ml-3">Theme</span>}
                    </button>
                    <Link className="flex items-center hover:bg-orange-100 dark:bg-accent hover:text-orange-500 p-3 rounded-xl w-full" href="/profile">
                        <UserRound />
                        {isOpen && <span className="ml-3">Profile</span>}
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Side;
