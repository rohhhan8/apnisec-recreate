import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Sign in to your ApniSec dashboard. Access your security reports, vulnerability assessments, and threat intelligence in real-time.",
    openGraph: {
        title: "Login | ApniSec",
        description: "Access your ApniSec security dashboard",
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
