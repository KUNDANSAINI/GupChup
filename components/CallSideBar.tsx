'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { IconAddressBook, IconPhonePlus, IconPlus } from "@tabler/icons-react";

interface Call {
    id: number;
    name: string;
    type: "incoming" | "outgoing" | "missed";
    time: string;
    duration: string;
}

const callHistory: Call[] = [
    { id: 1, name: "John Doe", type: "incoming", time: "10:30 AM", duration: "2 min" },
    { id: 2, name: "Alice Smith", type: "outgoing", time: "09:15 AM", duration: "5 min" },
    { id: 3, name: "Michael Brown", type: "missed", time: "Yesterday", duration: "N/A" },
    { id: 4, name: "Sophia Wilson", type: "incoming", time: "Monday", duration: "10 min" },
    { id: 5, name: "Daniel Lee", type: "missed", time: "Sunday", duration: "N/A" },
];

const CallSidebar: React.FC = () => {
    const [search, setSearch] = useState("");

    const filteredUsers = callHistory.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="sm:w-[500px] flex flex-col px-1 ml-[85px] gap-2">
            <div className="flex justify-around items-center rounded-xl p-5 bg-zinc-50 dark:bg-accent gap-2">
                <h1 className="text-lg font-semibold">Calls</h1>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-full"
                />
                <div className="rounded-full bg-orange-500 p-1 text-white cursor-pointer">
                    <IconAddressBook stroke={2} />
                </div>
            </div>

            <div className="h-full rounded-xl bg-zinc-50 dark:bg-accent">
                <h2 className="text-xs mt-4 mx-5 mb-2">ALL</h2>
                <ScrollArea className="flex-1 overflow-auto">
                    {filteredUsers.map((user, index) => (
                        <div
                            key={index}
                            className={"hover:bg-zinc-100 dark:hover:bg-gray-900 hover:rounded-xl"}
                        >
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="https://imgs.search.brave.com/d-Ko-GY3RysXK7ODXK88D4ZaZZOWaICEHZ8U2onjEa4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQwLzk4Lzc2/LzM2MF9GXzk0MDk4/NzY5M19wMzI5TjJk/RkNXN2pHN1lxdDNr/NUg5ZHhLb1lxS1NJ/US5qcGc"
                                        alt="user"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />

                                    <div className="w-full">
                                        <span className="text-sm">{user.name}</span>
                                    </div>
                                </div>

                                <button className="hover:bg-orange-100 dark:bg-accent hover:text-orange-500 p-3 cursor-pointer rounded-xl">
                                    <IconPhonePlus stroke={2} />
                                </button>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
        </div>
    );
};

export default CallSidebar;
