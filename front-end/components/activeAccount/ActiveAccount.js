'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { handleActiveAccount } from '@/redux/slices/auth/active_account';

export default function ActiveAccount() {
  const { accountId, activeAccountId } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { activeAccount, loading, error } = useSelector((state) => state.active);

  useEffect(() => {
    dispatch(handleActiveAccount({ accountId, activeAccountId }));
  }, [dispatch, accountId, activeAccountId]);

  useEffect(() => {
    if (activeAccount && !loading && !error) {
      const timer = setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeAccount, loading, error, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {loading && (
        <div
          className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          aria-label="loading"
        />
      )}
      {error && (
        <p className="text-red-600 font-medium">
          {error.message || 'حدث خطأ، يرجى المحاولة مرة أخرى.'}
        </p>
      )}
      {activeAccount && !loading && !error && (
        <p className="text-green-600 font-semibold">تم تفعيل الحساب بنجاح! جاري التحويل...</p>
      )}
    </div>
  );
}
