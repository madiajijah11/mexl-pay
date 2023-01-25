import { Icon } from '@iconify-icon/react';
import Head from 'next/head';
import NavbarHome from '../components/NavbarHome';
import FooterHome from '../components/FooterHome';
import Image from 'next/image';
import HomeMenu from '../components/HomeMenu';
import ProfilePicture from '../images/review.png';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import IsLogin from '../components/IsLogin';
import { logout } from '../redux/reducers/authReducer';
import http from '../helpers/http';
import { getProfile } from '../redux/actions/profileAction';
import { useState } from 'react';

const ProfileContent = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector(state => state.auth);

  const imageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const handleFileChange = async event => {
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('picture', file);
      const res = await http(token).post('/profile', formData);
      if (res.data.success === true) {
        setIsSuccess(true);
        setMessage(res.data.message);
        dispatch(getProfile());
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl'>
          <div className='flex flex-col gap-2 py-5 items-center justify-center'>
            {isLoading && <progress className='progress progress-secondary w-56'></progress>}
            {isError && <span className='text-error font-bold text-xl'>{message}</span>}
            {isSuccess && (
              <span className='text-success font-bold text-xl'>Image uploaded successfully</span>
            )}
            {userInfo && userInfo?.picture ? (
              <Image
                src={imageURL + userInfo.picture}
                alt='Profile'
                width={80}
                height={80}
                className='rounded-lg w-[80px] h-[80px]'
              />
            ) : (
              <Image
                src={ProfilePicture}
                alt='Profile'
                width={80}
                height={80}
                className='rounded-lg w-[80px] h-[80px]'
              />
            )}
            <input type='file' name='picture' className='file-input' onChange={handleFileChange} />
            <div className='font-bold text-2xl'>
              {userInfo?.firstName} {userInfo?.lastName}
            </div>
            <div>{userInfo?.phoneNumber}</div>
          </div>
          <div className='flex flex-col gap-5 items-center'>
            <Link
              href='/personal-information'
              className='flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5'>
              <div className='font-bold'>Personal Information</div>
              <Icon icon='material-symbols:arrow-right-alt-rounded' width='40' height='40' />
            </Link>
            <Link
              href='/change-password'
              className='flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5'>
              <div className='font-bold'>Change Password</div>
              <Icon icon='material-symbols:arrow-right-alt-rounded' width='40' height='40' />
            </Link>
            <Link
              href='/change-pin'
              className='flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5'>
              <div className='font-bold'>Change PIN</div>
              <Icon icon='material-symbols:arrow-right-alt-rounded' width='40' height='40' />
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className='flex gap-5 items-center justify-between w-2/5 rounded-box bg-base-100 shadow-xl p-5'>
              <div className='font-bold'>Logout</div>
              <Icon icon='material-symbols:logout' width='40' height='40' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function Profile () {
  const { userInfo } = useSelector(state => state.profile);
  return (
    <>
      <Head>
        <title>Profile: MexL Pay</title>
        <meta name='description' content='Profile MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <ProfileContent userInfo={userInfo} />
      <FooterHome />
    </>
  );
}

export default IsLogin(Profile);
