import { OutputData } from '@editorjs/editorjs';
import transforms from './transforms';

import { ParseFunctionError } from './errors';

export interface block {
  type: string;
  data: {
    text: string;
    level?: number;
    caption?: string;
    file?: {
      url?: string;
    };
    stretched?: boolean;
    withBackground?: boolean;
    withBorder?: boolean;
    items?: string[];
    style?: string;
  };
}

interface parser {
  parse(OutputData: OutputData): any;
  parseBlock(block: block): any;
}

const parser = (plugins = {}): parser => {
  Object.assign(transforms, plugins);

  return {
    parse: ({ blocks }) => {
      return blocks.map((block: block) => {
        return transforms[block.type]
          ? transforms[block.type](block)
          : ParseFunctionError(block.type);
      });
    },

    parseBlock: (block: block) => {
      return transforms[block.type]
        ? transforms[block.type](block)
        : ParseFunctionError(block.type);
    },
  };
};

export default parser;
