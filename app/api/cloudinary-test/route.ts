import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@tinacms/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
    return handleRequest(request);
}

export async function POST(request: NextRequest) {
    return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
    return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json(
            { error: "Cloudinary configuration missing" },
            { status: 500 }
        );
    }

    try {
        const { createMediaHandler } = await import("next-tinacms-cloudinary/dist/handlers");

        const mediaHandler = createMediaHandler({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
            authorized: async (req: any) => {
                try {
                    if (process.env.NODE_ENV === "development") return true;
                    const user = await isAuthorized(req);
                    return !!(user && user.verified);
                } catch (e) {
                    return false;
                }
            },
        });

        // Next.js App Router kérések konvertálása Pages Router formátumra, amit a mediaHandler vár
        // Megjegyzés: A next-tinacms-cloudinary jelenleg leginkább a Pages Routert támogatja natívan, 
        // de megpróbáljuk áthidalni. Ha ez nem megy, maradni kell a Pages Router-nél és ott javítani az inicializációt.

        // De várjunk, a 'next-tinacms-cloudinary' csomag néha nem kompatibilis az App Router NextResponse-al.
        // Ezért maradjunk a Pages Router javításánál, de próbáljunk meg EGYETLEN fájlt használni catch-all nélkül tesztként.

        return NextResponse.json({ message: "App router path reached" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
