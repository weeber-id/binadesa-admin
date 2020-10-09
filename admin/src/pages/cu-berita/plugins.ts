// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import Underline from '@editorjs/underline';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: List,
  image: {
    class: Image,
    config: {
      uploader: {
        async uploadByFile(file: any) {
          const formdata = new FormData();
          formdata.append('folder_name', 'test/news');
          formdata.append('file', file);

          const { response } = await fetchRequest(
            `${urlServer}/admin/media/public/upload`,
            {
              method: 'POST',
              body: formdata,
            }
          );
          if (response?.status === 200) {
            const data = await response.json();

            return {
              success: 1,
              file: {
                url: data.data.url,
              },
            };
          }
        },
      },
    },
  },
  header: Header,
  delimiter: Delimiter,
  underline: Underline,
};
