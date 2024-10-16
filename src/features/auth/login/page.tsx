import { Fragment } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LoadingButton from '@/components/common/loading-button';
import SEO from '@/components/common/seo';
import { Typography } from '@/components/common/typography';
import { Form } from '@/components/ui/form';
import TextField from '@/components/form/text-field';
import withAuthLayout from '@/features/auth/withAuthLayout';
import { Paths } from '@/constants';
import { createGenericApi } from '@/http/generic-api';
import { AuthModel } from '@/types/auth';
import { useAuthStore } from '@/stores';

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.TypeOf<typeof LoginSchema>;

const Login = () => {
  const api = createGenericApi<LoginInput, AuthModel>('auths');
  const { login } = useAuthStore();

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (values) => {
    const response = await api.create(values, 'signin');
    login(response);
  };

  return (
    <Fragment>
      <SEO title="Login | Shipdistrict" description="Login page for shipdistrict" name="Shipdistrict" type="webapp" />
      <div className="w-[260px] space-y-2">
        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-semibold">
            Get
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              started{' '}
            </Typography>
            with easy login
          </Typography>
          <Typography variant="small">Please enter your details below</Typography>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <TextField name="email" control={form.control} label="Email" placeholder="Enter email" />
            <TextField
              type="password"
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter password"
            />

            <span className="text-xs font-medium w-max ml-auto block text-primary">
              <Link to={Paths.FORGOT_PASSWORD}>Forgot Password ?</Link>
            </span>
            <div className="flex items-center justify-center">
              <LoadingButton>Log in</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(Login);
