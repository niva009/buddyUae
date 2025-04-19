'use client';

import { useSearchParams } from 'next/navigation';

export default function NotFoundComponent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error'); // Example usage

  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      {error && <p className="text-sm text-gray-500 mt-2">Error: {error}</p>}
    </div>
  );
}
