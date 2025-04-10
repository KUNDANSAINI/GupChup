'use client'

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { IconPlus } from "@tabler/icons-react";

type User = {
    id: number;
    name: string;
    online: boolean;
    time: string;
    message: string;
};

type ChatSidebarProps = {
    onSelectUser: (user: User) => void;
};

const users: User[] = [
    { id: 1, name: "John Doe", online: true, time: '10:27 AM', message: 'Have a good day, Roman!' },
    { id: 2, name: "Jane Smith", online: false, time: '09:48 AM', message: 'Hi, good to hear from you. It\'s bee...' },
    { id: 3, name: "Alice Brown", online: true, time: '10:32 AM', message: 'Wow, that looks amazing...' },
    { id: 4, name: "Bob White", online: false, time: '11:24 AM', message: 'Hey there, I’m having trouble open...' },
];

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onSelectUser }) => {
    const [search, setSearch] = useState("");

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="sm:w-[500px] flex flex-col px-1 ml-[85px] gap-2">
            <div className="flex justify-around items-center rounded-xl p-5 bg-zinc-50 dark:bg-accent gap-2">
                <h1 className="text-lg font-semibold">Chat</h1>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-full"
                />
                <div className="rounded-full bg-orange-500 p-1 text-white cursor-pointer">
                    <IconPlus stroke={2} />
                </div>
            </div>

            <div className="h-full rounded-xl bg-zinc-50 dark:bg-accent">
                <h2 className="text-xs mt-4 mx-5 mb-2">ALL</h2>
                <ScrollArea className="flex-1 overflow-auto">
                    {filteredUsers.map((user, index) => (
                        <div
                            key={index}
                            className="hover:bg-zinc-100 dark:hover:bg-gray-900 hover:rounded-xl cursor-pointer"
                            onClick={() => onSelectUser(user)}
                        >
                            <div className="flex items-center gap-2 p-3">
                                {/* Image container */}
                                <div className="relative">
                                    <img
                                        src="https://imgs.search.brave.com/d-Ko-GY3RysXK7ODXK88D4ZaZZOWaICEHZ8U2onjEa4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQwLzk4Lzc2/LzM2MF9GXzk0MDk4/NzY5M19wMzI5TjJk/RkNXN2pHN1lxdDNr/NUg5ZHhLb1lxS1NJ/US5qcGc"
                                        alt="user"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    {/* Online/Offline status circle */}
                                    <span
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${user.online ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    ></span>
                                </div>

                                <div className="w-full">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm">{user.name}</span>
                                        <span className="text-xs text-gray-500">{user.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{user.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
        </div>
    );
};

export default ChatSidebar;
