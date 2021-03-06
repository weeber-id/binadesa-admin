import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconCancel, IconChecklist, IconEdit, IconSearch } from '../../assets';
import {
  Button,
  Dropdown,
  Header,
  Input,
  LoadingMessage,
  PageWrapper,
  Sidebar,
} from '../../components';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

export type DataPengajuan = {
  email: string;
  id: string;
  nama_kepala_keluarga: string;
  status_code: number;
  kategori: string;
  unique_code: string;
  created_at: string;
  file: { [key: string]: string };
  nama: string;
  tipe?: string;
};

const Pengajuan = () => {
  const [dataPengajuan, setDataPengajuan] = useState<DataPengajuan[]>([]);
  const [dataPengajuanStatic, setDataPengajuanStatic] = useState<
    DataPengajuan[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>('');
  const [statusCode, setStatusCode] = useState<number>(-1);
  const [kategori, setKategori] = useState<string>('');
  const [defaultValue, setDefaultValue] = useState<string>('');

  const options = ['Waiting', 'On Process', 'Rejected', 'Accepted'];

  const history = useHistory();

  useEffect(() => {
    (async () => {
      let pengajuan: DataPengajuan[] = [];
      const kk = fetchRequest(`${urlServer}/admin/submission/kartu-keluarga`);
      const akta = fetchRequest(`${urlServer}/admin/submission/akta-kelahiran`);
      const sk = fetchRequest(`${urlServer}/admin/submission/surat-keterangan`);

      Promise.all([kk, akta, sk]).then(async (values) => {
        for (let i = 0; i < values.length; i++) {
          if (values[i].response?.status === 200) {
            const res = await values[i].response?.json();

            const d = res.data?.map((data: DataPengajuan) => {
              if (i === 0) data.kategori = 'Kartu Keluarga';
              else if (i === 1) data.kategori = 'Akta Kelahiran';
              else data.kategori = 'Surat Keterangan';

              return data;
            });
            if (d) pengajuan = pengajuan.concat(d);
          }
        }

        const sortedPengajuan = pengajuan.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);

          if (dateA > dateB) {
            return -1;
          }
          if (dateB < dateA) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });

        setLoading(false);
        setDataPengajuan(sortedPengajuan);
        setDataPengajuanStatic(sortedPengajuan);
      });
    })();
  }, []);

  const handleEdit = (id: string, statusCode: number, kategori: string) => {
    setEdit(id);
    setStatusCode(statusCode);
    setKategori(kategori);
    setDefaultValue(options[statusCode]);
  };

  const handleCancel = () => {
    setEdit('');
    setStatusCode(-1);
  };

  const handleChange = (val: string) => {
    if (val === 'Waiting') setStatusCode(0);
    else if (val === 'On Process') setStatusCode(1);
    else if (val === 'Rejected') setStatusCode(2);
    else setStatusCode(3);

    setDefaultValue(val);
  };

  const handleSubmit = async () => {
    setEditLoading(true);
    const body = JSON.stringify({
      status: `${statusCode}`,
    });

    const { response, isLoading } = await fetchRequest(
      `${urlServer}/admin/submission/${kategori}/update?unique_code=${edit}`,
      {
        method: 'POST',
        body,
      }
    );
    setEditLoading(isLoading);
    if (response?.status === 200) window.location.reload();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let dp: DataPengajuan[] = JSON.parse(JSON.stringify(dataPengajuanStatic));

    // let j = 0;
    // for (let i = 0; i < sortedDataPengajuan.length; i++) {
    //   if (sortedDataPengajuan[i].kategori === val) {
    //     sortedDataPengajuan.splice(j, 0, sortedDataPengajuan[i]);
    //     sortedDataPengajuan.splice(i + 1, 1);

    //     j++;
    //   }
    // }

    const filteredDataPengajuan = dp.filter((val) =>
      val.unique_code.toLowerCase().includes(value.toLowerCase())
    );

    setDataPengajuan(filteredDataPengajuan);
  };

  return (
    <>
      {editLoading && <LoadingMessage />}
      <Header />
      <Sidebar />
      <PageWrapper>
        <div className="data-pengajuan">
          <div className="table">
            <div className="table__info">
              <h3 className="heading-tertiary">Data Pengajuan</h3>
              <Input
                onChange={handleSearch}
                IconBack={IconSearch}
                type="text"
                placeholder="Cari Berdasar Kode Unik"
              />
            </div>
            <div className="table__head">
              <div className="table__column">ID</div>
              <div className="table__column">Nama</div>
              <div className="table__column">Tanggal</div>
              <div className="table__column">Kategori</div>
              <div className="table__column">Status</div>
              <div className="table__column">Edit</div>
              <div className="table__column">View</div>
            </div>
            <div className="container">
              <div className="table__body">
                {!loading
                  ? dataPengajuan.map((val) => {
                      let status = '';
                      if (val.status_code === 0) status = 'Waiting';
                      else if (val.status_code === 1) status = 'On Process';
                      else if (val.status_code === 2) status = 'Rejected';
                      else status = 'Accepted';

                      return (
                        <div key={val.id} className="table__row">
                          <div className="table__column">{val.unique_code}</div>
                          <div className="table__column">{val.nama}</div>
                          <div className="table__column">
                            {new Intl.DateTimeFormat('id-ID').format(
                              new Date(val.created_at)
                            )}
                          </div>
                          <div className="table__column">{val.kategori}</div>
                          <div className="table__column table__column--non-overflow">
                            {edit === val.unique_code ? (
                              <Dropdown
                                onChangeOptions={handleChange}
                                options={options}
                                value={defaultValue}
                                placeholder={status}
                              />
                            ) : (
                              status
                            )}
                          </div>
                          <div className="table__column">
                            {edit === val.unique_code ? (
                              <div className="icons">
                                <div
                                  onClick={handleSubmit}
                                  className="icon-wrapper"
                                >
                                  <IconChecklist />
                                </div>
                                <div
                                  onClick={() => handleCancel()}
                                  className="icon-wrapper"
                                >
                                  <IconCancel />
                                </div>
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  handleEdit(
                                    val.unique_code,
                                    val.status_code,
                                    val.kategori
                                      .toLowerCase()
                                      .split(' ')
                                      .join('-')
                                  )
                                }
                                className="icon-wrapper"
                              >
                                <IconEdit />
                              </div>
                            )}
                          </div>
                          <div className="table__column">
                            <Button
                              onClick={() =>
                                history.push(
                                  `/pengajuan/${
                                    val.unique_code
                                  }?kategori=${val.kategori
                                    .toLowerCase()
                                    .split(' ')
                                    .join('-')}`
                                )
                              }
                              color="green"
                            >
                              Detail
                            </Button>
                          </div>
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

export default Pengajuan;
