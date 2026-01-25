// test-tina.mjs
import { client } from './tina/__generated__/client.js';

async function testTina() {
  try {
    const tinaData = await client.queries.liveStream({ relativePath: 'config.md' });
    console.log('Tina data:', JSON.stringify(tinaData, null, 2));
  } catch (error) {
    console.error('Error fetching Tina data:', error);
  }
}

testTina();
