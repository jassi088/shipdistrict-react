import { X } from 'lucide-react';
import { Typography } from '@/components/common/typography';
import { Progress } from '@/components/ui/progress';
import { Paths } from '@/constants';
import { useRouteNavigator } from '@/hooks';

interface Props {
  title: string;
  progress: number;
  children: React.ReactNode;
}

const CreateShipmentLayout = ({ title, progress, children }: Props) => {
  const { goToRoute } = useRouteNavigator();
  return (
    <section className="h-full w-full p-4 bg-whitesmoke">
      <div className="relative h-32 w-full flex items-center justify-center">
        <img src="/svgs/logo.svg" width={160} className="absolute top-0 left-0" />
        <div className="flex flex-col justify-center items-center gap-2">
          <Typography variant="h1">
            Create New
            <Typography as="span" variant="h1" className="text-primary">
              {' '}
              Shipment
            </Typography>
          </Typography>
          <Typography variant="body-small">Please add your shipment details</Typography>
        </div>

        <X className="absolute top-4 right-4 size-8" onClick={() => goToRoute(Paths.SHIPMENTS)} />
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <Typography variant="body">{title}</Typography>
          <Typography variant="body">{progress}%</Typography>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <section className="mt-4">{children}</section>
    </section>
  );
};

export default CreateShipmentLayout;
