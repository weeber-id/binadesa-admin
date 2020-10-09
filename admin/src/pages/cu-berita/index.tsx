import { API, OutputData } from '@editorjs/editorjs';
// @ts-ignore
import edjsHTML from '../../utils/editorjs-to-html';
import React, { useState } from 'react';
import EditorJs from 'react-editor-js';
import {
  Button,
  Header,
  Input,
  LoadingMessage,
  PageWrapper,
  Sidebar,
} from '../../components';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';
import { EDITOR_JS_TOOLS } from './plugins';

const CreateUpdateBerita = () => {
  const [bgUrl, setBgUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<OutputData>();
  const [contentToSave, setContentTosave] = useState<string>('');

  const handleChangeBG = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setLoading(true);
    const formdata = new FormData();
    formdata.append('folder_name', 'test/news');
    if (files) {
      formdata.append('file', files[0]);
    }

    const { response } = await fetchRequest(
      `${urlServer}/admin/media/public/upload
    `,
      { method: 'POST', body: formdata }
    );

    if (response?.status === 200) {
      const data = await response.json();

      setBgUrl(data.data.url);
    }

    setLoading(false);
  };

  const handleChange = async (api: API, data?: OutputData) => {
    setContent(data);
    const edjsParser = edjsHTML();

    if (data) {
      let html = edjsParser.parse(data);
      setContentTosave(html.join('\n'));
    }
  };

  return (
    <>
      {loading && <LoadingMessage />}
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="cu-berita">
          <Button className="cu-berita__btn">Save Post</Button>
          <input
            className="cu-berita__input"
            type="text"
            placeholder="Tulis Judul Disini"
          />
          <Input
            placeholder="Upload background"
            type="file"
            id="bg-news"
            accept="image/*"
            style={{ marginBottom: '2rem' }}
            onChange={handleChangeBG}
            fileName={bgUrl}
            onCancel={() => setBgUrl('')}
          />
          <div style={{ marginBottom: '3rem' }}></div>
          <EditorJs
            onChange={handleChange}
            tools={EDITOR_JS_TOOLS}
            data={content}
            placeholder="Tulis Artikel disini"
          />
        </div>
      </PageWrapper>
    </>
  );
};

export default CreateUpdateBerita;
