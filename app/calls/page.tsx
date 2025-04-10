import CallPage from "@/components/client/Calls";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Call Page',
    description: 'Contect your friend',
}

function Calls() {
    return (
        <>
            <CallPage />
        </>
    );
}

export default Calls;