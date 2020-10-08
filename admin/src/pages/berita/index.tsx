import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Header,
  PageWrapper,
  Pagination,
  Sidebar,
} from '../../components';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

type News = {
  id: string;
  created_at: string;
  title: string;
  image_cover: string;
  content: string;
};

const Berita = () => {
  const [news, setNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const { response } = await fetchRequest(
        `${urlServer}/news?page=${currentPage}&content_per_page=12`
      );

      if (response?.status === 200) {
        const data = await response.json();
        setMaxPage(data.max_page);
        setNews(data.data);
      }
    })();
  }, [currentPage]);

  return (
    <>
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="berita">
          <Button color="green">Tambahkan Artikel</Button>
          <div className="cards">
            {news.length > 0
              ? news.map((val) => {
                  const date = new Intl.DateTimeFormat('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(val.created_at));

                  return (
                    <Card
                      title={val.title}
                      description={val.content}
                      date={date}
                      img={val.image_cover}
                      key={val.id}
                    />
                  );
                })
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val) => {
                  return <Card key={`card-${val}`} isLoading />;
                })}
          </div>
          <Pagination
            className="berita__pagination"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
          />
        </div>
      </PageWrapper>
    </>
  );
};

export default Berita;
