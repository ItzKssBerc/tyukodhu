import { defineField, defineType, defineArrayMember } from 'sanity'
import LeafletInput from '../components/LeafletInput'

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
            components: {
                input: LeafletInput
            }
        }),
        defineField({
            name: 'helyszinikon',
            title: 'Helyszín Ikon',
            type: 'iconPicker',
            options: {
                providers: ['lu'], // Lucide icons
                outputFormat: 'react',
            }
        }),
        defineField({
            name: 'leiras',
            title: 'Leírás',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'leirasElem',
                    title: 'Leírás Elem',
                    fields: [
                        { name: 'cim', type: 'string', title: 'Cím' },
                        { name: 'tartalom', type: 'text', title: 'Tartalom' },
                    ],
                }),
            ],
        }),
    ],
})
