import { defineField, defineType } from 'sanity'
import { cloudinaryImageSource } from 'sanity-plugin-cloudinary'

export const elokozvetites = defineType({
    name: 'elokozvetites',
    title: 'Élő Közvetítés Beállítások',
    type: 'document',
    fields: [
        defineField({
            name: 'offlinebanner',
            title: 'Offline Banner',
            type: 'image',
            description: 'Ez a kép jelenik meg, amikor nincs élő adás.',
            options: {
                hotspot: true,
                sources: [cloudinaryImageSource],
            },
        }),
        defineField({
            name: 'streamurl',
            title: 'Stream URL',
            type: 'url',
            description: 'Közvetlen link a streamhez (pl. YouTube link).',
        }),
        defineField({
            name: 'iframe',
            title: 'Beágyazó Kód (Iframe)',
            type: 'text',
            description: 'YouTube vagy Facebook iframe kód.',
        }),
        defineField({
            name: 'adasban',
            title: 'Éppen Adásban?',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
