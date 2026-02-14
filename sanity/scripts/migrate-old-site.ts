import { createClient } from 'next-sanity'
import { readdirSync, readFileSync, statSync, existsSync } from 'fs'
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
const ALBUM_TITLE = 'Mentés a régi oldalról'
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

async function uploadImages() {
    console.log('--- Képek feltöltése ---')
    const picsPath = join(MENTES_PATH, 'pics')
    if (!existsSync(picsPath)) return

    const files = readdirSync(picsPath)
    for (const file of files) {
        const fullPath = join(picsPath, file)
        if (statSync(fullPath).isDirectory()) continue

        const ext = extname(file).toLowerCase()
        if (IMAGE_EXTENSIONS.includes(ext)) {
            console.log(`Kép: ${file}`)
            const asset = await uploadAsset(fullPath, 'image')
            if (asset) {
                await client.create({
                    _type: 'kep',
                    kepcim: file,
                    album: ALBUM_TITLE,
                    kep: {
                        _type: 'image',
                        asset: { _type: 'reference', _ref: asset._id },
                    },
                })
            }
        }
    }
}

async function uploadDocuments() {
    console.log('--- Dokumentumok feltöltése ---')
    const docsPath = join(MENTES_PATH, 'docs')
    if (!existsSync(docsPath)) return

    // List of directories to process for docs
    const dirs = [docsPath, join(docsPath, 'regulations_docs'), join(docsPath, 'events_docs'), join(docsPath, 'institutes_docs')]

    for (const dir of dirs) {
        if (!existsSync(dir)) continue
        const files = readdirSync(dir)
        for (const file of files) {
            const fullPath = join(dir, file)
            if (statSync(fullPath).isDirectory()) continue

            const ext = extname(file).toLowerCase()
            if (DOC_EXTENSIONS.includes(ext)) {
                console.log(`Dokumentum: ${file}`)
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
                                asset: { _type: 'reference', _ref: asset._id },
                            },
                        ],
                    })
                }
            }
        }
    }
}

async function uploadNews() {
    console.log('--- Hírek feltöltése ---')
    const rssPath = join(MENTES_PATH, 'docs', 'news', 'rss', 'rss.xml')
    if (!existsSync(rssPath)) {
        console.log('rss.xml nem található.')
        return
    }

    const xml = readFileSync(rssPath, 'utf-8')
    // Simple regex parsing for the 6 items found
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || []

    for (const item of items) {
        const titleMatch = item.match(/<title>(.*?)<\/title>/)
        const title = titleMatch ? titleMatch[1].trim() : 'Névtelen hír'

        console.log(`Hír: ${title}`)

        await client.create({
            _type: 'hir',
            cim: title,
            slug: { _type: 'slug', current: title.toLowerCase().replace(/\s+/g, '-').replace(/[^-a-z0-9]/g, '').slice(0, 96) },
            hirkategoria: CATEGORY_VALUE,
            datum: new Date().toISOString(),
            hirtartalom: [
                {
                    _key: Math.random().toString(36).substring(7),
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Régi oldalról mentett hír.' }],
                    markDefs: [],
                    style: 'normal',
                },
            ],
        })
    }
}

async function run() {
    console.log('Migráció indítása...')
    await uploadImages()
    await uploadDocuments()
    await uploadNews()
    console.log('Migráció kész!')
}

run()
