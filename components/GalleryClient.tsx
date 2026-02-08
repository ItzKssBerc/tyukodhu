'use client';

import React from 'react';

export default function GalleryClient({ images }: { images: any[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images && images.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-gray-100">
                    {/* Placeholder for gallery image */}
                    <div className="absolute inset-0 flex items-center justify-center">Image {idx + 1}</div>
                </div>
            ))}
            {(!images || images.length === 0) && <p>No images in gallery.</p>}
        </div>
    );
}
