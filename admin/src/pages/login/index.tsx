import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Input, LoadingMessage } from '../../components';
import { fetchRequest } from '../../hooks/use-request';
import { urlServer } from '../../utils/urlServer';
import Cookies from 'js-cookie';

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
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get('admin_token');

    if (token) history.replace('/pengajuan');
  }, [history]);

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
      // if (process.env.NODE_ENV === 'development') {
      //   const token = (await response?.json()).data.access_token;
      //   Cookies.set('admin_token', token);
      // }
      history.replace('/pengajuan');
    }
  };

  return (
    <>
      {loading && <LoadingMessage />}
      <div className="login-bg"></div>
      <div className="login">
        <div className="container max-width-1200">
          <h2 className="heading-secondary mb-4">Teluk Jambe</h2>
          <form onSubmit={handleSubmit} className="form">
            <Input
              autoComplete="username"
              onChange={handleChange}
              name="username"
              required
              type="text"
              placeholder="Username"
            />
            <Input
              autoComplete="password"
              onChange={handleChange}
              name="password"
              required
              type="password"
              placeholder="Password"
            />
            <Button className="form__btn">Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
