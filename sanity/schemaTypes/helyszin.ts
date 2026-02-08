import { defineField, defineType } from 'sanity'

export const helyszin = defineType({
    name: 'helyszin',
    title: 'Helyszín',
    type: 'document',
    fields: [
        defineField({
            name: 'helyszinnev',
            title: 'Helyszín Neve',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'koordinata',
            title: 'Koordináta',
            type: 'geopoint',
        }),
        defineField({
            name: 'helyszinikon',
            title: 'Helyszín Ikon',
            type: 'image',
        }),
        defineField({
            name: 'leiras',
            title: 'Leírás',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'cim', type: 'string', title: 'Cím' },
                        { name: 'tartalom', type: 'text', title: 'Tartalom' },
                    ],
                },
            ],
        }),
    ],
})
