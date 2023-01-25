import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import Head from 'next/head'
import NavbarHome from '../components/navbarHome'
import FooterHome from '../components/footerHome'
import Graph from '../images/expenses.png'
import Image from 'next/image'
import Netflix from '../images/netflix.png'
import HomeMenu from '../components/homeMenu'
import IsLogin from '../components/isLogin'
import { useSelector } from 'react-redux'
import http from '../helpers/http'

const HomeContent = ({ transactions }) => {
  const imgURL = process.env.NEXT_PUBLIC_IMAGE_URL
  const { userInfo } = useSelector(state => state.profile)

  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5'>
          <div className='bg-primary flex justify-between p-10 rounded-box shadow-xl'>
            <div className='flex flex-col justify-center gap-2'>
              <div>Balance</div>
              <div className='font-bold text-4xl'>
                Rp.{Number(userInfo?.balance).toLocaleString('id')}
              </div>
              <div className='font-semibold'>{userInfo?.phoneNumber}</div>
            </div>
            <div className='flex flex-col gap-2'>
              <Link href='/transfer' className='btn btn-secondary glass'>
                <Icon
                  icon='material-symbols:arrow-upward-rounded'
                  width='40'
                  height='40'
                />
                Transfer
              </Link>
              <label htmlFor='top-up' className='btn btn-secondary glass'>
                <Icon icon='ic:baseline-plus' width='40' height='40' />
                Top Up
              </label>
            </div>
          </div>
          <div className='flex gap-5 w-full'>
            <div className='bg-neutral flex justify-center items-center rounded-box shadow-xl p-10 w-2/3'>
              <Image src={Graph} alt='graph' width={400} height={400} />
            </div>
            <div className='bg-neutral rounded-box shadow-xl p-10 w-1/3'>
              <div className='flex justify-between mb-10'>
                <div className='font-bold'>Transaction History</div>
                <div className='font-semibold'>
                  <Link href='/history' className='font-bold text-secondary'>
                    See all
                  </Link>
                </div>
              </div>
              <div className='flex flex-col gap-5 w-full'>
                {transactions?.map(transaction => (
                  <div
                    className='flex gap-5 justify-between items-center'
                    key={transaction.id}
                  >
                    <div className='flex gap-4'>
                      {transaction?.recipientPicture ? (
                        <Image
                          src={imgURL + transaction?.recipientPicture}
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
                        <div className='font-bold'>
                          {transaction.recipientname}
                        </div>
                        <div>{transaction.notes}</div>
                      </div>
                    </div>
                    <div
                      className={
                        transaction.recipientId === userInfo?.id
                          ? 'text-green-500 font-bold'
                          : 'text-red-500 font-bold'
                      }
                    >
                      {transaction.recipientId === userInfo?.id ? '+' : '-'}
                      Rp.{Number(transaction.amount).toLocaleString('id')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps (context) {
  const { token } = context.req.cookies
  const { data } = await http(token).get('/transactions?limit=5')
  return {
    props: {
      transactions: data.results
    }
  }
}

function Home ({ transactions }) {
  return (
    <>
      <Head>
        <title>Home: MexL Pay</title>
        <meta name='description' content='Home MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <HomeContent transactions={transactions} />
      <FooterHome />
    </>
  )
}

export default IsLogin(Home)
