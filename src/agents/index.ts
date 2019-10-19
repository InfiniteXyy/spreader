import { BookFeed } from '../model/Feed';

const url = 'http://49.235.51.174:8080';

async function visit(route: string) {
  const result = await agent.getJSON(url + '/' + route);
  if (result.status !== 'ok' || !result.data) {
    throw new Error('net err');
  }
  return result.data;
}

const feed = {
  getTrending: async function(): Promise<BookFeed[]> {
    return await visit('feeds');
  },
};

const tag = {
  getList: async function(): Promise<[]> {
    return await visit('tags');
  },
};

const agent = {
  get: (url: string) => fetch(url).then(response => response.text()),
  getJSON: (url: string) => fetch(url).then(response => response.json()),
  feed,
  tag,
};

export default agent;
