import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input, LoadingMessage } from '../../components';
import { useQuery } from '../../hooks/use-query';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';

type LoginState = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [state, setState] = useState<LoginState>({
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [initPageLoading, setInitPageLoading] = useState<boolean>(true);
  const history = useHistory();
  const type = useQuery().get('type');

  useEffect(() => {
    if (type === 'logout') setInitPageLoading(false);

    setTimeout(async () => {
      const { response } = await fetchRequest(`${urlServer}/admin/accounts`);
      if (response?.status === 200) history.replace('/pengajuan');
      else setInitPageLoading(false);
    }, 1500);
  }, [history, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value.trim(),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error, isLoading, response } = await fetchRequest(
      `${urlServer}/login`,
      {
        method: 'POST',
        body: JSON.stringify(state),
      }
    );

    setLoading(isLoading);
    setState({
      username: '',
      password: '',
    });

    if (error) console.log(error);
    else if (response?.status === 401)
      alert('Maaf, Username atau password yang anda masukkan salah.');
    else {
      history.replace('/pengajuan');
    }
  };

  return (
    <>
      {loading && <LoadingMessage />}
      <div className="login-bg"></div>
      <div className="login">
        <div className="container max-width-1200">
          {initPageLoading ? (
            <LoadingMessage message="Mengecek status user anda, mohon tunggu sebentar." />
          ) : (
            <>
              {' '}
              <h2 className="heading-secondary mb-4">Teluk Jambe</h2>
              <form onSubmit={handleSubmit} className="form">
                <Input
                  autoComplete="off"
                  onChange={handleChange}
                  name="username"
                  required
                  type="text"
                  placeholder="Username"
                />
                <Input
                  autoComplete="off"
                  onChange={handleChange}
                  name="password"
                  required
                  type="password"
                  placeholder="Password"
                />
                <Button className="form__btn">Login</Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
