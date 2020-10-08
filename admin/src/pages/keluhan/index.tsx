import React, { useEffect, useState } from 'react';
import { Dropdown, Header, PageWrapper, Sidebar } from '../../components';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

type Complaint = {
  id: string;
  address: string;
  complaint: string;
  created_at: string;
  name: string;
  rt: string;
  rw: string;
};

const Keluhan = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    (async () => {
      const { response } = await fetchRequest(`${urlServer}/admin/complaints`);

      if (response?.status === 200) {
        const data = await response.json();
        setComplaints(data.data);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="keluhan">
          <div className="table">
            <div className="table__info">
              <h3 className="heading-tertiary">Data Keluhan</h3>
              <Dropdown
                style={{ minWidth: '25rem' }}
                options={['Akta Kelahiran']}
                placeholder="Sort by"
              />
            </div>
            <div className="table__head">
              <div className="table__column">Nama</div>
              <div className="table__column">Alamat</div>
              <div className="table__column">Keluhan</div>
              <div className="table__column">Status</div>
            </div>
            <div className="container">
              <div className="table__body">
                {complaints.length > 0
                  ? complaints.map((val) => {
                      return (
                        <div key={val.id} className="table__row">
                          <div className="table__column">{val.name}</div>
                          <div className="table__column">{val.address}</div>
                          <div className="table__column">{val.complaint}</div>
                          <div className="table__column">Unread</div>
                        </div>
                      );
                    })
                  : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => {
                      return (
                        <div key={val} className="table__row">
                          <div className="table__column table__column--loading"></div>
                          <div className="table__column table__column--loading"></div>
                          <div className="table__column table__column--loading"></div>
                          <div className="table__column table__column--loading"></div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Keluhan;
