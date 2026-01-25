import { defineConfig } from "tinacms";



// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: 'a545a301-d886-42b2-a96c-dc294d8aa279',
  // Get this from tina.io
  token: '7d162df6b6bc346e6ec2f998e2b32e6825bd2ea8',

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng', 'hun'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "posts",
        label: "Hírek",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Cím",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Kategória",
            options: [
              { value: "hirek", label: "Hírek" },
              { value: "kozlemenyek", label: "Közlemények" },
              { value: "rendezvenyek", label: "Rendezvények" },
              { value: "egyeb", label: "Egyéb" },
            ],
          },
          {
            type: "datetime",
            name: "publishedDate",
            label: "Közzététel dátuma és ideje",
            ui: {
              defaultValue: new Date().toISOString(),
            },
          },
          {
            type: "rich-text",
            name: "content",
            label: "Tartalom",
            isBody: true,
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Kiemelt kép",
            required: true,
          },
        ],
      },
      {
        name: "documents",
        label: "Dokumentumok",
        path: "content/documents",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Cím",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Kategória",
            options: [
              { value: "jegyzokonyvek", label: "Jegyzőkönyvek" },
              { value: "hatarozatok", label: "Határozatok" },
              { value: "rendeletek", label: "Rendeletek" },
              { value: "meghivok", label: "Meghívók" },
              { value: "egyeb", label: "Egyéb" },
            ],
          },
          {
            type: "string",
            name: "description",
            label: "Leírás",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "file",
            label: "Fájl",
            required: true,
          },
          {
            type: "datetime",
            name: "publishedDate",
            ui: {
              defaultValue: new Date().toISOString(),
            },
          },
        ],
      },
      {
        name: "images",
        label: "Képek",
        path: "content/images",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Cím",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Leírás",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "album",
            label: "Album",
          },
          {
            type: "image",
            name: "image",
            label: "Kép",
            required: true,
          },
          {
            type: "datetime",
            name: "publishedDate",
            label: "Feltöltés dátuma és ideje",
            ui: {
              defaultValue: new Date().toISOString(),
            },
          },
        ],
      },
      {
        name: "locations",
        label: "Helyszínek",
        path: "content/locations",
        format: 'yaml',
        fields: [
          {
            type: "string",
            name: "title",
            label: "Megnevezés",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "address",
            label: "Cím (Megjelenítéshez)",
            required: true,
          },
          {
            type: "object",
            name: "coordinates",
            label: "Koordináták",
            fields: [
              {
                type: "number",
                name: "lat",
                label: "Szélesség (Latitude)",
              },
              {
                type: "number",
                name: "lng",
                label: "Hosszúság (Longitude)",
              },
            ],
          },
          {
            type: "string",
            name: "category",
            label: "Kategória",
            options: [
              { value: "Önkormányzat", label: "Önkormányzat" },
              { value: "Kultúra", label: "Kultúra" },
              { value: "Oktatás", label: "Oktatás" },
              { value: "Egészségügy", label: "Egészségügy" },
              { value: "Sport", label: "Sport" },
              { value: "Egyéb", label: "Egyéb" },
            ],
          },
          {
            type: "string",
            name: "markerIcon",
            label: "Térkép ikon",
            options: [
              { value: "MapPin", label: "Alapértelmezett (Tű)" },
              { value: "Home", label: "Otthon" },
              { value: "Building", label: "Épület" },
              { value: "Kórház", label: "Kórház" },
              { value: "Iskola", label: "Iskola" },
              { value: "Star", label: "Sztár" },
              { value: "Info", label: "Információ" },
            ],
          },
          {
            type: "string",
            name: "markerColor",
            label: "Marker színe",
            options: [
              { value: "#C62828", label: "Piros" },
              { value: "#1565C0", label: "Kék" },
              { value: "#2E7D32", label: "Zöld" },
              { value: "#6A1B9A", label: "Lila" },
              { value: "#EF6C00", label: "Narancs" },
            ],
          },
          {
            type: "string",
            name: "description",
            label: "Leírás",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "images",
            label: "Képek",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Kép",
              },
            ],
          },
        ],
      },
      {
        name: "people",
        label: "Személyek",
        path: "content/people",
        format: 'yaml',
        fields: [
          {
            type: "string",
            name: "name",
            label: "Név",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "body",
            label: "Testület",
            options: [
              { value: "kepviselo-testulet", label: "Képviselő testület" },
              { value: "penzugyi-bizottsag", label: "Pénzügyi bizottság" },
              { value: "egeszsegugyi-es-szocialis-bizottsag", label: "Egészségügyi és Szociális bizottság" },
            ],
          },
          {
            type: "string",
            name: "position",
            label: "Beosztás",
          },
          {
            type: "object",
            name: "committees",
            label: "Bizottsági tagságok",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Bizottság neve",
              },
              {
                type: "string",
                name: "position",
                label: "Pozíció",
              },
            ],
          },
          {
            type: "image",
            name: "image",
            label: "Fénykép",
          },
        ],
      },
      {
        name: "polls",
        label: "Szavazások",
        path: "content/polls",
        format: 'yaml',
        fields: [
          {
            type: "string",
            name: "question",
            label: "Kérdés",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "options",
            label: "Válaszok",
            list: true,
            fields: [
              {
                type: "string",
                name: "option",
                label: "Válaszlehetőség",
              },
            ],
          },
          {
            type: "boolean",
            name: "isActive",
            label: "Aktív szavazás",
          },
          {
            type: "boolean",
            name: "allowChange",
            label: "Szavazat módosítása engedélyezve",
          },
          {
            type: "datetime",
            name: "publishedDate",
            label: "Létrehozva",
            ui: {
              defaultValue: new Date().toISOString(),
            },
          },
        ],
      },
      {
        name: "liveStream",
        label: "Élő Adás Beállítások",
        path: "content/live-stream",
        format: 'yaml',
        fields: [
          {
            type: "string",
            name: "streamUrl",
            label: "Stream URL (YouTube/Vimeo beágyazási link)",
          },
          {
            type: "string",
            name: "embedCode",
            label: "Beágyazási kód (iframe)",
            // ui: {
            //   component: "textarea",
            // },
          },
          {
            type: "boolean",
            name: "isLive",
            label: "Élő Adás Aktív",
          },
        ],
        match: {
          include: 'index',
        },
      },
    ],
  },
});
