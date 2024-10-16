import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouteNavigator } from '@/hooks';
import CreateShipmentLayout from '@/features/layouts/create-shipment-layout';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import LoadingButton from '@/components/common/loading-button';
import TextField from '@/components/form/text-field';
import InputSelect from '@/components/form/input-select';
import SelectField from '@/components/form/select-field';

const FormObject = z.object({
  name: z.string().optional(),
  packageType: z.string().min(1, 'Package type is required.'),
  unit: z.string().min(1, 'Unit is required.'),
  weight: z.union([z.number().min(1, 'Weight is required.'), z.string().min(1, 'Weight is required')]),
  dimensionUnit: z.string().min(1, 'Dimension unit is required.'),
  insurance: z.string().optional(),
  description: z.string().optional(),
  length: z.string().min(1, 'Length is required.'),
  width: z.string().min(1, 'Width is required.'),
  height: z.string().min(1, 'Height is required.'),
});

const FormSchema = z.object({
  packages: z.array(FormObject),
});

export type PackageInformationInput = z.infer<typeof FormSchema>;

const PackageInformationPage = () => {
  const { goToRoute, goToPreviousRoute } = useRouteNavigator();

  const form = useForm<PackageInformationInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      packages: [
        {
          name: '',
          packageType: '',
          unit: '',
          weight: '',
          dimensionUnit: '',
          insurance: '',
          description: '',
          length: '',
          width: '',
          height: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'packages',
  });

  const packageOptions = packages.map((pkg) => ({
    label: pkg.package_name,
    value: pkg.package_type,
  }));

  const handlePackageTypeChange = (index: number, packageType?: string) => {
    const selectedPackage = packages.find((pkg) => pkg.package_type === packageType);
    const selectedDimension = dimensions.find((dim) => dim.PackageType === packageType);

    if (selectedPackage?.package_type === 'YOUR_PACKAGING') {
      form.setValue(`packages.${index}.length`, '');
      form.setValue(`packages.${index}.width`, '');
      form.setValue(`packages.${index}.height`, '');
    } else {
      form.clearErrors([
        `packages.${index}.length`,
        `packages.${index}.width`,
        `packages.${index}.height`,
        `packages.${index}.dimensionUnit`,
      ]);
      if (selectedDimension) {
        form.setValue(`packages.${index}.dimensionUnit`, 'inch');
        form.setValue(`packages.${index}.length`, selectedDimension.inch.length);
        form.setValue(`packages.${index}.width`, selectedDimension.inch.width);
        form.setValue(`packages.${index}.height`, selectedDimension.inch.height);
      }
    }
  };

  const handleUnitChange = (index: number, unit?: string) => {
    const packageType = form.watch(`packages.${index}.packageType`);
    const selectedDimension = dimensions.find((dim) => dim.PackageType === packageType);

    if (selectedDimension) {
      if (unit === 'cm') {
        form.setValue(`packages.${index}.length`, selectedDimension.cm.length);
        form.setValue(`packages.${index}.width`, selectedDimension.cm.width);
        form.setValue(`packages.${index}.height`, selectedDimension.cm.height);
      } else if (unit === 'inch') {
        form.setValue(`packages.${index}.length`, selectedDimension.inch.length);
        form.setValue(`packages.${index}.width`, selectedDimension.inch.width);
        form.setValue(`packages.${index}.height`, selectedDimension.inch.height);
      }
    }
  };

  const handleAddPackage = () => {
    append({
      name: '',
      packageType: '',
      unit: '',
      weight: '',
      dimensionUnit: '',
      insurance: '',
      description: '',
      length: '',
      width: '',
      height: '',
    });
  };

  const handleRemovePackage = (index: number) => {
    remove(index);
  };

  const onSubmit: SubmitHandler<PackageInformationInput> = async (values) => {
    console.log(values);
    goToRoute('');
  };

  return (
    <CreateShipmentLayout title="Package Information" progress={60}>
      <section className="w-full rounded-2xl box-shadow p-4">
        <Typography variant="body" className="font-semibold">
          Package Information
        </Typography>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputSelect
                  name={`packages.${index}.name`}
                  control={form.control}
                  label="Name"
                  placeholder="Enter name"
                  items={[{ label: 'Test', value: 'test' }]}
                />

                <SelectField
                  name={`packages.${index}.packageType`}
                  control={form.control}
                  label="Package Type"
                  placeholder="Package Type"
                  options={packageOptions}
                  onChange={(value) => handlePackageTypeChange(index, value)}
                />
                <SelectField
                  name={`packages.${index}.unit`}
                  control={form.control}
                  label="Unit"
                  placeholder="Unit"
                  options={[
                    { label: 'KG', value: 'kg' },
                    { label: 'LBS', value: 'lbs' },
                  ]}
                />
                <TextField
                  name={`packages.${index}.weight`}
                  type="number"
                  control={form.control}
                  label="Weight"
                  placeholder="Kg/Lbs"
                />

                <SelectField
                  name={`packages.${index}.dimensionUnit`}
                  control={form.control}
                  label="Dimension Unit"
                  placeholder="inch/cm"
                  options={[
                    { label: 'Inch', value: 'inch' },
                    { label: 'CM', value: 'cm' },
                  ]}
                  onChange={(value) => handleUnitChange(index, value)}
                />
                <TextField
                  name={`packages.${index}.length`}
                  type="number"
                  control={form.control}
                  label="Length"
                  placeholder="Length"
                  disabled={form.getValues(`packages.${index}.packageType`) !== 'YOUR_PACKAGING'}
                />
                <TextField
                  name={`packages.${index}.width`}
                  type="number"
                  control={form.control}
                  label="Width"
                  placeholder="Width"
                  disabled={form.getValues(`packages.${index}.packageType`) !== 'YOUR_PACKAGING'}
                />
                <TextField
                  name={`packages.${index}.height`}
                  type="number"
                  control={form.control}
                  label="Height"
                  placeholder="Height"
                  disabled={form.getValues(`packages.${index}.packageType`) !== 'YOUR_PACKAGING'}
                />
                <TextField
                  name={`packages.${index}.insurance`}
                  control={form.control}
                  label="Insurance"
                  placeholder="Insurance"
                />
                <TextField
                  name={`packages.${index}.description`}
                  control={form.control}
                  label="Content Description"
                  placeholder="Content Description"
                />

                {form.getValues('packages').length > 1 && index !== 0 && (
                  <div className="col-span-1 md:col-span-2 w-full flex justify-end items-end gap-x-4">
                    <Button className="w-32" type="button" onClick={() => handleRemovePackage(index)}>
                      Remove Package
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <div className="w-full flex justify-center items-center gap-x-4 mt-4">
              <Button className="w-32" type="button" onClick={handleAddPackage}>
                + Add Package
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

export default PackageInformationPage;

const packages = [
  {
    package_type: 'YOUR_PACKAGING',
    carrierType: 'fedex',
    package_name: 'Your Packaging',
    enumeration: 'Customer Packaging, FedEx Express® Services',
    max_weight_kg: 68,
    max_weight_lbs: 150,
  },
  {
    package_type: 'FEDEX_ENVELOPE',
    carrierType: 'fedex',
    package_name: 'FedEx Envelope',
    enumeration: 'FedEx® Letters',
    max_weight_kg: 0.5,
    max_weight_lbs: 1,
  },
  {
    package_type: 'FEDEX_SMALL_BOX',
    carrierType: 'fedex',
    package_name: 'FedEx Small Box',
    enumeration: 'FedEx® Small Box',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: 'FEDEX_MEDIUM_BOX',
    carrierType: 'fedex',
    package_name: 'FedEx Medium Box',
    enumeration: 'FedEx® Medium Box',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: 'FEDEX_LARGE_BOX',
    carrierType: 'fedex',
    package_name: 'FedEx Large Box',
    enumeration: 'FedEx® Large Box',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: 'FEDEX_EXTRA_LARGE_BOX',
    carrierType: 'fedex',
    package_name: 'FedEx Extra Large Box',
    enumeration: 'FedEx® Extra Large Box',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: 'FEDEX_PAK',
    carrierType: 'fedex',
    package_name: 'FedEx Pak',
    enumeration: 'FedEx® Pak',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: 'FEDEX_TUBE',
    carrierType: 'fedex',
    package_name: 'FedEx Tube',
    enumeration: 'FedEx® Tube',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: '01',
    carrierType: 'ups',
    package_name: 'UPS Letter',
    enumeration: 'UPS Letter',
    max_weight_kg: 1,
    max_weight_lbs: 1,
  },
  {
    package_type: '03',
    carrierType: 'ups',
    package_name: 'UPS Tube',
    enumeration: 'Tube',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: '04',
    carrierType: 'ups',
    package_name: 'UPS Pak',
    enumeration: 'Pak',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: '2a',
    carrierType: 'ups',
    package_name: 'UPS Small Express Box',
    enumeration: 'Small Express Box',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: '2b',
    carrierType: 'ups',
    package_name: 'UPS Medium Express Box',
    enumeration: 'Medium Express Box',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
  {
    package_type: '2c',
    carrierType: 'ups',
    package_name: 'UPS Large Express Box',
    enumeration: 'Large Express Box',
    max_weight_kg: 9,
    max_weight_lbs: 20,
  },
];

const dimensions = [
  {
    PackageType: 'FEDEX_ENVELOPE',
    inch: { length: '1', height: '1', width: '1' },
    cm: { length: '1', height: '1', width: '1' },
  },
  {
    PackageType: 'FEDEX_SMALL_BOX',
    inch: { length: '8.75', height: '2.69', width: '11.45' },
    cm: { length: '22.23', height: '6.83', width: '28.73' },
  },
  {
    PackageType: 'FEDEX_MEDIUM_BOX',
    inch: { length: '8.75', height: '4.38', width: '11.45' },
    cm: { length: '22.23', height: '11.11', width: '28.73' },
  },
  {
    PackageType: 'FEDEX_LARGE_BOX',
    inch: { length: '9.5', height: '7.75', width: '15.5' },
    cm: { length: '22.23', height: '19.69', width: '28.73' },
  },
  {
    PackageType: 'FEDEX_EXTRA_LARGE_BOX',
    inch: { length: '11.88', height: '10.81', width: '11.06' },
    cm: { length: '30.16', height: '27.46', width: '28.10' },
  },
  {
    PackageType: 'FEDEX_PAK',
    inch: { length: '0', height: '', width: '0' },
    cm: { length: '0', height: '', width: '0' },
  },
  {
    PackageType: 'FEDEX_TUBE',
    inch: { length: '6', height: '6', width: '38' },
    cm: { length: '15.24', height: '15.24', width: '96.52' },
  },
  {
    PackageType: '01',
    inch: { length: '11', height: '0.5', width: '9' },
    cm: { length: '27.94', height: '1.27', width: '22.86' },
  },
  {
    PackageType: '03',
    inch: { length: '6', height: '6', width: '38' },
    cm: { length: '15.24', height: '15.24', width: '96.52' },
  },
  {
    PackageType: '04',
    inch: { length: '17.73', height: '1', width: '16.15' },
    cm: { length: '45.04', height: '2.54', width: '41.02' },
  },
  {
    PackageType: '2a',
    inch: { length: '8.75', height: '2.69', width: '11.45' },
    cm: { length: '22.23', height: '6.83', width: '28.73' },
  },
  {
    PackageType: '2b',
    inch: { length: '8.75', height: '4.38', width: '11.45' },
    cm: { length: '22.23', height: '11.11', width: '28.73' },
  },
  {
    PackageType: '2c',
    inch: { length: '9.5', height: '7.75', width: '15.5' },
    cm: { length: '22.23', height: '19.69', width: '28.73' },
  },
];
