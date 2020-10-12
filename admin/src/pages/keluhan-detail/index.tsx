import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header, PageWrapper, Sidebar } from '../../components';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

type ComplaintDetail = {
  id: string;
  complaint: string;
  address: string;
  name: string;
  is_read: boolean;
  created_at: string;
};

const KeluhanDetail = () => {
  const { state } = useLocation<ComplaintDetail>();
  const { id, complaint, address, name, is_read, created_at } = state;

  useEffect(() => {
    (async () => {
      if (!is_read) {
        await fetchRequest(`${urlServer}/admin/complaints/read_status`, {
          method: 'POST',
          body: JSON.stringify({
            ids: [id],
            is_read: true,
          }),
        });
      }
    })();
  }, [id, is_read]);

  return (
    <>
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="keluhan-detail">
          <div className="breadcrumb mb-2">
            <div className="breadcrumb__link">
              <Link to="/keluhan">Keluhan</Link>
            </div>
            <div className="breadcrumb__separator">/</div>
            <div className="breadcrumb__current">{id}</div>
          </div>
          <h2 className="heading-secondary mb-3">Data Keluhan</h2>
          <div className="keluhan-detail__container">
            <div className="data-pengeluh">
              <h3 className="heading-tertiary mb-1">{name}</h3>
              <p className="paragraph mb-1">
                {new Intl.DateTimeFormat('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                }).format(new Date(created_at))}
              </p>
              <p className="paragraph">{address}</p>
              <p className="paragraph">
                Telukjambe, Kec. Telukjambe Tim., Kabupaten Karawang,
              </p>
              <p className="paragraph">Jawa Barat 41361.</p>
            </div>
            <div className="data-keluhan">
              <div className="data-keluhan__container">
                <div className="data-keluhan__card">
                  <p className="paragraph">{complaint}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default KeluhanDetail;
