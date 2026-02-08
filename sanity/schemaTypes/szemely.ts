import { defineField, defineType } from 'sanity'

export const szemely = defineType({
    name: 'szemely',
    title: 'Személy',
    type: 'document',
    fields: [
        defineField({
            name: 'nev',
            title: 'Név',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'titulus',
            title: 'Titulus / Pozíció',
            type: 'string',
        }),
        defineField({
            name: 'kep',
            title: 'Kép',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'kategoria',
            title: 'Kategória',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Képviselő-testület', value: 'kepviselo-testulet' },
                    { title: 'Bizottság', value: 'bizottsag' },
                ],
            },
        }),
        defineField({
            name: 'bizottsagok',
            title: 'Bizottsági Tagság',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'nev', type: 'string', title: 'Bizottság Neve' },
                        { name: 'pozicio', type: 'string', title: 'Pozíció' },
                    ],
                },
            ],
        }),
    ],
})
