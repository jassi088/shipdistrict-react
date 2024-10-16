import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouteNavigator, useLocationSelector } from '@/hooks';
import CreateShipmentLayout from '@/features/layouts/create-shipment-layout';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import LoadingButton from '@/components/common/loading-button';
import TextField from '@/components/form/text-field';
import SearchSelect from '@/components/form/search-select';
import InputSelect from '@/components/form/input-select';
import { Paths } from '@/constants';

const FormSchema = z.object({
  name: z.string().optional(),
  companyName: z.string().optional(),
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
  address1: z.string().min(1, 'Address 1 is required.'),
  address2: z.string().optional(),
  address3: z.string().optional(),
  country: z.string().min(1, 'Country is required.'),
  state: z.string().min(1, 'State is required.'),
  city: z.string().min(1, 'City is required.'),
  zipcode: z
    .string()
    .min(1, 'Zipcode is required.')
    .min(5, 'Zipcode must be at least 5 characters long.')
    .max(6, 'Zipcode cannot exceed 6 characters.'),
  phone: z.string().min(1, 'Phone number is required.').min(10, 'Phone number should be at least 10 digits.'),
  isResidential: z.boolean(),
});

export type ReceiverDetailInput = z.infer<typeof FormSchema>;

const AddReceiverDetailPage = () => {
  const { goToRoute, goToPreviousRoute } = useRouteNavigator();

  const form = useForm<ReceiverDetailInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      address1: '',
      address2: '',
      address3: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      isResidential: false,
    },
  });

  const {
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    availableCountries,
    availableStates,
    availableCities,
  } = useLocationSelector();

  const onSubmit: SubmitHandler<ReceiverDetailInput> = async (values) => {
    console.log(values);
    goToRoute(Paths.CREATE_SHIPMENT + Paths.PACKAGE_INFORMATION);
  };

  return (
    <CreateShipmentLayout title="Receiver Address" progress={40}>
      <section className="w-full rounded-2xl box-shadow p-4">
        <Typography variant="body" className="font-semibold">
          Receiver Information
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputSelect
                name="name"
                control={form.control}
                label="Name"
                placeholder="Enter name"
                items={[{ label: 'Test', value: 'test' }]}
              />
              <TextField name="email" control={form.control} label="Email" placeholder="Enter email" />
              <TextField
                name="companyName"
                control={form.control}
                label="Company Name"
                placeholder="Enter company name"
              />
              <TextField name="address1" control={form.control} label="Address 1" placeholder="Enter address line 1" />
              <TextField name="address2" control={form.control} label="Address 2" placeholder="Enter address line 2" />
              <TextField name="address3" control={form.control} label="Address 2" placeholder="Enter address line 3" />
              <TextField
                type="number"
                name="phone"
                control={form.control}
                label="Phone No"
                placeholder="Enter phone number"
              />
              <SearchSelect
                name="country"
                control={form.control}
                label="Country"
                placeholder="Select Country"
                items={availableCountries}
                onChange={(value) => setSelectedCountry(value)}
              />
              <SearchSelect
                name="state"
                control={form.control}
                label="State"
                placeholder="Select state"
                items={availableStates}
                disabled={!form.watch('country')}
                onChange={(value) => setSelectedState(value)}
                inputable
              />
              <SearchSelect
                name="city"
                control={form.control}
                label="City"
                placeholder="Select city"
                items={availableCities}
                disabled={!form.watch('country') || !form.watch('state')}
                onChange={(value) => setSelectedCity(value)}
                inputable
              />
              <TextField name="zipcode" control={form.control} label="Zip Code" placeholder="Enter zip code" />
            </div>

            <div className="w-full flex justify-center items-center gap-x-4 mt-4">
              <Button className="w-32" type="button" onClick={goToPreviousRoute}>
                Verify Address
              </Button>
              <Button className="w-32" type="button" onClick={goToPreviousRoute}>
                Swap Addresses
              </Button>
            </div>

            <div className="w-full flex justify-center items-center gap-x-4 mt-4">
              <Button className="w-32" type="button" variant="outline" onClick={goToPreviousRoute}>
                Back
              </Button>
              <LoadingButton className="w-32">Next</LoadingButton>
            </div>
          </form>
        </Form>
      </section>
    </CreateShipmentLayout>
  );
};

export default AddReceiverDetailPage;
