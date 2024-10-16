import { useRouteNavigator } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Paths } from '@/constants';
import { strings } from '@/utils/helpers';

const SuperAdminPlans = () => {
  const { goToRoute } = useRouteNavigator();
  return (
    <section className="w-full h-full">
      <div className="w-full flex justify-end gap-x-2">
        <Button onClick={() => goToRoute(strings.normalizeRoute(Paths.ADD_PLAN))}>Add Plan</Button>
        <Button>Add Topup</Button>
      </div>
    </section>
  );
};

export default SuperAdminPlans;
