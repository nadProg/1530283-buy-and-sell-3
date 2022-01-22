'use strict';

const fs = require(`fs`);
const {ExitCode} = require(`../../constants`);
const {
  shuffle,
  getRandomInt,
  getRandomItem,
  getUniqueArray,
  getRandomEnumValue,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;

const MAX_COUNT = 1000;

const FILE_NAME = `mock.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

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

const generateDescription = () => shuffle(SENTENCES).slice(1, 5).join(` `);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: getUniqueArray(CATEGORIES),
    description: generateDescription(),
    picture: getPictureFileName(),
    title: getRandomItem(TITLES),
    type: getRandomEnumValue(OfferType),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const parsedCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (parsedCount > MAX_COUNT) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(parsedCount), null, 2);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
};
