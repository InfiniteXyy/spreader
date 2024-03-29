import fetch from 'cross-fetch';
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
  getTrending: async function (): Promise<BookFeed[]> {
    // FIXME:demo
    return [
      {
        author: '火星引力',
        title: '逆天邪神',
        source: { name: '笔趣阁', url: 'https://www.b520.cc/1_1789/' },
        id: 0,
        tags: [{ title: '奇幻' }],
        methods: {
          getContent: { query: '#content p' },
          getList: { query: '.box_con #list a', url: 'http://www.b520.cc/1_1789/' },
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
  getList: async function (): Promise<[]> {
    return [];
    // return await visit('tags');
  },
};

const agent = {
  get: async (_url: string) => {
    const result = await fetch(_url).then((response) => response.text());
    return result;
  },
  getJSON: (_url: string) => fetch(_url).then((response) => response.json()),
  feed,
  tag,
};

export default agent;
