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
        id: 1,
        tags: [],
        source: { name: '逆天邪神', url: 'https://www.nitiandu.com/nitianxieshen' },
        uploader: 'InfiniteXyy',
        lastUpdateChapter: undefined,
        chaptersCount: 1000,
        title: '逆天邪神',
        author: '火星引力',
        coverImg: 'http://r.m.b520.cc/files/article/image/1/1789/1789s.jpg',
        methods: {
          getList: {
            url: 'https://www.nitiandu.com/nitianxieshen',
            query: '.container ul li a | 6',
          },
          getContent: {
            query: '#content p',
          },
        },
      },
      {
        id: 2,
        tags: [],
        source: { name: '逆天邪神', url: 'https://www.nitiandu.com/shengwu' },
        uploader: 'InfiniteXyy',
        title: '圣武星辰',
        author: '乱世狂刀',
        lastUpdateChapter: undefined,
        chaptersCount: 1000,
        coverImg: 'https://img.ting55.com/2019/08/13808.jpg%21300',
        methods: {
          getList: {
            url: 'https://www.nitiandu.com/shengwu',
            query: '.container ul li a | 6',
          },
          getContent: {
            query: '#content p',
          },
        },
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
  feed,
  tag,
  async get(url: string): Promise<string> {
    const { data: html } = await axios.get(url, {
      responseType: 'text',
      headers: {
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
    });
    return html;
  },
};

export default agent;
