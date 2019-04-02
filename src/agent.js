const agent = {
  get: url => fetch(url).then(response => response.text())
};

export default agent;
