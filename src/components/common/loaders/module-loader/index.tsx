import cn from '@/utils/cn';
import './index.scss';

interface ModuleLoaderProps {
  size?: 'full' | 'screen';
}

const ModuleLoader = ({ size = 'full' }: ModuleLoaderProps) => {
  return (
    <div className={cn('flex justify-center items-center z-10', `h-${size}`)}>
      <div className="relative flex justify-center items-center">
        <div className="loader" />
      </div>
    </div>
  );
};

export default ModuleLoader;
