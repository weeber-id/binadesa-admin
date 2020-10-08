export const fetchRequest = async (
  url: string,
  opt?: RequestInit | undefined
) => {
  let error;
  let response;
  let isLoading = true;
  try {
    const res = await fetch(url, {
      ...opt,
      credentials: 'include',
    });

    if (res.status === 400) error = 'Bad Request';
    else if (res.status === 401)
      error = 'Anda harus login untuk melakukan task ini.';
    else response = res;
  } catch (e) {
    error = e;
  }

  isLoading = false;

  return { error, response, isLoading };
};
