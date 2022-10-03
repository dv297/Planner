/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Copied from this Github Issue
 * https://github.com/prisma/prisma/discussions/2528
 * @author Patrick Kerschbaum
 */
const seedDatabase = async () => {
  try {
    const rawSql = await fs.promises.readFile(
      path.join(__dirname, '../database/seed.sql'),
      {
        encoding: 'utf-8',
      }
    );
    const sqlReducedToStatements = rawSql
      .split('\n')
      .filter((line) => !line.startsWith('--')) // remove comments-only lines
      .join('\n')
      .replace(/\r\n|\n|\r/g, ' ') // remove newlines
      .replace(/\s+/g, ' '); // excess white space
    const sqlStatements = splitStringByNotQuotedSemicolon(
      sqlReducedToStatements
    );

    for (const sql of sqlStatements) {
      await prisma.$executeRawUnsafe(sql);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

function splitStringByNotQuotedSemicolon(input) {
  const result = [];

  let currentSplitIndex = 0;
  let isInString = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      // toggle isInString
      isInString = !isInString;
    }
    if (input[i] === ';' && !isInString) {
      result.push(input.substring(currentSplitIndex, i + 1));
      currentSplitIndex = i + 2;
    }
  }

  return result;
}

const main = async () => {
  shell.exec('npm run db:reset -- --force');
  await seedDatabase();
};

main();
