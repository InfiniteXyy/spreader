const cheerio = require('react-native-cheerio');
import agent from '../agent';

export async function getList(method) {
  const { query, url, href_prefix } = method;

  let html = await agent.get(url);
  const $ = cheerio.load(html);

  const links = [];
  $(query.split('|')[0]).each((index, element) => {
    let temp = $(element);
    links[index] = {
      title: temp.text(),
      href: (href_prefix || '') + temp.attr('href')
    };
  });

  let range = Number(query.split('|')[1]);
  if (range) {
    if (range > 0) return links.slice(range);
    else return links.slice(0, -range);
  } else {
    return links;
  }
}

export async function getContent(url, method) {
  const { query } = method;

  let html = await agent.get(url);
  const $ = cheerio.load(html);

  const contents = [];
  console.log($(query).html());
  $(query).each((index, element) => {
    if (index !== 0) {
      contents.push($(element).text());
    }
  });
  return contents.map(i => i.trim()).filter(i => i !== '');
}
