import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import LoadingButton from '@/components/common/loading-button';
import SEO from '@/components/common/seo';
import { Form } from '@/components/ui/form';
import withAuthLayout from '@/features/auth/withAuthLayout';
import { Paths } from '@/constants';
import { createGenericApi } from '@/http/generic-api';
import { Typography } from '@/components/common/typography';
import TextField from '@/components/form/text-field';

interface LocationState {
  OTPverified: boolean;
  userId: string;
}

const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password should be 6 characters.'),
    confirmPassword: z.string().min(6, 'Password should be 6 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.TypeOf<typeof ResetPasswordSchema>;

interface ResetPasswordPayload {
  password: string;
  userId: string;
}

const ResetPassword = () => {
  const { state }: { state: LocationState } = useLocation();

  const api = createGenericApi<ResetPasswordPayload, unknown>('auths');

  const navigate = useNavigate();

  if (!!state?.OTPverified === false) {
    return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
  }

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    await api.create({ password: data.password, userId: state.userId }, 'resetPassword');
    navigate(Paths.LOGIN);
  };

  return (
    <Fragment>
      <SEO
        title="Reset password | Project Name"
        description="Reset password page for project name"
        name="Company name."
        type="article"
      />
      <div className="w-[300px] space-y-6">
        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-semibold">
            Reset
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              password
            </Typography>
          </Typography>
          <Typography variant="small">Enter your new password below.</Typography>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <TextField
              type="password"
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter new password"
            />
            <TextField
              type="password"
              name="confirmPassword"
              control={form.control}
              label="Confirm Password"
              placeholder="Confirm new password"
            />

            <div className="flex items-center justify-center">
              <LoadingButton>Reset password</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(ResetPassword);
