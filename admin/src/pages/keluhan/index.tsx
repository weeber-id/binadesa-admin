import React from 'react';
import { Dropdown, Header, PageWrapper, Sidebar } from '../../components';

const Keluhan = () => {
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
                <div className="table__row">
                  <div className="table__column">Suparman</div>
                  <div className="table__column">08986956006</div>
                  <div className="table__column">Akta Kelahiran</div>
                  <div className="table__column">On Process</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default Keluhan;
