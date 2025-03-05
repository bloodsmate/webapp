import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/redux/store';
import { checkAuth } from '@/app/redux/authSlice';
import FeaturedProducts from '@/app/components/FeaturedProducts'

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading: authLoading, error: authError } = useSelector((state: RootState) => state.auth);

    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    useEffect(() => {
        if (token && !user?.id) {
        dispatch(checkAuth());
        }
    }, [token, user, dispatch]);

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <p className="text-gray-600 mb-6">
            Welcome back, {user?.name || 'User'}! Here's a quick overview of your account.
        </p>
        <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured Products</h3>
            <FeaturedProducts />
        </div>
      </div>
    );
  };
  
  export default Dashboard;