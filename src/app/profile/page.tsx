'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Dashboard from '@/app/components/Profile/Dashboard';
import OrderHistory from '@/app/components/Profile/OrderHistory';
import ShippingAddress from '@/app/components/Profile/ShippingAddress';
import AccountDetails from '@/app/components/Profile/AccountDetails';
import { Button } from '@/app/components/ui/button';
import FeaturedProducts from '@/app/components/FeaturedProducts';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!token) {
      router.push('/');
    }
  }, [router]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Order History' },
    { id: 'shipping', label: 'Shipping Address' },
    { id: 'account', label: 'Account Details' },
  ];

  return (
    <div className="min-h-screen main-content text-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              className="relative"
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 h-0.5 bg-primary bottom-0"
                />
              )}
            </Button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'orders' && <OrderHistory />}
          {activeTab === 'shipping' && <ShippingAddress />}
          {activeTab === 'account' && <AccountDetails />}
        </motion.div>
      </motion.div>

      {activeTab === 'dashboard' && (
        <div className="mb-8">
          <FeaturedProducts name="Must-Have Styles" noOfSlides={3} />
        </div>
      )}

    </div>
  );
};

export default ProfilePage;