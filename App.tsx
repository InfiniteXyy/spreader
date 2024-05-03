import App from './src/App';

const defaultWarn = console.warn;
console.warn = (str, ...rest) => {
  // with react-tracked, this is not a problem now
  if (typeof str === 'string' && str.includes('Selector unknown returned the root state when called.')) {
    return;
  }
  defaultWarn(str, ...rest);
};
export default App;
