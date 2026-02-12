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
            name: 'kategoria',
            title: 'Kategória',
            type: 'string',
            options: {
                list: [
                    { title: 'Közintézmény', value: 'kozintezmeny' },
                    { title: 'Bolt / Szolgáltatás', value: 'bolt_szolgaltatas' },
                    { title: 'Kultúra / Szabadidő', value: 'kultura_szabadido' },
                    { title: 'Vallás', value: 'vallas' },
                    { title: 'Sport', value: 'sport' },
                    { title: 'Egyéb', value: 'egyeb' },
                ],
            },
            initialValue: 'egyeb',
            validation: (Rule) => Rule.required(),
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
