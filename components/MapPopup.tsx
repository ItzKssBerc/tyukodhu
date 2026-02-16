import React from 'react';
import { MapMarker } from './MapComponent';
import * as LucideIcons from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io5';

interface MapPopupProps {
    marker: MapMarker;
}

const CATEGORY_LABELS: Record<string, string> = {
    'kozintezmeny': 'Közintézmény',
    'bolt_szolgaltatas': 'Bolt / Szolgáltatás',
    'kultura_szabadido': 'Kultúra / Szabadidő',
    'vallas': 'Vallás',
    'sport': 'Sport',
    'egyeb': 'Egyéb'
};

const MapPopup: React.FC<MapPopupProps> = ({ marker }) => {
    // Icon resolution logic (replicated for the popup interior)
    let IconComponent: React.ElementType = LucideIcons.MapPin;
    const rawName = marker.helyszinikon?.name || '';

    type IconMap = Record<string, React.ElementType>;
    const FaIconsMap = FaIcons as unknown as IconMap;
    const MdIconsMap = MdIcons as unknown as IconMap;
    const IoIconsMap = IoIcons as unknown as IconMap;
    const LucideIconsMap = LucideIcons as unknown as IconMap;

    if (rawName) {
        const provider = marker.helyszinikon?.provider;
        if (provider === 'fa' && FaIconsMap[rawName]) IconComponent = FaIconsMap[rawName];
        else if (provider === 'mdi' && MdIconsMap[rawName]) IconComponent = MdIconsMap[rawName];
        else if (provider === 'io' && IoIconsMap[rawName]) IconComponent = IoIconsMap[rawName];
        else {
            let cleanedName = rawName
                .replace(/^(Fa|Md|Lu|Ri|Bi|Hi|Si|Ti|Go|Vsc|Io|Bs|Im|Gi|Wi|Di|Ai|Fc)/, '')
                .replace(/-/g, '');
            cleanedName = cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
            IconComponent = LucideIconsMap[cleanedName] || LucideIconsMap[rawName] || LucideIcons.MapPin;
        }
    }

    const kategoriaValue = marker.kategoria;
    const kategoriaLabel = kategoriaValue ? (CATEGORY_LABELS[kategoriaValue] || kategoriaValue) : '';

    return (
        <div
            style={{
                minWidth: '280px',
                maxWidth: '320px',
                width: 'auto',
                display: 'block'
            }}
            className="p-1 font-sans selection:bg-indigo-500/30 overflow-hidden"
        >
            {/* Top Bar with Category and Icon/Close Button */}
            <div className="flex items-center justify-between mb-4 mt-1">
                {kategoriaLabel ? (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">
                        {kategoriaLabel}
                    </span>
                ) : <div />}

                {/* Interactive Icon/Close Button Wrapper */}
                <button
                    className="group/close-btn relative p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/40 transition-all duration-300 popup-close-trigger"
                    title="Bezárás"
                >
                    {/* Unique Icon (Hidden on hover) */}
                    <div className="group-hover/close-btn:opacity-0 group-hover/close-btn:scale-50 transition-all duration-200">
                        <IconComponent size={14} />
                    </div>
                    {/* Exit Icon (Shown on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/close-btn:opacity-100 group-hover/close-btn:scale-110 transition-all duration-200">
                        <LucideIcons.X size={14} strokeWidth={3} />
                    </div>
                </button>
            </div>

            {/* Title */}
            <div className="mb-5 px-1 text-center">
                <h3 className="font-orbitron font-black text-xl text-stone-900 dark:text-white m-0 leading-tight tracking-tight uppercase">
                    {marker.helyszinnev}
                </h3>
                <div className="h-1 w-12 bg-indigo-600 dark:bg-indigo-500 mx-auto mt-2 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
            </div>

            {/* Content / Descriptions */}
            {marker.leiras && marker.leiras.length > 0 && (
                <div className="space-y-6 px-1 pb-2">
                    {marker.leiras.map((item, idx) => (
                        <div key={idx} className="relative pl-6 group">
                            {/* Decorative Bullet */}
                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full border-2 border-indigo-600 dark:border-indigo-500 bg-white dark:bg-stone-900 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-colors duration-300" />

                            {item.cim && (
                                <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1 uppercase text-[10px] tracking-[0.15em] leading-none opacity-80">
                                    {item.cim}
                                </span>
                            )}
                            {item.tartalom && (
                                <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400 font-normal m-0 italic">
                                    {item.tartalom}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Footer with subtle branding */}
            <div className="mt-6 pt-3 flex items-center justify-between text-[9px] text-stone-400 dark:text-stone-600 font-bold uppercase tracking-[0.2em] border-t border-stone-100 dark:border-stone-800/30">
                <span className="flex items-center gap-1">
                    <LucideIcons.Shield size={10} className="text-indigo-600/50 dark:text-indigo-500/50" />
                    Digitális Archívum
                </span>
                <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(79,70,229,0.8)]" />
                    <div className="w-1.5 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export default MapPopup;
