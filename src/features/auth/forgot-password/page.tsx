import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import LoadingButton from '@/components/common/loading-button';
import SEO from '@/components/common/seo';
import { Form } from '@/components/ui/form';
import withAuthLayout from '@/features/auth/withAuthLayout';
import TextField from '@/components/form/text-field';
import { Paths } from '@/constants';
import { Typography } from '@/components/common/typography';
import { createGenericApi } from '@/http/generic-api';

interface ForgotPasswordResponse {
  authTokenId: string;
}

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required.').email('Email is invalid.'),
});

export type ForgotPasswordInput = z.TypeOf<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();

  const api = createGenericApi<ForgotPasswordInput, ForgotPasswordResponse>('auths');

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const email = form.getValues('email');

  const onSubmit: SubmitHandler<ForgotPasswordInput> = async (data) => {
    const values = { ...data, authMethod: 'email' };
    const response = await api.create(values, 'forgotPassword');
    navigate(Paths.OTP, { state: { email, authTokenId: response.authTokenId, type: 'forgot' } });
  };

  return (
    <Fragment>
      <SEO title="Forgot password" description="Forgot password" name="" type="webapp" />
      <div className="w-[300px] space-y-2">
        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-semibold">
            Forgot
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              Password
            </Typography>
          </Typography>
          <Typography variant="small">
            Forgot your password? That&apos;s ok, it happens. Click on the button below to reset your password.
          </Typography>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <TextField name="email" control={form.control} label="Email" placeholder="Enter email" />
            <div className="flex items-center justify-center">
              <LoadingButton>Submit</LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(ForgotPassword);
