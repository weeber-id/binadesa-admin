import React from 'react';
import { Button, Card, Header, PageWrapper, Sidebar } from '../../components';

const Berita = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="berita">
          <Button color="green">Tambahkan Artikel</Button>
          <div className="cards">
            <Card title="Test" date="test" />
            <Card title="Test" date="test" />
            <Card title="Test" date="test" />
            <Card title="Test" date="test" />
            <Card title="Test" date="test" />
            <Card title="Test" date="test" />
            <Card title="Test" date="test" />
            <Card title="Test" date="test" />
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Berita;
