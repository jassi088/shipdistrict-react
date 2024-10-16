import { Fragment, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '@/components/common/loading-button';
import OtpInput from '@/components/common/otp-input';
import SEO from '@/components/common/seo';
import withAuthLayout from '@/features/auth/withAuthLayout';
import { Paths } from '@/constants';
import { createGenericApi } from '@/http/generic-api';
import { useAuthStore } from '@/stores';
import { AuthModel, UserModel } from '@/types/auth';
import { Typography } from '@/components/common/typography';

interface VerifyOTP {
  authTokenId: string;
  activationCode: string;
}

interface LocationState {
  email: string;
  authTokenId: string;
  type: string;
}

const VerifyEmail = () => {
  const { state }: { state: LocationState } = useLocation();

  const route = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const login = useAuthStore((state) => state.login);

  const registerApi = createGenericApi<VerifyOTP, AuthModel>('auths');
  const forgotApi = createGenericApi<VerifyOTP, UserModel>('auths');

  if (!!state?.authTokenId === false) {
    if (state?.type === 'register') {
      return <Navigate to={Paths.REGISTER} replace />;
    } else if (state?.type === 'forgot') {
      return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
    }
  }

  const onChange = (value: string) => setOtp(value);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.split(' ')[0].length !== 4) {
      setError('OTP is not valid');
      return;
    } else if (otp.split(' ')[0].length === 4) {
      setError('');
    }

    if (state.type == 'register') {
      const response = await registerApi.create({ authTokenId: state.authTokenId, activationCode: otp }, 'verifyOTP');
      login(response);
    } else if (state.type == 'forgot') {
      const user = await forgotApi.create({ authTokenId: state.authTokenId, activationCode: otp }, 'verifyOTP');
      route(Paths.RESET_PASSWORD, { replace: true, state: { OTPverified: true, userId: user.id } });
    }
  };

  useEffect(() => {
    if (otp.split(' ')[0].length === 4) {
      setError('');
    }
  }, [otp]);

  return (
    <Fragment>
      <SEO
        title="Verify email | Project Name"
        description="Verify email page for project name"
        name="Company name."
        type="article"
      />
      <div className="w-[300px] space-y-2">
        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-semibold">
            Verify
            <Typography as="span" variant="h2" className="font-semibold text-primary">
              {' '}
              email
            </Typography>
          </Typography>
          <Typography variant="small">Enter the OTP sent to your registration email address.</Typography>
        </div>
        <OtpInput value={otp} valueLength={4} onChange={onChange} />
        <span className="text-sm font-medium text-destructive">{error}</span>

        <div className="flex items-center justify-center pt-4">
          <LoadingButton onClick={onSubmit}>Verify</LoadingButton>
        </div>
      </div>
    </Fragment>
  );
};

export default withAuthLayout(VerifyEmail);
