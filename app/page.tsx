import HomePage from "@/components/client/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Home Page',
    description: "Messages your friend's",
}

function Home() {
    return (
        <>
            <HomePage />
        </>
    );
}

export default Home;