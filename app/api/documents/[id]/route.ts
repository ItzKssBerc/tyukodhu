import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Decode the ID to handle any special characters passed in the URL
        // e.g. "foo%20bar" -> "foo bar"
        const publicId = decodeURIComponent(id);

        // Generate signed ZIP download URL
        // This allows downloading the file even if direct access is blocked
        const zipUrl = cloudinary.utils.download_archive_url({
            public_ids: [publicId],
            target_format: 'zip',
            // Optional: flattened ensures no folders in the zip
            flatten_folders: true,
            // Optional: add timestamp/signature automatically by SDK if api_secret is set
        });

        return NextResponse.redirect(zipUrl);
    } catch (error) {
        console.error('Error generating download URL:', error);
        return NextResponse.json(
            { error: 'Failed to generate download URL' },
            { status: 500 }
        );
    }
}
