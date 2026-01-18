"use client";

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
    const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const storedConsent = localStorage.getItem('cookie_consent');
        if (storedConsent) {
            setConsentGiven(storedConsent === 'accepted');
        } else {
            // If no consent is stored, show the banner immediately.
            setConsentGiven(null);
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setConsentGiven(true);
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setConsentGiven(false);
        setShowBanner(false);
    };
    
    // This function allows the user to re-open the banner
    const openConsentManager = () => {
        setShowBanner(true);
    };

    // If we haven't determined the consent status from localStorage yet, don't show anything.
    if (consentGiven === null && !showBanner) {
        return null;
    }

    // If consent has been given/declined and the banner is not explicitly shown, show the trigger button.
    if (!showBanner && consentGiven !== null) {
        return (
            <button
                onClick={openConsentManager}
                className="fixed bottom-4 right-4 z-40 h-14 w-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                aria-label="Süti beállítások megnyitása"
            >
                <Cookie className="h-7 w-7" />
            </button>
        );
    }
    
    // If the banner should be shown (either initially or by clicking the trigger button)
    if (showBanner) {
        return (
            <div className="fixed bottom-0 right-0 left-0 sm:bottom-4 sm:right-4 sm:left-auto z-50">
                <div className="bg-white dark:bg-gray-800 border-t sm:border border-gray-200 dark:border-gray-700 sm:rounded-lg shadow-2xl max-w-full sm:max-w-md p-6">
                    <div className="flex items-start gap-4">
                         <div className="flex-shrink-0 p-2 bg-red-100 dark:bg-red-900/50 rounded-full hidden sm:flex">
                            <Cookie className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Süti (cookie) beállítások</h3>
                                {consentGiven !== null && ( // Show close button only if it's not the very first visit
                                    <button onClick={() => setShowBanner(false)} aria-label="Bezárás">
                                        <X className="h-5 w-5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"/>
                                    </button>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében. Elfogadja a sütik használatát?
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={handleDecline}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            Elutasítom
                        </button>
                        <button
                            onClick={handleAccept}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Elfogadom
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}