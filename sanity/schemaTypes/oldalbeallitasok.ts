import { defineField, defineType } from 'sanity'

export const oldalbeallitasok = defineType({
    name: 'oldalbeallitasok',
    title: 'Oldal Beállítások',
    type: 'document',
    fields: [
        defineField({
            name: 'oldalemblema',
            title: 'Oldal Embléma',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'fokepcarousel',
            title: 'Főoldali Körhinta Képek',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
            },
        }),
    ],
})
