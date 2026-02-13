import { type SchemaTypeDefinition } from 'sanity'

import { hir } from './hir'
import { kep } from './kep'
import { dokumentum } from './dokumentum'
import { helyszin } from './helyszin'
import { szavazas } from './szavazas'
import { oldalbeallitasok } from './oldalbeallitasok'
import { elokozvetites } from './elokozvetites'
import { szemely } from './szemely'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        hir,
        kep,
        dokumentum,
        helyszin,
        szavazas,
        oldalbeallitasok,
        elokozvetites,
        szemely,
    ],
}
