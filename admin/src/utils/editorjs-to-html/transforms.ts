import { block } from './index';

export interface transforms {
  [key: string]: any;
  delimiter(): string;
  header(block: block): string;
  paragraph(block: block): string;
  list(block: block): string;
  image(block: block): string;
}

const transforms: transforms = {
  delimiter: () => {
    return `<div style="width: 100%; display: flex; justify-content: center; align-items: center; height: 60px;font-size: 30px; letter-spacing: .2em;">***<div/>`;
  },

  header: ({ data }) => {
    return `<h${data.level} style="padding: 1em 0; margin-bottom: -0.9em; line-height: 1.5em; outline: none;"> ${data.text} </h${data.level}>`;
  },

  paragraph: ({ data }) => {
    return `<p style="line-height: 1.6em;"> ${data.text} </p>`;
  },

  list: ({ data }) => {
    let style = data.style === 'unordered' ? 'ul' : 'ol';

    let list = '';
    if (data.items) {
      list = data.items
        .map(
          (i) =>
            `<li style="padding: 5.5px 0 5.5px 3px; line-height: 1.6em;"> ${i} </li>`
        )
        .reduce((a, c) => a + c, '');
    }
    return `<${style} style="padding-left: 40px; outline: none; margin: 0;"> ${list} </${style}>`;
  },

  image: ({ data }) => {
    let caption = data.caption ? data.caption : 'Image';
    return `<img style="max-width: 100%; vertical-align: bottom; display: block;" src="${
      data.file ? data.file.url : ''
    }" alt="${caption}" />`;
  },
};

export default transforms;
