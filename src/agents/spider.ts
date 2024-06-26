import { load } from 'cheerio';

import agent from '.';
import { GetContentMethod, GetListMethod } from '../model/Book';
import { SavedChapter } from '../model/Chapter';

export async function getList(method: GetListMethod) {
  const { query, url, reverse } = method;
  const [q, range] = query.split('|');
  const html = await agent.get(url);
  const $ = load(html);
  const links: SavedChapter[] = [];

  $(q).each((_index, element) => {
    const temp = $(element);
    links.push({
      title: temp.text(),
      href: new URL(temp.attr('href') || '/', url).toString(),
      hasRead: false,
    });
  });

  if (range) {
    links.splice(+range > 0 ? 0 : -range, +range);
  }
  if (reverse) {
    links.reverse();
  }

  return links;
}

export async function getContent(url: string, method: GetContentMethod) {
  const { query } = method;

  const html = await agent.get(url);
  const $ = load(html);

  const contents: string[] = [];
  $(query).each((index, element) => {
    contents.push($(element).text());
  });

  return contents.map((i) => i.trim()).filter((i) => !!i);
}
