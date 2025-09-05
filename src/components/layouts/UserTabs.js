"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs() {
    const path = usePathname();

    return (
        <div className="flex justify-center gap-2 tabs">
            <Link className={path.includes('/places') ? 'active' : ''} href={'/places'}>Places</Link>
            <Link className={path.includes('/Jha-vibes') ? 'active' : ''} href={'/Jha-vibes'}>Jha-Vibes</Link>
            <Link className={path.includes('/Pakages') ? 'active' : ''} href={'/Pakages'}>Packages</Link>
        </div>
    );
}