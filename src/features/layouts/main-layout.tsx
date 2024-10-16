import { ReactNode } from 'react';
import Header from '@/features/shared/header';
import Sidebar from '@/features/shared/sidebar';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full flex">
      {/* Sidebar always visible */}
      <Sidebar />
      <div className="h-full w-full flex flex-col">
        <Header />
        <div className="w-full h-[calc(100%-56px)] bg-whitesmoke">
          <div className="h-full w-full overflow-auto no-scrollbar">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
