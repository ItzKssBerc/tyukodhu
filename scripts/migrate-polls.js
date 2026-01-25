const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const pollsDir = path.join(__dirname, '../content/polls');

async function migratePolls() {
  console.log('Starting polls migration...');

  const files = fs.readdirSync(pollsDir).filter(file => file.endsWith('.yaml'));

  for (const file of files) {
    const filePath = path.join(pollsDir, file);
    console.log(`Processing ${filePath}...`);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(fileContent);

      if (data && Array.isArray(data.options)) {
        const transformedOptions = data.options.map(option => {
          if (typeof option === 'string') {
            return { option: option };
          }
          return option; // Return as is if already an object
        });
        data.options = transformedOptions;

        const updatedYaml = yaml.dump(data);
        fs.writeFileSync(filePath, updatedYaml, 'utf8');
        console.log(`Successfully migrated ${file}`);
      } else {
        console.log(`No options array found or options are not strings in ${file}, skipping.`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log('Polls migration complete.');
}

migratePolls();
