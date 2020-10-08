import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Header,
  LoadingMessage,
  PageWrapper,
  Sidebar,
} from '../../components';
import { useQuery } from '../../hooks/use-query';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';
import { DataPengajuan } from '../pengajuan';

const PengajuanDetail = () => {
  const [dataPengajuan, setDataPengajuan] = useState<DataPengajuan | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const kategori = useQuery().get('kategori');

  useEffect(() => {
    (async () => {
      const { response } = await fetchRequest(
        `${urlServer}/submission/${kategori}?unique_code=${id}`
      );

      if (response?.status === 200) {
        const data = await response?.json();

        const pengajuan: DataPengajuan = data.data;

        if (pengajuan.status_code === 0) setStatus('Waiting');
        else if (pengajuan.status_code === 1) setStatus('On Process');
        else if (pengajuan.status_code === 2) setStatus('Rejected');
        else if (pengajuan.status_code === 3) setStatus('Accepted');

        pengajuan.created_at = new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }).format(new Date(pengajuan.created_at));

        setDataPengajuan(pengajuan);
      }
    })();
  }, [id, kategori]);

  const handleDownload = async () => {
    setLoading(true);

    const {
      isLoading,
      response,
    } = await fetchRequest(
      `${urlServer}/admin/media/private/download-submission?unique_code=${id}`,
      { method: 'POST' }
    );

    if (response?.status === 200) {
      const blob = await response.blob();
      let filename = `${id}.zip`;

      if (response.headers.get('content-disposition')) {
        // @ts-ignore
        filename = response.headers
          .get('content-disposition')
          .split(';')
          .find((n) => n.includes('filename='))
          .replace('filename=', '')
          .trim();
      }

      saveAs(blob, filename);
    }

    setLoading(isLoading);
  };

  return (
    <>
      {loading && <LoadingMessage />}
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="pengajuan-detail">
          <div className="breadcrumb mb-2">
            <div className="breadcrumb__link">
              <Link to="/pengajuan">Data Pengajuan</Link>
            </div>
            <div className="breadcrumb__separator">/</div>
            <div className="breadcrumb__current">{id}</div>
          </div>
          <h2 className="heading-secondary mb-3">Data Pengajuan</h2>
          <div className="pengajuan-detail__container">
            <div className="data-pengaju">
              <div className="data-pengaju__heading mb-2">Data Pengaju</div>
              <div className="data-pengaju__details">
                <div className="data-pengaju__key mb-1">Nama :</div>
                <div className="data-pengaju__value">
                  {dataPengajuan?.nama_kepala_keluarga ? (
                    dataPengajuan.nama_kepala_keluarga
                  ) : (
                    <div className="line-loading"></div>
                  )}
                </div>
              </div>
              <div className="data-pengaju__details">
                <div className="data-pengaju__key mb-1">Email :</div>
                <div className="data-pengaju__value">
                  {dataPengajuan ? (
                    dataPengajuan.email
                  ) : (
                    <div className="line-loading"></div>
                  )}
                </div>
              </div>
            </div>
            <div className="file-pengajuan">
              <div className="file-pengajuan__heading mb-2">File Pengajuan</div>
              <ul className="file-pengajuan__items">
                {dataPengajuan?.file
                  ? Object.values(dataPengajuan?.file).map((val) => {
                      return (
                        <li
                          key={val}
                          style={{ marginLeft: '3rem' }}
                          className="file-pengajuan__item mb-1"
                        >
                          {val}
                        </li>
                      );
                    })
                  : [1, 2, 3, 4].map((val) => (
                      <div
                        key={val}
                        style={{ width: '20rem', marginBottom: '1rem' }}
                        className="line-loading"
                      ></div>
                    ))}
              </ul>
              <Button onClick={handleDownload} className="mt-3">
                Download Files
              </Button>
            </div>
            <div className="info-pengajuan">
              <div className="info-pengajuan__heading mb-2">Info Pengajuan</div>
              <div className="info-pengajuan__details">
                <div className="info-pengajuan__key mb-1">Kategori :</div>
                <div
                  style={{ textTransform: 'capitalize' }}
                  className="info-pengajuan__value"
                >
                  {kategori?.split('-').join(' ')}
                </div>
              </div>
              <div className="info-pengajuan__details">
                <div className="info-pengajuan__key mb-1">Status :</div>
                <div className="info-pengajuan__value">
                  {dataPengajuan ? (
                    status
                  ) : (
                    <div className="line-loading"></div>
                  )}
                </div>
              </div>
              <div className="info-pengajuan__details">
                <div className="info-pengajuan__key mb-1">Kode Unik :</div>
                <div className="info-pengajuan__value">
                  {dataPengajuan?.unique_code ? (
                    dataPengajuan.unique_code
                  ) : (
                    <div className="line-loading"></div>
                  )}
                </div>
              </div>
              <div className="info-pengajuan__details">
                <div className="info-pengajuan__key mb-1">Dibuat pada :</div>
                <div className="info-pengajuan__value">
                  {dataPengajuan?.created_at ? (
                    dataPengajuan.created_at
                  ) : (
                    <div className="line-loading"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default PengajuanDetail;
