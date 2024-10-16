import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouteNavigator, useLocationSelector } from '@/hooks';
import { Typography } from '@/components/common/typography';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/common/loading-button';
import { Form } from '@/components/ui/form';
import TextField from '@/components/form/text-field';
import SearchSelect from '@/components/form/search-select';

const FormSchema = z.object({
  name: z.string().min(1, 'Store name is required.'),
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
  phone: z.string().min(1, 'Phone number is required.').min(10, 'Phone number should be at least 10 digits.'),
  address1: z.string().min(1, 'Address 1 is required.'),
  address2: z.string().optional(),
  country: z.string().min(1, 'Country is required.'),
  state: z.string().min(1, 'State is required.'),
  city: z.string().min(1, 'City is required.'),
  zipcode: z
    .string()
    .min(1, 'Zipcode is required.')
    .min(5, 'Zipcode must be at least 5 characters long.')
    .max(6, 'Zipcode cannot exceed 6 characters.'),
  mailboxCount: z.string().min(1, 'Mailbox count is required.'),
});

export type AddStoreInput = z.infer<typeof FormSchema>;

const AddStore = () => {
  const { goToPreviousRoute } = useRouteNavigator();

  const form = useForm<AddStoreInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      mailboxCount: '',
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

  const onSubmit: SubmitHandler<AddStoreInput> = async (values) => {
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
              Store
            </Typography>
          </Typography>
          <Typography variant="body-small">Please add store details</Typography>
        </div>
      </div>

      <section className="w-full rounded-2xl box-shadow p-4">
        <Typography variant="body" className="font-semibold">
          Store Details
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              <TextField name="name" control={form.control} label="Store name" placeholder="Enter store name" />
              <TextField name="email" control={form.control} label="Email" placeholder="Enter email" />
              <TextField
                type="number"
                name="phone"
                control={form.control}
                label="Phone No"
                placeholder="Enter phone number"
              />
              <TextField name="address1" control={form.control} label="Address 1" placeholder="Enter address line 1" />
              <TextField name="address2" control={form.control} label="Address 2" placeholder="Enter address line 2" />
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
              <TextField
                type="number"
                name="mailboxCount"
                control={form.control}
                label="Mailbox count"
                placeholder="Enter mailbox count"
              />
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
    </section>
  );
};

export default AddStore;
