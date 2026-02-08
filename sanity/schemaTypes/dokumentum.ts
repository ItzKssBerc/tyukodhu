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
            name: 'fajl',
            title: 'Fájl',
            type: 'file',
            options: {
                accept: '.pdf,.jpg,.png,.doc,.docx',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'kategoria',
            title: 'Kategória',
            type: 'string',
            options: {
                list: [
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
