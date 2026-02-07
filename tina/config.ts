import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = "main";

console.log("--- TINA BUILD DEBUG ---");
console.log("Branch:", branch);
console.log("Client ID present:", !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID);
console.log("Token present:", !!process.env.TINA_TOKEN);
console.log("Search Token type:", typeof process.env.TINA_SEARCH_TOKEN);
console.log("Search Token length:", process.env.TINA_SEARCH_TOKEN?.length);
console.log("------------------------");

// Special diagnostic patch to catch "str.split is not a function"
if (!(Object.prototype as any).split) {
  Object.defineProperty(Object.prototype, "split", {
    get() {
      return function (this: any) {
        console.error("--- ALERT: .split() called on non-string object! ---");
        console.error("Value:", this);
        console.error("Type:", typeof this);
        console.trace();
        throw new TypeError("str.split is not a function (Caught by Diagnostic Patch)");
      };
    },
    configurable: true,
  });
}

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: String(process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ""),
  token: String(process.env.TINA_TOKEN || ""),

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-cloudinary");
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  search: (process.env.TINA_SEARCH_TOKEN &&
    process.env.TINA_SEARCH_TOKEN !== "undefined" &&
    process.env.TINA_SEARCH_TOKEN !== "null")
    ? {
      tina: {
        indexerToken: String(process.env.TINA_SEARCH_TOKEN).trim(),
      },
    }
    : undefined,
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
        format: 'yaml',
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
        format: 'yaml',
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
        format: 'md',
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
              { value: "Szolgáltatás", label: "Szolgáltatás" },
              { value: "Szabadidő", label: "Szabadidő" },
              { value: "Vallás", label: "Vallás" },
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
            name: "details",
            label: "Részletes adatok",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.label };
              },
            },
            fields: [
              {
                type: "string",
                name: "label",
                label: "Cím (pl. Nyitvatartás, Telefon)",
              },
              {
                type: "string",
                name: "value",
                label: "Tartalom",
              },
            ],
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
        path: "content",
        format: 'md',
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
          {
            type: "image",
            name: "banner",
            label: "Banner Kép (Ha nincs élő adás)",
          },
        ],
        match: {
          include: 'live-stream-config',
        },
      },
      {
        name: "siteConfig",
        label: "Oldal Beállítások",
        path: "content",
        format: 'md',
        fields: [
          {
            type: "string",
            name: "title",
            label: "Cím",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "siteEmblem",
            label: "Oldal emblémája",
            required: true,
          },
          {
            type: "object",
            name: "bannerImages",
            label: "Üdvözlő Banner Képek",
            list: true,
            fields: [
              {
                type: "image",
                name: "image",
                label: "Kép",
                required: true,
              },
            ],
          },
        ],
        match: {
          include: 'site-config',
        },
      },
    ],
  },
});
