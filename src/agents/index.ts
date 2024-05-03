import axios from 'axios';
import fetch from 'cross-fetch';
import iconv from 'iconv-lite';

import { BookFeed } from '../model/Feed';

/** FIXME */
// const url = 'http://49.235.51.174:8080';

// async function visit(route: string) {
//   const result = await agent.getJSON(url + '/' + route);
//   if (result.status !== 'ok' || !result.data) {
//     throw new Error('net err');
//   }
//   return result.data;
// }

const feed = {
  async getTrending(): Promise<BookFeed[]> {
    // FIXME:demo
    return [
      {
        author: '火星引力',
        title: '逆天邪神',
        source: { name: '笔趣阁', url: 'https://www.xbiqugew.com/book/7138/' },
        id: 0,
        tags: [{ title: '奇幻' }],
        methods: {
          getContent: { query: '#content' },
          getList: { query: '.box_con #list a', url: 'https://www.xbiqugew.com/book/7138/' },
        },
        coverImg: 'http://r.m.b520.cc/files/article/image/1/1789/1789s.jpg',
        uploader: 'Xyy',
        chaptersCount: 1000,
      },
    ];
    // return [{ author: "jiangnan",  }];
    // return await visit('feeds');
  },
};

const tag = {
  async getList(): Promise<[]> {
    return [];
    // return await visit('tags');
  },
};

const agent = {
  get: async (_url: string) => {
    const buffer = await axios(_url, { responseType: 'arraybuffer' });
    return iconv.decode(Buffer.from(buffer.data), 'gb2312'); // hard code for testing
  },
  getJSON: (_url: string) => fetch(_url).then((response) => response.json()),
  feed,
  tag,
};

export default agent;
