import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDialogStore } from '@/stores';
import CustomDialog from '@/components/common/dialog';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import TextField from '@/components/form/text-field';
import { Button } from '@/components/ui/button';

const InviteCustomerSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
});

export type InviteCustomerInput = z.TypeOf<typeof InviteCustomerSchema>;

const InviteCustomer = () => {
  const { onDialogChange } = useDialogStore();

  const form = useForm<InviteCustomerInput>({
    resolver: zodResolver(InviteCustomerSchema),
    defaultValues: { email: '' },
  });

  const onSubmit: SubmitHandler<InviteCustomerInput> = async (values) => {
    console.log(values);
  };

  const handleCancel = () => {
    onDialogChange('invite', false);
    form.reset();
  };

  return (
    <CustomDialog dialogKey="invite">
      <section className="flex flex-col gap-y-4 w-sm">
        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-semibold">
            Invite
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              Customer
            </Typography>
          </Typography>
          <Typography variant="small">Invite customer to your workspace</Typography>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <TextField name="email" control={form.control} label="Email" placeholder="john@gmail.com" />
            <div className="w-full flex items-center gap-x-4 justify-end">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button>Send</Button>
            </div>
          </form>
        </Form>
      </section>
    </CustomDialog>
  );
};

export default InviteCustomer;
