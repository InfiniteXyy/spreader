const cheerio = require('react-native-cheerio');
import agent from '../agent';

export async function getList(url: string, query: string) {
  let html = await agent.get(url);
  const $ = cheerio.load(html);

  const links = [];
  $(query).each((index, element) => {
    let temp = $(element);
    links[index] = {
      title: temp.attr('title'),
      href: temp.attr('href')
    };
  });
  return links;
}

export async function getContent(url, query: string) {
  let html = await agent.get(url);
  const $ = cheerio.load(html);

  const contents = [];
  $(query).each((index, element) => {
    if (index !== 0) {
      let temp = $(element);
      contents[index] = temp.text();
    }
  });
  return contents;
}
