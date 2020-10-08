import { useEffect } from 'react';

const useOutside = (ref: any, callback: any) => {
  return useEffect(() => {
    const handleOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleOutside);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  });
};

export default useOutside;
