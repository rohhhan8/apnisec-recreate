import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Create your ApniSec account. Get access to enterprise-grade security tools, vulnerability assessments, and real-time threat monitoring.",
    openGraph: {
        title: "Register | ApniSec",
        description: "Join ApniSec for enterprise security solutions",
    },
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
