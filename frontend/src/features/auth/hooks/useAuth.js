import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login, signUp, logout, getMe } from '../services/auth.api';

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const data = await login({ email, password })
    setUser(data.user);
    setLoading(false);
  }

  const handleSignup = async ({ username, email, password }) => {
    setLoading(true);
    const data = await signUp({ username, email, password })
    setUser(data.user);
    setLoading(false);
  }

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  }

  return {
    user,
    loading,
    handleLogin,
    handleSignup,
    handleLogout,
  }


}