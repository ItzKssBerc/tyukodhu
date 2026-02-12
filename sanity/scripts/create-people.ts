import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-08'
const token = process.env.SANITY_WRITE_TOKEN

if (!token) {
    console.error('Hiba: A SANITY_WRITE_TOKEN hiányzik a .env.local fájlból!')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token, // Írási jogosultsághoz szükséges token
})

const people = [
    {
        nev: 'Kajdi Szabolcs',
        titulus: 'Polgármester',
        kategoria: ['kepviselo-testulet'],
    },
    {
        nev: 'Bíró Sándor',
        titulus: 'Alpolgármester',
        kategoria: ['kepviselo-testulet'],
    },
    {
        nev: 'Bakó Attila',
        titulus: 'Képviselő',
        kategoria: ['kepviselo-testulet', 'bizottsag'],
        bizottsagok: [{ nev: 'Pénzügyi bizottság', pozicio: 'bizottság elnöke' }],
    },
    {
        nev: 'Kerezsi Józsefné',
        titulus: 'Képviselő',
        kategoria: ['kepviselo-testulet', 'bizottsag'],
        bizottsagok: [{ nev: 'Egészségügyi és Szociális bizottság', pozicio: 'bizottsági tag' }],
    },
    {
        nev: 'Kócsi Norbert',
        titulus: 'Képviselő',
        kategoria: ['kepviselo-testulet', 'bizottsag'],
        bizottsagok: [{ nev: 'Pénzügyi bizottság', pozicio: 'bizottsági tag' }],
    },
    {
        nev: 'Pálócziné Belényesi Enikő',
        titulus: 'Képviselő',
        kategoria: ['kepviselo-testulet', 'bizottsag'],
        bizottsagok: [{ nev: 'Egészségügyi és Szociális bizottság', pozicio: 'bizottság elnöke' }],
    },
    {
        nev: 'Somlyai Ádám',
        titulus: 'Képviselő',
        kategoria: ['kepviselo-testulet', 'bizottsag'],
        bizottsagok: [{ nev: 'Pénzügyi bizottság', pozicio: 'bizottsági tag' }],
    },
    {
        nev: 'Feka János',
        titulus: 'Külsős bizottsági tag',
        kategoria: ['bizottsag'],
        bizottsagok: [{ nev: 'Egészségügyi és Szociális bizottság', pozicio: 'külsős tag' }],
    },
]

async function migrate() {
    console.log('Migráció indítása...')

    for (const person of people) {
        try {
            const result = await client.create({
                _type: 'szemely',
                ...person,
            } as any)
            console.log(`Létrehozva: ${result.nev} (${result._id})`)
        } catch (error) {
            console.error(`Hiba a létrehozás során (${person.nev}):`, error)
        }
    }

    console.log('Migráció befejezve.')
}

migrate()
