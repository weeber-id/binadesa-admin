import { API, OutputData } from '@editorjs/editorjs';
import React, { useEffect, useState } from 'react';
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
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '../../hooks/use-query';

type UpdateBeritaState = {
  title: string;
  image_cover: string;
  id: string;
  content: OutputData;
};

const CreateUpdateBerita = () => {
  const [bgUrl, setBgUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<OutputData>();
  const [title, setTitle] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const { state } = useLocation<UpdateBeritaState>();
  const type = useQuery().get('type');
  const history = useHistory();

  useEffect(() => {
    if (type === 'edit') {
      setContent(state.content);
      setTitle(state.title);
      setBgUrl(state.image_cover);
    }
  }, [state, type]);

  useEffect(() => {
    if (bgUrl.length > 0 && title.length > 0 && content) setDisabled(false);
  }, [bgUrl, title, content]);

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

  const handleChange = (api: API, data?: OutputData) => {
    setContent(data);
  };

  const handleSave = async () => {
    setLoading(true);

    const body = {
      author: 'Admin Bina Desa',
      title,
      image_cover: bgUrl,
      content: JSON.stringify(content),
    };

    let urlFetch = `${urlServer}/admin/news`;

    if (type === 'edit')
      urlFetch = `${urlServer}/admin/news/update?id=${state.id}`;

    const { response } = await fetchRequest(urlFetch, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    setLoading(false);
    if (response?.status.toString().startsWith('2')) {
      history.push('/berita');
    }
  };

  return (
    <>
      {loading && <LoadingMessage />}
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="cu-berita">
          <Button
            isDisabled={isDisabled}
            onClick={handleSave}
            className="cu-berita__btn"
          >
            Save Post
          </Button>
          <input
            className="cu-berita__input"
            type="text"
            placeholder="Tulis Judul Disini"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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
          {type === 'edit' && content ? (
            <EditorJs
              onChange={handleChange}
              tools={EDITOR_JS_TOOLS}
              data={content}
              placeholder="Tulis Artikel disini"
            />
          ) : !type ? (
            <EditorJs
              onChange={handleChange}
              tools={EDITOR_JS_TOOLS}
              data={content}
              placeholder="Tulis Artikel disini"
            />
          ) : null}
        </div>
      </PageWrapper>
    </>
  );
};

export default CreateUpdateBerita;
