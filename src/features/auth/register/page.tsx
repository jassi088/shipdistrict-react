import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoadingButton from '@/components/common/loading-button';
import SEO from '@/components/common/seo';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import withAuthLayout from '@/features/auth/withAuthLayout';
import { createGenericApi } from '@/http/generic-api';
import { Paths } from '@/constants';
import TextField from '@/components/form/text-field';

const RegisterSchema = z.object({
  authMethod: z.literal('email'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.TypeOf<typeof RegisterSchema>;

interface RegisterResponse {
  authTokenId: string;
}

const Register = () => {
  const api = createGenericApi<RegisterInput, RegisterResponse>('auths');
  const route = useNavigate();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { authMethod: 'email', firstName: '', lastName: '', email: '', password: '' },
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (values) => {
    const response = await api.create(values, 'register/email');
    route(Paths.OTP, { state: { authTokenId: response.authTokenId, type: 'register' } });
  };

  return (
    <Fragment>
      <SEO
        title="Register | Shipdistrict"
        description="Register page for shipdistrict"
        name="Shipdistrict"
        type="webapp"
      />
      <div className="w-[360px] space-y-6">
        <div className="flex flex-col gap-2">
          <Typography variant="h3">Register</Typography>
          <Typography variant="body-small" className="font-semibold">
            Join us today!
          </Typography>
          <Typography variant="small">Please fill out the form to create your account.</Typography>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <TextField name="firstName" control={form.control} label="First Name" placeholder="Enter first name" />
              <TextField name="lastName" control={form.control} label="Last Name" placeholder="Enter last name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="email" control={form.control} label="Email" placeholder="Enter email" type="email" />
              <TextField
                name="password"
                control={form.control}
                label="Password"
                placeholder="Enter password"
                type="password"
              />
            </div>

            <div className="flex items-center justify-center">
              <LoadingButton>Sign Up</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(Register);
