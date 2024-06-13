import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { setUser, setToken, clearAuth } from '@/redux/auth/auth.slice';

const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
 
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
       
        const response = await fetch('/api/auth/session', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setUser(data.user));
        } else {
          dispatch(clearAuth());
        }
      } catch (error) {
        dispatch(clearAuth());
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token, dispatch]);

  return { user, loading };
};

export default useAuthSession;
