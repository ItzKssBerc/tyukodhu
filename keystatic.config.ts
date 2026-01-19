import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'ElectronSama/tyukodhu',
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
      columns: ['title', 'category', 'publishedDate', 'publishedTime'], // Added publishedTime to columns
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
        publishedDate: fields.date({ label: 'Közzététel dátuma', defaultValue: { kind: 'today' } }),
        publishedTime: fields.text({
          label: 'Közzététel ideje',
          defaultValue: () => new Date().toTimeString().split(' ')[0].substring(0, 5),
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
        featuredImage: fields.image({
            label: 'Kiemelt kép',
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
            validation: {
                isRequired: true,
            },
        }),
      },
    }),
    documents: collection({
      label: 'Dokumentumok',
      slugField: 'title',
      path: 'content/documents/*',
      columns: ['title', 'category', 'publishedDate', 'publishedTime'], // Added publishedTime to columns
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
        publishedDate: fields.date({ label: 'Közzététel dátuma', defaultValue: { kind: 'today' } }),
        publishedTime: fields.text({
          label: 'Közzététel ideje',
          defaultValue: () => new Date().toTimeString().split(' ')[0].substring(0, 5),
        }),
      },
    }),
    images: collection({
      label: 'Képek',
      slugField: 'title',
      path: 'content/images/*',
      columns: ['title', 'album', 'publishedDate', 'publishedTime'], // Added publishedTime to columns
      schema: {
        title: fields.slug({ name: { label: 'Cím' } }),
        description: fields.text({
          label: 'Leírás',
          multiline: true,
          description: 'Rövid leírás a képről.',
        }),
        album: fields.text({
          label: 'Album',
          description: 'Adja meg az album nevét, ahova a kép tartozik.',
        }),
        image: fields.image({
          label: 'Kép',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
          validation: {
            isRequired: true,
          },
        }),
        publishedDate: fields.date({ label: 'Feltöltés dátuma', defaultValue: { kind: 'today' } }),
        publishedTime: fields.text({
          label: 'Feltöltés ideje',
          defaultValue: () => new Date().toTimeString().split(' ')[0].substring(0, 5),
        }),
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
        markerIcon: fields.select({
          label: 'Térkép ikon',
          description: 'Válassza ki a helyszínhez tartozó marker ikont a térképen.',
          options: [
            { label: 'Alapértelmezett (Tű)', value: 'MapPin' },
            { label: 'Otthon', value: 'Home' },
            { label: 'Épület', value: 'Building' },
            { label: 'Kórház', value: 'Hospital' },
            { label: 'Iskola', value: 'School' },
            { label: 'Sztár', value: 'Star' },
            { label: 'Információ', value: 'Info' },
          ],
          defaultValue: 'MapPin',
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
    people: collection({
        label: 'Személyek',
        slugField: 'name',
        path: 'content/people/*',
        columns: ['name', 'body', 'position'],
        schema: {
            name: fields.slug({ name: { label: 'Név' } }),
            body: fields.select({
                label: 'Testület',
                options: [
                    { label: 'Képviselő testület', value: 'kepviselo-testulet' },
                    { label: 'Pénzügyi bizottság', value: 'penzugyi-bizottsag' },
                    { label: 'Egészségügyi és Szociális bizottság', value: 'egeszsegugyi-es-szocialis-bizottsag' },
                ],
                defaultValue: 'kepviselo-testulet',
            }),
            position: fields.text({ label: 'Beosztás' }),
            committees: fields.array(
                fields.object({
                    name: fields.text({ label: 'Bizottság neve' }),
                    position: fields.text({ label: 'Pozíció' }),
                }),
                {
                    label: 'Bizottsági tagságok',
                    itemLabel: (props) => props.fields.name.value || 'Bizottság',
                }
            ),
            image: fields.image({
                label: 'Fénykép',
                directory: 'public/images/people',
                publicPath: '/images/people/',
            }),
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
