/**
 * Generates batch01-05.js files for each category from packData.js
 * Run: node packs/generateBatches.js
 */

const fs = require('fs');
const path = require('path');
const { visualPacks, informationalPacks, studentPacks, chunk } = require('./packData');

const PACKS_DIR = __dirname;

const writeBatchFiles = (category, packs) => {
  const dir = path.join(PACKS_DIR, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const batches = chunk(packs, 10);
  const batchFiles = [];

  batches.forEach((batch, index) => {
    const num = String(index + 1).padStart(2, '0');
    const filename = `batch${num}.js`;
    const content = `module.exports = ${JSON.stringify(batch, null, 2)};\n`;
    fs.writeFileSync(path.join(dir, filename), content, 'utf8');
    batchFiles.push(`batch${num}`);
    console.log(`  wrote ${category}/${filename} (${batch.length} packs)`);
  });

  const indexContent = `${batchFiles.map((b) => `const ${b} = require('./${b}');`).join('\n')}

module.exports = [
${batchFiles.map((b) => `  ...${b}`).join(',\n')}
];
`;

  fs.writeFileSync(path.join(dir, 'index.js'), indexContent, 'utf8');
  console.log(`  wrote ${category}/index.js`);
};

console.log('Generating marketplace pack batch files...\n');

console.log('Visual:');
writeBatchFiles('visual', visualPacks);

console.log('\nInformational:');
writeBatchFiles('informational', informationalPacks);

console.log('\nStudent:');
writeBatchFiles('student', studentPacks);

// Top-level re-exports
fs.writeFileSync(
  path.join(PACKS_DIR, 'visualPacks.js'),
  "const visualPacks = require('./visual');\n\nmodule.exports = { visualPacks };\n"
);
fs.writeFileSync(
  path.join(PACKS_DIR, 'informationalPacks.js'),
  "const informationalPacks = require('./informational');\n\nmodule.exports = { informationalPacks };\n"
);
fs.writeFileSync(
  path.join(PACKS_DIR, 'studentPacks.js'),
  "const studentPacks = require('./student');\n\nmodule.exports = { studentPacks };\n"
);

console.log('\nWrote visualPacks.js, informationalPacks.js, studentPacks.js');
console.log(`\nDone! Total packs: ${visualPacks.length + informationalPacks.length + studentPacks.length}`);
