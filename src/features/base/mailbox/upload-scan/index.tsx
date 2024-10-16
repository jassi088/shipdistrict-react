import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDialogStore } from '@/stores';
import CustomDialog from '@/components/common/dialog';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import SelectField from '@/components/form/select-field';
import ScanUploader from './scan-uploader';
import { createGenericApi } from '@/http/generic-api';
import LoadingButton from '@/components/common/loading-button';

interface BulkImageUploadResult {
  urls: string[];
}

const UploadScanSchema = z.object({
  mailbox: z.string().min(1, 'Mailbox is required.'),
  labelType: z.string().min(1, 'Label type is required.'),
  labels: z.array(z.instanceof(File)).min(1, 'At least one file is required'),
});

export type UploadScanInput = z.TypeOf<typeof UploadScanSchema>;

const UploadScan = () => {
  const { onDialogChange } = useDialogStore();

  const api = createGenericApi<FormData, BulkImageUploadResult>('images');

  const form = useForm<UploadScanInput>({
    resolver: zodResolver(UploadScanSchema),
    defaultValues: { mailbox: '', labelType: '', labels: [] },
  });

  const onSubmit: SubmitHandler<UploadScanInput> = async (values) => {
    const formData = new FormData();

    // Ensure `values.labels` is an array of files
    if (Array.isArray(values.labels)) {
      values.labels.forEach((file) => {
        if (file instanceof File) {
          formData.append('files', file); // Append each file to FormData
        }
      });
    }

    try {
      const response = await api.uploadImages(formData, 'bulk/upload');
      console.log('Upload successful:', response);
      console.log({ mailbox: values.mailbox, labelType: values.labelType, labels: response.urls });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleCancel = () => {
    onDialogChange('upload-scan', false);
    form.reset();
  };

  return (
    <CustomDialog dialogKey="upload-scan">
      <section className="flex flex-col gap-y-4 w-md">
        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-semibold">
            Upload
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              scans
            </Typography>
          </Typography>
          <Typography variant="small">Upload scan in customer&apos;s mailbox</Typography>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" noValidate>
            <SelectField
              name="mailbox"
              control={form.control}
              placeholder="Select mailbox address"
              options={[
                { label: '#22 mailbox address', value: '#22 mailbox address' },
                { label: '#23 mailbox address', value: '#23 mailbox address' },
              ]}
            />
            <SelectField
              name="labelType"
              control={form.control}
              placeholder="Select label type"
              options={[
                { label: 'Mail', value: 'mail' },
                { label: 'Package', value: 'package' },
              ]}
            />
            <ScanUploader name="labels" control={form.control} />

            <div className="w-full flex items-center gap-x-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <LoadingButton>Send</LoadingButton>
            </div>
          </form>
        </Form>
      </section>
    </CustomDialog>
  );
};

export default UploadScan;
