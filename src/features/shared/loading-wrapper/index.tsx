import React from 'react';
import cn from '@/utils/cn';
import { useLoadingStore } from '@/stores';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const isLoading = useLoadingStore((state) => state.requestLoading);

  return (
    <div className="flex flex-col w-full h-full">
      {isLoading && (
        <div className="bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-gray-300 border-primary border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className={cn('flex-grow transition-opacity duration-300', {
          'opacity-50 blur-sm': isLoading,
          'opacity-100 blur-0': !isLoading,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default LoadingWrapper;
