import StatusPage from "@/components/client/Status";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Status Page',
    description: 'Watch friend status',
}

function Status() {
    return (
        <>
            <StatusPage />
        </>
    );
}

export default Status;