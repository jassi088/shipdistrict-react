import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-gray-300 border-primary border-solid rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default Spinner;
