'use client'

import ChatSidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { IconDots, IconMicrophone, IconMicrophoneFilled, IconMoodSmile, IconPaperclip, IconSearch, IconSend } from "@tabler/icons-react";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  online: boolean;
  time: string;
  message: string;
}

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");

  return (
    <>
      <div className="flex p-4 h-screen">
      <ChatSidebar onSelectUser={setSelectedUser} />
      <div className="w-full h-full flex flex-col gap-2">
        {
          selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="flex justify-between items-center rounded-xl p-4 bg-zinc-50 dark:bg-accent gap-2">
                <div className="flex items-center space-x-4">
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
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${selectedUser.online ? "bg-green-500" : "bg-red-500"
                        }`}
                    ></span>
                  </div>
                  <div>
                    <span className="text-lg font-semibold">{selectedUser.name}</span>
                    <p className="text-xs text-gray-500">
                      {
                        selectedUser.online ? "online" : "offline"
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant={"outline"} className="rounded-full px-6 cursor-pointer">Profile</Button>
                  <Button className="rounded-full px-6 cursor-pointer">Call</Button>
                  <span className="w-0.5 h-8 bg-gray-300 dark:bg-gray-900"></span>
                  <Button className="cursor-pointer" size={"icon"} variant={"ghost"}>
                    <IconSearch stroke={2} />
                  </Button>
                  <Button className="cursor-pointer" size={"icon"} variant={"ghost"}>
                    <IconDots stroke={2} />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-auto p-4 bg-zinc-50 dark:bg-accent rounded-xl">
                <p>No messages yet.</p>
              </div>

              {/* Chat Input at Bottom */}
              <div className="flex items-center sticky bottom-0 w-full gap-2">
                <div className="flex items-center bg-zinc-50 dark:bg-accent rounded-xl w-full p-2 gap-1">
                  <Button variant={"ghost"} className="cursor-pointer" >
                    <IconPaperclip stroke={2} />
                  </Button>
                  <input
                    type="text"
                    placeholder="Write messages..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-none shadow-none outline-none focus:ring-0 focus:outline-none focus:border-transparent w-full text-sm"
                  />
                  <Button variant={'ghost'} className="cursor-pointer" >
                    <IconMoodSmile stroke={2} />
                  </Button>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white h-12 w-12 cursor-pointer rounded-xl">
                  <IconMicrophone stroke={2} width={16} height={16} />
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white h-12 w-12 cursor-pointer rounded-xl">
                  <IconSend stroke={2} width={16} height={16} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <p className="text-gray-400">Select a user to start chatting</p>
            </div>
          )
        }
      </div >
      </div>
    </>
  );
}
