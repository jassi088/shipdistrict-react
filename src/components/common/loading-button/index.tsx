import { Button } from '@/components/ui/button';
import { useLoadingStore } from '@/stores/loading';
import cn from '@/utils/cn';

interface LoadingButtonProps {
  children: string;
  className?: string;
  onClick?: (event: React.FormEvent) => Promise<void>;
}

const LoadingButton = ({ children, className, onClick }: LoadingButtonProps) => {
  const isLoading = useLoadingStore((state) => state.requestLoading);
  return (
    <Button disabled={isLoading} onClick={onClick} className={className}>
      {children}
      <span
        className={cn({
          'ml-2 w-5 h-5 border-2 border-white border-transparent border-b-white rounded-full inline-block animate-spin':
            isLoading,
        })}
      />
    </Button>
  );
};

export default LoadingButton;
