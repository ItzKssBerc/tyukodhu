import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'cibn8exp',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
});

async function main() {
    try {
        const data = await client.fetch('*[_type == "helyszin"]{helyszinnev, helyszinikon}');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
