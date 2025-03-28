// import { Suspense } from 'react';
// import FinancialSection from '@/components/FinancialSection';
// import NewsSection from '@/components/NewsSection'; 
// import GeopoliticalSection from '@/components/GeopoliticalSection';
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

// export default function Home() {
//   return (
//     <main className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
//       {/* Financial Section - 1/3 width */}
//       <section className="w-1/3 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700">
//         <Suspense fallback={<LoadingSpinner />}>
//           <FinancialSection />
//         </Suspense>
//       </section>
      
//       {/* Financial News Section - 1/3 width */}
//       <section className="w-1/3 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700">
//         <Suspense fallback={<LoadingSpinner />}>
//           <NewsSection />
//         </Suspense>
//       </section>
      
//       {/* Geopolitical News Section - 1/3 width */}
//       <section className="w-1/3 h-full overflow-y-auto">
//         <Suspense fallback={<LoadingSpinner />}>
//           <GeopoliticalSection />
//         </Suspense>
//       </section>
//     </main>
//   );
// }

'use client';

import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Financial Dashboard</h1>
      <p>This is a test page</p>
    </div>
  );
}