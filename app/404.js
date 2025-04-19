import { Suspense } from 'react';
import NotFoundComponent from '../components/NotFoundComponent';

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <NotFoundComponent />
    </Suspense>
  );
}
