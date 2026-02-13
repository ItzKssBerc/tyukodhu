import { defineField, defineType } from 'sanity'

export const dokumentum = defineType({
    name: 'dokumentum',
    title: 'Dokumentum',
    type: 'document',
    fields: [
        defineField({
            name: 'dokumentumcim',
            title: 'Dokumentum Címe',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'fajlok',
            title: 'Fájlok / Képek',
            type: 'array',
            of: [
                { type: 'file', options: { accept: '.pdf,.jpg,.png,.doc,.docx' } },
                { type: 'image', options: { hotspot: true } },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: 'kategoria',
            title: 'Kategória',
            type: 'string',
            options: {
                list: [
                    { title: 'Pályázat', value: 'palyazat' },
                    { title: 'Jegyzőkönyv', value: 'jegyzokonyv' },
                    { title: 'Rendelet', value: 'rendelet' },
                    { title: 'Határozat', value: 'hatarozat' },
                    { title: 'Nyomtatvány', value: 'nyomtatvany' },
                    { title: 'Egyéb', value: 'egyeb' },
                ],
            },
        }),
        defineField({
            name: 'ev',
            title: 'Év',
            type: 'number',
            initialValue: new Date().getFullYear(),
        }),
    ],
})
