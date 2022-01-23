"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const {
  shuffle,
  getRandomInt,
  getRandomItem,
  getUniqueArray,
  getRandomEnumValue,
  readContent,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;

const MAX_COUNT = 1000;

const FILE_MOCKS_PATH = `./mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const getPictureFileName = () => {
  const number = getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX);
  const formattedNumber = number < 10 ? `0${number}` : String(number);
  return `item${formattedNumber}.jpg`;
};

const generateDescription = (sentences) =>
  shuffle(sentences).slice(1, 5).join(` `);

const generateOffers = (count, categories, titles, sentences) =>
  Array(count)
    .fill({})
    .map(() => ({
      category: getUniqueArray(categories),
      description: generateDescription(sentences),
      picture: getPictureFileName(),
      title: getRandomItem(titles),
      type: getRandomEnumValue(OfferType),
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const parsedCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (parsedCount > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.ERROR);
    }

    const [titles, sentences, categories] = await Promise.all([
      readContent(FILE_TITLES_PATH),
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_CATEGORIES_PATH),
    ]);

    const content = JSON.stringify(
        generateOffers(parsedCount, categories, titles, sentences)
    );

    try {
      await fs.writeFile(FILE_MOCKS_PATH, content);
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
      return;
    }

    console.info(chalk.green(`Operation success. File created.`));
  },
};
