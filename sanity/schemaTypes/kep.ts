import { defineField, defineType } from 'sanity'
import { cloudinaryImageSource } from 'sanity-plugin-cloudinary'

export const kep = defineType({
    name: 'kep',
    title: 'Kép',
    type: 'document',
    fields: [
        defineField({
            name: 'kepcim',
            title: 'Kép Címe',
            type: 'string',
        }),
        defineField({
            name: 'kep',
            title: 'Kép',
            type: 'image',
            options: {
                hotspot: true,
                sources: [cloudinaryImageSource],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'album',
            title: 'Album',
            type: 'string',
            description: 'Melyik albumhoz tartozik a kép?',
        }),
    ],
})
