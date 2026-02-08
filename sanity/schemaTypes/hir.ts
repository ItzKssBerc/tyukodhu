import { defineField, defineType } from 'sanity'

export const hir = defineType({
    name: 'hir',
    title: 'Hír',
    type: 'document',
    fields: [
        defineField({
            name: 'cim',
            title: 'Cím',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'cim',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'hirindexkep',
            title: 'Indexkép',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'hirkategoria',
            title: 'Kategória',
            type: 'string',
            options: {
                list: [
                    { title: 'Közérdekű', value: 'kozerdeku' },
                    { title: 'Önkormányzati', value: 'onkormanyzati' },
                    { title: 'Kulturális', value: 'kulturalis' },
                    { title: 'Sport', value: 'sport' },
                    { title: 'Egyéb', value: 'egyeb' },
                ],
            },
            initialValue: 'kozerdeku',
        }),
        defineField({
            name: 'hirtartalom',
            title: 'Tartalom',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' },
            ],
        }),
        defineField({
            name: 'hircimke',
            title: 'Címkék',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'datum',
            title: 'Dátum',
            type: 'datetime',
            initialValue: (new Date()).toISOString(),
        }),
    ],
})
