// import { useDialogStore } from '@/stores';
import CustomDialog from '@/components/common/dialog';
import { Typography } from '@/components/common/typography';
// import { Button } from '@/components/ui/button';

const GivePlan = () => {
  //   const { onDialogChange } = useDialogStore();

  return (
    <CustomDialog dialogKey="give-plan">
      <section className="flex flex-col gap-y-4 w-2xl">
        <div className="flex flex-col items-center gap-2">
          <Typography variant="h2" className="font-semibold">
            Select
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              Plan
            </Typography>
          </Typography>
          <Typography variant="small">Please select your plan.</Typography>
        </div>
      </section>
    </CustomDialog>
  );
};

export default GivePlan;
