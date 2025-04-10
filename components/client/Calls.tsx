'use client'

import CallSidebar from "@/components/CallSideBar";
import { MoveDownLeft, MoveUpRight } from "lucide-react";

interface Call {
    id: number;
    name: string;
    type: "incoming" | "outgoing" | "missed";
    time: string;
    duration: string;
}

const callHistory: Call[] = [
    { id: 1, name: "John Doe", type: "incoming", time: "30 June 10:30 AM", duration: "2 min" },
    { id: 2, name: "Alice Smith", type: "outgoing", time: "01 April 09:15 AM", duration: "5 min" },
    { id: 3, name: "Michael Brown", type: "missed", time: "Yesterday", duration: "N/A" },
    { id: 4, name: "Sophia Wilson", type: "incoming", time: "Monday", duration: "10 min" },
    { id: 5, name: "Daniel Lee", type: "missed", time: "Sunday", duration: "N/A" },
];

function CallPage() {

    return (
        <>
            <div className="flex p-4 h-screen">
                <CallSidebar />
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="flex justify-between items-center rounded-xl px-4 py-6 bg-zinc-50 dark:bg-accent gap-2">
                        <span className="text-lg font-semibold">Call History</span>
                    </div>

                    <div className="flex-1 overflow-auto p-4 bg-zinc-50 dark:bg-accent rounded-xl">
                        {callHistory.map((call) => (
                            <div key={call.id} className="flex items-center justify-between py-3">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://imgs.search.brave.com/d-Ko-GY3RysXK7ODXK88D4ZaZZOWaICEHZ8U2onjEa4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQwLzk4Lzc2/LzM2MF9GXzk0MDk4/NzY5M19wMzI5TjJk/RkNXN2pHN1lxdDNr/NUg5ZHhLb1lxS1NJ/US5qcGc"
                                        alt="user"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className={`font-medium ${call.type === "missed" ? "text-red-400" : "text-green-400"}`}>{call.name}</p>
                                        <p className="text-sm text-gray-400 flex items-center gap-1">
                                            <span className={call.type === "missed" ? "text-red-400" : "text-green-400"}>
                                                {
                                                    call.type === "outgoing" ? (
                                                        <MoveUpRight width={16} height={16} />
                                                    ) : (
                                                        <MoveDownLeft width={16} height={16} />
                                                    )
                                                }
                                            </span>
                                            {call.time}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-gray-400">{call.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CallPage;