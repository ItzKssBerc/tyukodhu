import { defineField, defineType, defineArrayMember } from 'sanity'
import { cloudinaryImageSource } from 'sanity-plugin-cloudinary'

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
                sources: [cloudinaryImageSource],
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
                    { title: 'Mentés a régi oldalról', value: 'mentes-regi' },
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
                defineArrayMember({ type: 'block' }),
                defineArrayMember({
                    type: 'image',
                    options: { sources: [cloudinaryImageSource] }
                }),
            ],
        }),
        defineField({
            name: 'hircimke',
            title: 'Címkék',
            type: 'array',
            of: [defineArrayMember({ type: 'string' })],
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
