'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for client components
const ChatBot = dynamic(() => import('@/components/layouts/ChatBot'), {
    ssr: false,
    loading: () => null
});

const BudgetChatbot = dynamic(() => import('@/components/layouts/EnhancedBudgetChatBot'), {
    ssr: false,
    loading: () => null
});

export default function ClientChatBots() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Don't render anything until component is mounted on client
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <div className="fixed bottom-4 left-4 sm:mt-4 z-50">
                <BudgetChatbot />
            </div>
            <div className="fixed bottom-4 right-4 z-50">
                <ChatBot />
            </div>
        </>
    );
}