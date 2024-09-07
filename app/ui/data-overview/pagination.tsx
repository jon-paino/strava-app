'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={clsx(
          'flex h-10 w-10 items-center justify-center rounded-md border',
          { 'pointer-events-none text-gray-300': currentPage <= 1 }
        )}
      >
        <ArrowLeftIcon className="w-4" />
      </button>

      {allPages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={clsx(
            'flex h-10 w-10 items-center justify-center border',
            {
              'bg-blue-600 text-white': currentPage === page,
              'hover:bg-gray-100': currentPage !== page && page !== '...',
              'text-gray-300 pointer-events-none': page === '...',
            }
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={clsx(
          'flex h-10 w-10 items-center justify-center rounded-md border',
          { 'pointer-events-none text-gray-300': currentPage >= totalPages }
        )}
      >
        <ArrowRightIcon className="w-4" />
      </button>
    </div>
  );
}
