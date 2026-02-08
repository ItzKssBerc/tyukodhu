import { defineField, defineType } from 'sanity'

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
