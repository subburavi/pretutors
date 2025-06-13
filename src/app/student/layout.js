'use client';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import SideMenu from '@/components/SideMenu';

export default function RootLayout({ children }) {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Simulate loading check if needed
    if (user) {
      setCheckingAuth(false);
    } else {
      // You might want to redirect to login or wait if user state is still null
      setTimeout(() => setCheckingAuth(false), 500); // Delay just in case
    }
  }, [user]);

  if (checkingAuth) {
    return (
      <div className="p-10 text-center text-gray-500 font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (!user || user.role !== 'student') {
    return (
      <div className="p-10 text-center text-red-500 font-bold">
        🚫 Access Denied — You are not authorized to view this page.
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gray-50">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
           
        >
          <div className="flex space-x-6 h-full">
            <SideMenu />
         
              {children}
             
          </div>
        </div>
      </div>
    </>
  );
}
