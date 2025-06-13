'use client';

import DashboardHeader from "@/components/DashboardHeader";

 
export default function RootLayout({ children }) {
  return (
    <>
    <DashboardHeader />
              {children}
     </>      
  );
}
