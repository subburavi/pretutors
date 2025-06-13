import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PageLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return loading ? (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50" />
  ) : null;
}
