import Head from 'next/head';
import NavbarHome from '../components/NavbarHome';
import FooterHome from '../components/FooterHome';
import Image from 'next/image';
import Netflix from '../images/netflix.png';
import HomeMenu from '../components/HomeMenu';
import IsLogin from '../components/IsLogin';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import http from '../helpers/http';

const HistoryContent = () => {
  const imgURL = process.env.NEXT_PUBLIC_IMAGE_URL;
  const { userInfo } = useSelector(state => state.profile);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const token = useSelector(state => state.auth.token);
  const [paginating, setPaginating] = useState(1);

  useEffect(() => {
    const getTransactionHistory = async () => {
      try {
        setIsLoading(true);
        const response = await http(token).get(`transactions?page=${paginating}&limit=5`);
        setTransactions(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    getTransactionHistory();
  }, [token, paginating]);
  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl'>
          <div className='flex justify-between'>
            <div className='font-bold'>Transaction History</div>
            <div>
              <select className='select w-full max-w-xs'>
                <option disabled selected>
                  -- Select Filter --
                </option>
              </select>
            </div>
          </div>
          {isLoading && <progress className='progress progress-primary w-56'></progress>}
          <div className='flex flex-col gap-5'>
            {transactions?.map(transaction => (
              <div className='flex gap-5 justify-between items-center' key={transaction.id}>
                <div className='flex gap-4'>
                  {transaction?.recipientPicture ? (
                    <Image
                      src={imgURL + transaction.recipientPicture}
                      alt='ProfilePicture'
                      width={70}
                      height={70}
                      className='rounded-lg w-[70px] h-[70px]'
                    />
                  ) : (
                    <Image
                      src={Netflix}
                      alt='ProfilePicture'
                      width={70}
                      height={70}
                      className='rounded-lg w-[70px] h-[70px]'
                    />
                  )}
                  <div className='flex flex-col justify-center gap-2'>
                    <div className='font-bold'>{transaction.recipientname}</div>
                    <div>{transaction.notes}</div>
                  </div>
                </div>
                <div
                  className={
                    transaction.recipientId === userInfo?.id
                      ? 'text-green-500 font-bold'
                      : 'text-red-500 font-bold'
                  }>
                  {transaction.recipientId === userInfo?.id ? '+' : '-'}
                  Rp.{Number(transaction.amount).toLocaleString('id')}
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center gap-5'>
            <button
              className='btn btn-primary'
              onClick={() => setPaginating(paginating - 1)}
              disabled={paginating === 1}>
              Prev
            </button>
            <button
              className='btn btn-primary'
              onClick={() => setPaginating(paginating + 1)}
              disabled={transactions.length < 5}>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function History () {
  return (
    <>
      <Head>
        <title>History: MexL Pay</title>
        <meta name='description' content='History Transaction MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <HistoryContent />
      <FooterHome />
    </>
  );
}

export default IsLogin(History);
