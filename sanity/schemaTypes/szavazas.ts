import { defineField, defineType } from 'sanity'

export const szavazas = defineType({
    name: 'szavazas',
    title: 'Szavazás',
    type: 'document',
    fields: [
        defineField({
            name: 'szavazascim',
            title: 'Szavazás Címe / Kérdés',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'ismetles',
            title: 'Választás Ismétlése',
            type: 'boolean',
            description: 'Engedélyezett-e a többszöri szavazás?',
            initialValue: false,
        }),
        // You might want options here too? Assuming dynamic options or boolean yes/no?
        // Adding a basic options array just in case
        defineField({
            name: 'valaszok',
            title: 'Válaszlehetőségek',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'aktiv',
            title: 'Aktív',
            type: 'boolean',
            initialValue: true,
        }),
    ],
})
