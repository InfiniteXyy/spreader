export interface ReaderTheme {
  name: string;
  mode: 'dark' | 'light';
  titleColor: string;
  fontColor: string;
  bgColor: string;
  displayColor: string;
}

export const DefaultReaderThemes: ReaderTheme[] = [
  {
    name: 'simple',
    mode: 'light',
    titleColor: '#4a4a4a',
    displayColor: '#dddddd',
    bgColor: '#fff',
    fontColor: 'black',
  },
  {
    name: 'night',
    mode: 'dark',
    titleColor: 'rgba(255,255,255,0.70)',
    displayColor: 'gray',
    bgColor: '#202124',
    fontColor: '#FFFFFF',
  },
  {
    name: 'dark',
    mode: 'dark',
    titleColor: 'rgba(170,170,170,0.97)',
    displayColor: '#4a4a4a',
    bgColor: 'black',
    fontColor: 'white',
  },
  {
    name: 'yellow',
    mode: 'light',
    titleColor: '#4a4a4a',
    displayColor: 'rgb(241,229,201)',
    bgColor: 'rgb(241,229,201)',
    fontColor: 'black',
  },
];
