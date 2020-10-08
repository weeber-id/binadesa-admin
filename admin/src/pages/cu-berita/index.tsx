import React from 'react';
import EditorJs from 'react-editor-js';
import { Header, PageWrapper, Sidebar } from '../../components';

const CreateUpdateBerita = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="cu-berita">
          <EditorJs />
        </div>
      </PageWrapper>
    </>
  );
};

export default CreateUpdateBerita;
