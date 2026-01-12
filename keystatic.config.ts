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
            { label: 'Hírek', value: 'news' },
            { label: 'Közlemények', value: 'announcements' },
            { label: 'Rendezvények', value: 'events' },
            { label: 'Egyéb', value: 'other' },
          ],
          defaultValue: 'news',
        }),
        featuredImage: fields.image({
          label: 'Kiemelt kép',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        content: fields.document({
          label: 'Tartalom',
          formatting: true,
          dividers: true, 
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),
        publishedDate: fields.date({ label: 'Közzététel dátuma', defaultValue: new Date().toISOString().split('T')[0] }),
      },
    }),
    documents: collection({
      label: 'Dokumentumok',
      slugField: 'title',
      path: 'content/documents/*',
      schema: {
        title: fields.slug({ name: { label: 'Cím' } }),
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
        publishedDate: fields.date({ label: 'Közzététel dátuma' }),
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

