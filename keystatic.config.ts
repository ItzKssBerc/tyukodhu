import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
    // repo: 'ElectronSama/tyukodhu',
  },
  ui: {
    brand: {
      name: 'TYUKOD.HU',
    },
  },
  collections: {
    posts: collection({
      label: 'Hírek',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      columns: ['title', 'category', 'publishedDate'],
      schema: {
        title: fields.slug({ name: { label: 'Cím' } }),
        category: fields.select({
          label: 'Kategória',
          options: [
            { label: 'Hírek', value: 'hirek' },
            { label: 'Közlemények', value: 'kozlemenyek' },
            { label: 'Rendezvények', value: 'rendezvenyek' },
            { label: 'Egyéb', value: 'egyeb' },
          ],
          defaultValue: 'hirek',
        }),
        featuredImage: fields.image({
          label: 'Kiemelt kép',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.markdoc({
          label: 'Tartalom',
        }),
        publishedDate: fields.date({ label: 'Közzététel dátuma', defaultValue: new Date().toISOString().split('T')[0] }),
      },
    }),
    documents: collection({
      label: 'Dokumentumok',
      slugField: 'title',
      path: 'content/documents/*',
      columns: ['title', 'category', 'publishedDate'],
      schema: {
        title: fields.slug({ name: { label: 'Cím' } }),
        category: fields.select({
            label: 'Kategória',
            options: [
                { label: 'Jegyzőkönyvek', value: 'jegyzokonyvek' },
                { label: 'Határozatok', value: 'hatarozatok' },
                { label: 'Rendeletek', value: 'rendeletek' },
                { label: 'Meghívók', value: 'meghivok' },
                { label: 'Egyéb', value: 'egyeb' },
            ],
            defaultValue: 'jegyzokonyvek',
        }),
        description: fields.text({
          label: 'Leírás',
          description: 'Rövid leírás a dokumentumról.',
          multiline: true,
        }),
        file: fields.file({
          label: 'Fájl',
          directory: 'public/documents',
          publicPath: '/documents/',
          validation: {
            isRequired: true,
          },
        }),
        publishedDate: fields.date({ label: 'Közzététel dátuma', defaultValue: new Date().toISOString().split('T')[0] }),
      },
    }),
    images: collection({
      label: 'Képek',
      slugField: 'title',
      path: 'content/images/*',
      schema: {
        title: fields.slug({ name: { label: 'Cím' } }),
        description: fields.text({
          label: 'Leírás',
          multiline: true,
          description: 'Rövid leírás a képről.',
        }),
        image: fields.image({
          label: 'Kép',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
          validation: {
            isRequired: true,
          },
        }),
        publishedDate: fields.date({ label: 'Feltöltés dátuma' }),
      },
    }),
    locations: collection({
      label: 'Helyszínek',
      slugField: 'title',
      path: 'content/locations/*',
      schema: {
        title: fields.slug({ name: { label: 'Megnevezés' } }),
        address: fields.text({ label: 'Cím', validation: { isRequired: true } }),
        category: fields.select({
          label: 'Kategória',
          options: [
            { label: 'Önkormányzat', value: 'Önkormányzat' },
            { label: 'Kultúra', value: 'Kultúra' },
            { label: 'Oktatás', value: 'Oktatás' },
            { label: 'Egészségügy', value: 'Egészségügy' },
            { label: 'Sport', value: 'Sport' },
            { label: 'Egyéb', value: 'Egyéb' },
          ],
          defaultValue: 'Egyéb',
        }),
        description: fields.text({
          label: 'Leírás',
          multiline: true,
          description: 'Rövid leírás a helyszínről.',
        }),
        images: fields.array(
          fields.image({
            label: 'Kép',
            directory: 'public/images/locations',
            publicPath: '/images/locations/',
          }),
          {
            label: 'Képek',
            itemLabel: (props) => props.value?.filename || 'Kép',
          }
        ),
      },
    }),

  },
  singletons: {
    liveStream: {
      label: 'Élő Adás Beállítások',
      path: 'content/live-stream',
      schema: {
        streamUrl: fields.url({ label: 'Stream URL (YouTube/Vimeo beágyazási link)' }),
        embedCode: fields.text({
          label: 'Beágyazási kód (iframe)',
          description: 'Alternatívaként használd a teljes iframe kódot.',
          multiline: true,
        }),
        isLive: fields.checkbox({ label: 'Élő Adás Aktív', defaultValue: false }),
      },
    },
  },
});

