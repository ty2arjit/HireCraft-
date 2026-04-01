import { useContext } from 'react';
import { AuthContext } from '../auth.context';
import { login, signUp, logout, getMe } from '../services/auth.api';

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try{
    const data = await login({ email, password })
    setUser(data.user);
    }catch(error){
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }

  }

  const handleSignup = async ({ username, email, password }) => {
    setLoading(true);
    try {
    const data = await signUp({ username, email, password })
    setUser(data.user);
    }catch(error){
      console.error('Signup failed:', error);
    }finally{
      setLoading(false);
    }
   
  }

  const handleLogout = async () => {
    setLoading(true);
    try {
    await logout();
    setUser(null);
    }catch(error){
      console.error('Logout failed:', error);
    } finally {
    setLoading(false);
    }
  }

  return {
    user,
    loading,
    handleLogin,
    handleSignup,
    handleLogout,
  }


}