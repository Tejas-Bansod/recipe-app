// app/components/SkeletonCard.tsx
'use client'

export default function SkeletonCard() {
  return (
    <div className="card w-full bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden bg-base-200">
        <div className="absolute inset-0 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 text-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        {/* Favorite button skeleton */}
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-base-100/80"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="card-body p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex-grow space-y-2">
          <div className="skeleton h-5 w-3/4 rounded-md"></div>
          <div className="skeleton h-4 w-1/2 rounded-md"></div>
        </div>
        <div className="mt-4">
          <div className="skeleton h-9 w-full rounded-md"></div>
        </div>
      </div>
    </div>
  )
}
