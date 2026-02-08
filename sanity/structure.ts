import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title('Tartalom')
        .items([
            // Singleton: Oldal Beállítások
            S.listItem()
                .title('Oldal Beállítások')
                .id('oldalbeallitasok')
                .child(
                    S.document()
                        .schemaType('oldalbeallitasok')
                        .documentId('oldalbeallitasok')
                ),

            // Singleton: Élő Közvetítés
            S.listItem()
                .title('Élő Közvetítés')
                .id('elokozvetites')
                .child(
                    S.document()
                        .schemaType('elokozvetites')
                        .documentId('elokozvetites')
                ),

            S.divider(),

            // Regular document types
            // Filter out the singletons so they don't appear in the list twice
            ...S.documentTypeListItems().filter(
                (listItem) =>
                    !['oldalbeallitasok', 'elokozvetites'].includes(listItem.getId()!)
            ),
        ])
