import Head from 'next/head';
import NavbarHome from '../components/NavbarHome';
import FooterHome from '../components/FooterHome';
import HomeMenu from '../components/HomeMenu';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import IsLogin from '../components/IsLogin';
import { useSelector } from 'react-redux';
import http from '../helpers/http';
import { useState } from 'react';

YupPassword(Yup);

const ChangePinSchema = Yup.object().shape({
  pin1: Yup.number().required(),
  pin2: Yup.number().required(),
  pin3: Yup.number().required(),
  pin4: Yup.number().required(),
  pin5: Yup.number().required(),
  pin6: Yup.number().required()
});

const ChangePasswordContent = () => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(ChangePinSchema),
    defaultValues: {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      pin5: '',
      pin6: ''
    }
  });

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      const pin = `${data.pin1}${data.pin2}${data.pin3}${data.pin4}${data.pin5}${data.pin6}`;
      const res = await http(token).post('/profile/change-pin', { newPin: pin });
      if (res.data.success === true) {
        setIsError(false);
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        setIsError(true);
        setIsSuccess(false);
      }
    }
  };

  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl'>
          <div className='flex flex-col gap-10 py-5'>
            <div className='font-bold'>Change PIN</div>
            <p className='w-1/3'>
              Enter your current 6 digits MexL Pay PIN below to continue to the next steps.
            </p>
            <div className='w-full items-center justify-center flex'>
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-1/3 mt-10 gap-10'>
                {isError && <span className='text-error mt-2'>Failed to change PIN</span>}
                {isSuccess && <span className='text-success mt-2'>PIN changed successfully</span>}
                <div className='w-full flex gap-5'>
                  <input
                    name='pin1'
                    {...register('pin1', { required: true })}
                    type='text'
                    maxLength='1'
                    className='text-center rounded-lg w-2/12 h-12'
                  />
                  <input
                    name='pin2'
                    {...register('pin2', { required: true })}
                    type='text'
                    maxLength='1'
                    className='text-center rounded-lg w-2/12 h-12'
                  />
                  <input
                    name='pin3'
                    {...register('pin3', { required: true })}
                    type='text'
                    maxLength='1'
                    className='text-center rounded-lg w-2/12 h-12'
                  />
                  <input
                    name='pin4'
                    {...register('pin4', { required: true })}
                    type='text'
                    maxLength='1'
                    className='text-center rounded-lg w-2/12 h-12'
                  />
                  <input
                    name='pin5'
                    {...register('pin5', { required: true })}
                    type='text'
                    maxLength='1'
                    className='text-center rounded-lg w-2/12 h-12'
                  />
                  <input
                    name='pin6'
                    {...register('pin6', { required: true })}
                    type='text'
                    maxLength='1'
                    className='text-center rounded-lg w-2/12 h-12'
                  />
                </div>
                {errors.pin1 ||
                errors.pin2 ||
                errors.pin3 ||
                errors.pin4 ||
                errors.pin5 ||
                errors.pin6 ? (
                  <span className='text-error -mt-8'>PIN is required</span>
                ) : null}
                <button
                  type='submit'
                  className='btn btn-primary w-full'
                  disabled={!isDirty || !isValid || isLoading}>
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function ChangePin () {
  return (
    <>
      <Head>
        <title>Change PIN: MexL Pay</title>
        <meta name='description' content='Change PIN MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <ChangePasswordContent />
      <FooterHome />
    </>
  );
}

export default IsLogin(ChangePin);
