import { defineField, defineType, defineArrayMember } from 'sanity'
import { cloudinaryImageSource } from 'sanity-plugin-cloudinary'

export const album = defineType({
    name: 'album',
    title: 'Album',
    type: 'document',
    fields: [
        defineField({
            name: 'cim',
            title: 'Album Címe',
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
            name: 'datum',
            title: 'Dátum',
            type: 'datetime',
            initialValue: (new Date()).toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'boritokep',
            title: 'Borítókép',
            type: 'image',
            options: {
                hotspot: true,
                sources: [cloudinaryImageSource],
            },
        }),
        defineField({
            name: 'kepek',
            title: 'Képek',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: {
                        hotspot: true,
                        sources: [cloudinaryImageSource],
                    },
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
})
