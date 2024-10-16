import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDialogStore } from '@/stores';
import CustomDialog from '@/components/common/dialog';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import TextField from '@/components/form/text-field';
import { Button } from '@/components/ui/button';
import SelectField from '@/components/form/select-field';

const MoveMailboxSchema = z.object({
  store: z.string().min(1, 'Store is required.'),
  mailboxNumber: z.string().min(1, 'Mailbox number is required.'),
  address: z.string().min(1, 'Mailbox number is required.'),
});

export type MoveMailboxInput = z.TypeOf<typeof MoveMailboxSchema>;

const MoveMailbox = () => {
  const { onDialogChange } = useDialogStore();

  const form = useForm<MoveMailboxInput>({
    resolver: zodResolver(MoveMailboxSchema),
    defaultValues: { store: '', mailboxNumber: '', address: '' },
  });

  const onSubmit: SubmitHandler<MoveMailboxInput> = async (values) => {
    console.log(values);
  };

  const handleCancel = () => {
    onDialogChange('move-mailbox', false);
    form.reset();
  };

  return (
    <CustomDialog dialogKey="move-mailbox">
      <section className="flex flex-col gap-y-4 w-md">
        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-semibold">
            Move
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              Mailbox
            </Typography>
          </Typography>
          <Typography variant="small">Select store to shift mailbox account</Typography>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <SelectField
              name="store"
              control={form.control}
              placeholder="Select store"
              options={[
                { label: 'Sd store', value: 'sd store' },
                { label: 'Chandigarh store', value: 'chandigarh store' },
              ]}
            />
            <SelectField
              name="mailboxNumber"
              control={form.control}
              placeholder="Select label type"
              options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
              ]}
            />
            <TextField name="address" control={form.control} label="Mailbox address" placeholder="#22 street" />
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

export default MoveMailbox;
