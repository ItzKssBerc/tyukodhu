import { defineField, defineType, defineArrayMember } from 'sanity'
import { cloudinaryImageSource } from 'sanity-plugin-cloudinary'

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
                sources: [cloudinaryImageSource],
            },
        }),
        defineField({
            name: 'fokepcarousel',
            title: 'Főoldali Körhinta Képek',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: { sources: [cloudinaryImageSource] }
                })
            ],
            options: {
                layout: 'grid',
            },
        }),
    ],
})
