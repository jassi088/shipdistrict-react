import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouteNavigator } from '@/hooks';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/common/loading-button';
import { Form } from '@/components/ui/form';
import TextField from '@/components/form/text-field';
import SelectField from '@/components/form/select-field';

const FormSchema = z.object({
  planName: z.string().min(1, 'Plan name is required.'),
  planPrice: z.string().min(1, 'Plan price is required.'),
  scanCount: z.string().min(1, 'Scan count is required.'),
  duration: z.string().min(1, 'Duration is required'),

  additionalFee: z.object({
    packageReceiving: z.string().min(1, 'Package Receiving fee is required.'),
    packageConsolidation: z.string().min(1, 'Package Consolidation fee is required.'),
    overWeight: z.string().min(1, 'Overweight fee is required.'),
    mailStorage: z.string().min(1, 'Mail Storage fee is required.'),
    palletReceiving: z.string().min(1, 'Pallet Receiving fee is required.'),
    palletStorage: z.string().min(1, 'Pallet Storage fee is required.'),
    packageStorage: z.string().min(1, 'Package Storage fee is required.'),
  }),

  penaltyFee: z.object({
    wrongAddress: z.string().min(1, 'Wrong address penalty fee is required.'),
    late: z.string().min(1, 'Late penalty fee is required.'),
    reinstatement: z.string().min(1, 'Reinstatement penalty fee is required.'),
  }),
});

export type PlanFormInput = z.infer<typeof FormSchema>;

const AddPlan = () => {
  const { goToPreviousRoute } = useRouteNavigator();

  const form = useForm<PlanFormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      planName: '',
      planPrice: '',
      scanCount: '',
      duration: '',
      additionalFee: {
        packageReceiving: '',
        packageConsolidation: '',
        overWeight: '',
        mailStorage: '',
        palletReceiving: '',
        palletStorage: '',
        packageStorage: '',
      },
      penaltyFee: {
        wrongAddress: '',
        late: '',
        reinstatement: '',
      },
    },
  });

  const onSubmit: SubmitHandler<PlanFormInput> = async (values) => {
    console.log(values);
  };

  return (
    <section className="h-full w-full p-4 bg-whitesmoke">
      <div className="h-32 w-full flex items-center justify-center">
        <img src="/svgs/logo.svg" width={160} className="absolute top-0 left-0" />
        <div className="flex flex-col justify-center items-center gap-2">
          <Typography variant="h1">
            Add
            <Typography as="span" variant="h1" className="text-primary">
              {' '}
              Plan
            </Typography>
          </Typography>
          <Typography variant="body-small">Please add plan details</Typography>
        </div>
      </div>

      <section className="w-full rounded-2xl box-shadow p-4">
        <Typography variant="body" className="font-semibold">
          Sender Information
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField name="planName" control={form.control} label="Plan Name" placeholder="Enter plan name" />
              <TextField
                name="planPrice"
                type="number"
                control={form.control}
                label="Plan Price"
                placeholder="Enter plan price"
              />
              <TextField
                name="scanCount"
                type="number"
                control={form.control}
                label="Scan Count"
                placeholder="Enter scan count"
              />

              <SelectField
                name="duration"
                control={form.control}
                label="Duration"
                placeholder="Select duration"
                options={[
                  { label: 'Month', value: 'month' },
                  { label: 'Year', value: 'year' },
                ]}
              />
            </div>

            <div className="mt-4">
              <Typography variant="h3" className="mb-2">
                Additional Fees
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TextField
                  name="additionalFee.packageReceiving"
                  type="number"
                  control={form.control}
                  label="Package Receiving Fee"
                  placeholder="$10"
                />
                <TextField
                  name="additionalFee.packageConsolidation"
                  type="number"
                  control={form.control}
                  label="Package Consolidation Fee"
                  placeholder="$12"
                />
                <TextField
                  name="additionalFee.overWeight"
                  type="number"
                  control={form.control}
                  label="Overweight/Oversized Package (50-150 lbs) Receiving Fee"
                  placeholder="$8"
                />
                <TextField
                  name="additionalFee.mailStorage"
                  type="number"
                  control={form.control}
                  label="Mail Storage Fee"
                  placeholder="$14"
                />
                <TextField
                  name="additionalFee.palletReceiving"
                  type="number"
                  control={form.control}
                  label="Pallet Receiving Fee"
                  placeholder="$9"
                />
                <TextField
                  name="additionalFee.palletStorage"
                  type="number"
                  control={form.control}
                  label="Pallet Storage Fee"
                  placeholder="$16"
                />
                <TextField
                  name="additionalFee.packageStorage"
                  type="number"
                  control={form.control}
                  label="Package Storage Fee"
                  placeholder="$6"
                />
              </div>
            </div>

            <div className="mt-4">
              <Typography variant="h3" className="mb-2">
                Penalty Fees
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TextField
                  name="penaltyFee.wrongAddress"
                  type="number"
                  control={form.control}
                  label="Wrong Address Fee (Incorrect or Missing Mailbox Number)"
                  placeholder="$15"
                />
                <TextField
                  name="penaltyFee.reinstatement"
                  type="number"
                  control={form.control}
                  label="Reinstatement Fee (Termination after 14 days of non payment)"
                  placeholder="$20"
                />
                <TextField
                  name="penaltyFee.late"
                  type="number"
                  control={form.control}
                  label="Late Fee"
                  placeholder="$13"
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center gap-x-4 pt-4">
              <Button className="w-32" type="button" variant="outline" onClick={goToPreviousRoute}>
                Back
              </Button>
              <LoadingButton className="w-32">Next</LoadingButton>
            </div>
          </form>
        </Form>
      </section>
    </section>
  );
};

export default AddPlan;
