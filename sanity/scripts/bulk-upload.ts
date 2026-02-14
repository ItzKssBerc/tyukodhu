import { createClient } from 'next-sanity'
import { readdirSync, readFileSync, statSync } from 'fs'
import { join, extname, basename } from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Hiányzó Sanity konfiguráció! Ellenőrizd a .env.local fájlt.')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token,
})

const MENTES_PATH = 'c:\\Users\\kissb\\Downloads\\mentés'
const CATEGORY_TITLE = 'Mentés a régi oldalról'
const CATEGORY_VALUE = 'mentes-regi'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const DOC_EXTENSIONS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx']

async function uploadAsset(filePath: string, type: 'image' | 'file') {
    try {
        const fileBuffer = readFileSync(filePath)
        const asset = await client.assets.upload(type, fileBuffer, {
            filename: basename(filePath),
        })
        return asset
    } catch (error) {
        console.error(`Hiba a feltöltés során: ${filePath}`, error)
        return null
    }
}

async function processDirectory(dirPath: string) {
    const files = readdirSync(dirPath)

    for (const file of files) {
        const fullPath = join(dirPath, file)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
            await processDirectory(fullPath)
            continue
        }

        const ext = extname(file).toLowerCase()

        if (IMAGE_EXTENSIONS.includes(ext)) {
            console.log(`Kép feltöltése: ${file}`)
            const asset = await uploadAsset(fullPath, 'image')
            if (asset) {
                await client.create({
                    _type: 'kep',
                    kepcim: file,
                    album: CATEGORY_TITLE,
                    kep: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id,
                        },
                    },
                })
                console.log(`Sikeres: ${file}`)
            }
        } else if (DOC_EXTENSIONS.includes(ext)) {
            console.log(`Dokumentum feltöltése: ${file}`)
            const asset = await uploadAsset(fullPath, 'file')
            if (asset) {
                await client.create({
                    _type: 'dokumentum',
                    dokumentumcim: file,
                    kategoria: CATEGORY_VALUE,
                    fajlok: [
                        {
                            _key: Math.random().toString(36).substring(7),
                            _type: 'file',
                            asset: {
                                _type: 'reference',
                                _ref: asset._id,
                            },
                        },
                    ],
                })
                console.log(`Sikeres: ${file}`)
            }
        }
    }
}

async function run() {
    console.log('Bulk feltöltés indítása...')
    await processDirectory(MENTES_PATH)
    console.log('Kész!')
}

run()
