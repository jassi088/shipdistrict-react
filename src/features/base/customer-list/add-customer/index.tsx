import { useEffect, useRef } from 'react';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/common/loading-button';
import TextField from '@/components/form/text-field';
import SearchSelect from '@/components/form/search-select';
import SelectField from '@/components/form/select-field';
import { useLocationSelector, useRouteNavigator } from '@/hooks';

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
  companyName: z.string().optional(),
  address1: z.string().min(1, 'Address 1 is required.'),
  address2: z.string().optional(),
  phone: z.string().min(1, 'Phone number is required.').min(10, 'Phone number should be at least 10 digits.'),
  country: z.string().min(1, 'Country is required.'),
  state: z.string().min(1, 'State is required.'),
  city: z.string().min(1, 'City is required.'),
  zipcode: z
    .string()
    .min(1, 'Zipcode is required.')
    .min(5, 'Zipcode must be at least 5 characters long.')
    .max(6, 'Zipcode cannot exceed 6 characters.'),
  accountType: z.string().min(1, 'Account Type is required.'),
});

export type AddSubAdminInput = z.infer<typeof FormSchema>;

const AddCustomer = () => {
  const formSectionRef = useRef<HTMLDivElement>(null);

  const { goToPreviousRoute } = useRouteNavigator();

  const form = useForm<AddSubAdminInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      companyName: '',
      address1: '',
      address2: '',
      phone: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      accountType: '',
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

  const onSubmit: SubmitHandler<AddSubAdminInput> = async (values) => {
    console.log(values);

    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    form.setValue('state', '');
    form.setValue('city', '');
  }, [form.watch('country')]);

  useEffect(() => {
    form.setValue('city', '');
  }, [form.watch('state')]);

  return (
    <section className="h-full w-full p-4 bg-whitesmoke" ref={formSectionRef}>
      <div className="relative h-32 w-full flex items-center justify-center">
        <img src="/svgs/logo.svg" width={160} className="absolute top-0 left-0" />
        <div className="flex flex-col justify-center items-center gap-2">
          <Typography variant="h1" className="font-semibold">
            Add New
            <Typography as="span" variant="h1" className="font-semibold text-primary">
              {' '}
              Customer
            </Typography>
          </Typography>
          <Typography variant="body-small">Enter details to add new customer</Typography>
        </div>
      </div>

      <section className="bg-white rounded-2xl box-shadow p-4">
        <Typography variant="body" className="font-semibold">
          Customer Details
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField name="name" control={form.control} label="Name" placeholder="Enter name" />
              <TextField name="email" control={form.control} label="Email" placeholder="Enter email" />
              <TextField
                name="companyName"
                control={form.control}
                label="Company Name"
                placeholder="Enter company name"
              />
              <TextField name="address1" control={form.control} label="Address 1" placeholder="Enter address line 1" />
              <TextField name="address2" control={form.control} label="Address 2" placeholder="Enter address line 2" />
              <TextField
                type="number"
                name="phone"
                control={form.control}
                label="Phone No"
                placeholder="Enter phone number"
              />
              <SelectField
                name="accountType"
                control={form.control}
                label="Account Type"
                placeholder="Select Account Type"
                options={[
                  { label: 'Mailbox', value: 'mailbox' },
                  { label: 'Shipment', value: 'shipment' },
                  { label: 'Both', value: 'both' },
                ]}
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
              <Button type="button" variant="outline" onClick={goToPreviousRoute}>
                Back
              </Button>
              <LoadingButton>Submit</LoadingButton>
            </div>
          </form>
        </Form>
      </section>
    </section>
  );
};

export default AddCustomer;
