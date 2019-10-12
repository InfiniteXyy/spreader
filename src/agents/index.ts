const agent = {
  get: (url: string) => fetch(url).then(response => response.text()),
  getJSON: (url: string) => fetch(url).then(response => response.json()),
};

export default agent;
