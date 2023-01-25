import { Icon } from '@iconify-icon/react';
import Head from 'next/head';
import NavbarHome from '../components/NavbarHome';
import FooterHome from '../components/FooterHome';
import Image from 'next/image';
import HomeMenu from '../components/HomeMenu';
import ProfilePicture from '../images/review.png';
import IsLogin from '../components/IsLogin';
import http from '../helpers/http';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ReceiverList = () => {
  const router = useRouter();
  const imgURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [isLoading, setIsLoading] = useState(true);

  const [receiverList, setReceiverList] = useState([]);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const getReceiverList = async () => {
      try {
        const response = await http(token).get('/transactions/recipient?page=1&limit=5');
        setReceiverList(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
      }
    };
    getReceiverList();
  }, [token]);

  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl'>
          <div className='font-bold'>Search Receiver</div>
          <div className='input-group bg-base-100 flex items-center rounded-box px-4 py-2 gap-2'>
            <Icon icon='ic:baseline-search' width='40' height='40' />
            <input type='text' className='input w-full' placeholder='Search Receiver' />
          </div>
          {isLoading && <progress className='progress progress-primary w-56'></progress>}
          {receiverList.map(receiver => (
            <Link
              href={`/transfertest/${receiver.id}`}
              className='flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5'
              key={receiver.id}>
              <div className='flex gap-4'>
                {receiver.picture ? (
                  <Image
                    src={imgURL + receiver.picture}
                    alt='ProfilePicture'
                    width={70}
                    height={70}
                  />
                ) : (
                  <Image src={ProfilePicture} alt='ProfilePicture' width={70} height={70} />
                )}
                <div className='flex flex-col justify-center gap-2'>
                  <div className='font-bold'>
                    {receiver?.firstName} {receiver?.lastName}
                  </div>
                  <div>{receiver?.phoneNumber}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

function Transfer () {
  return (
    <>
      <Head>
        <title>Transfer: MexL Pay</title>
        <meta name='description' content='Transfer MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <ReceiverList />
      <FooterHome />
    </>
  );
}

export default IsLogin(Transfer);
