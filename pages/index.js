import Head from 'next/head'
import Image from 'next/image'
import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import PhoneImage from '../images/png-phone.png'
import Sponsors from '../images/Group-51.png'
import PhoneImage1 from '../images/png-phone2.png'
import PhoneImage2 from '../images/png-phone3.png'
import User1 from '../images/review.png'

const data = {
  picture: User1,
  name: 'Alex Hansinburg',
  job: 'Designer',
  review:
    '“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is busy with their business and must transfer money to another person aut there. Just try this app and see the power!”'
}

import { logout } from '../redux/reducers/authReducer'

const Nav = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)
  return (
    <nav className='navbar py-2 px-4'>
      <div className='navbar-start'>
        <div className='text-secondary font-bold text-2xl btn glass btn-disabled'>
          MexL Pay
        </div>
      </div>
      <div className='navbar-end gap-5'>
        {auth?.token ? (
          <>
            <Link
              href='/home'
              className='btn btn-secondary font-bold py-2 px-4'
            >
              Home
            </Link>
            <button
              className='btn btn-secondary font-bold py-2 px-4'
              onClick={() => {
                dispatch(logout())
              }}
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link
              href='/login'
              className='btn btn-secondary btn-outline font-bold py-2 px-4'
            >
              Login
            </Link>
            <Link
              href='/register'
              className='btn btn-secondary font-bold py-2 px-4'
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

const FirstSection = () => (
  <section>
    <div className='flex justify-center'>
      <div className='flex justify-around'>
        <div className='flex flex-col justify-center gap-5'>
          <div className='text-secondary font-bold text-5xl'>
            Awesome App For Saving Time.
          </div>
          <div className='text-secondary'>
            We bring you a mobile app for banking problems that oftenly wasting
            much of your times.
          </div>
          <div>
            <button className='btn btn-secondary font-bold py-2 px-4'>
              Try It Free
            </button>
          </div>
        </div>
        <Image src={PhoneImage} alt='Phone Image' width={400} height={400} />
      </div>
    </div>
  </section>
)

const Sponsor = () => (
  <section className='bg-primary'>
    <div className='w-full flex z-10 justify-center items-center py-16 left-0 right-0'>
      <Image src={Sponsors} alt='Sponsors' width={1000} height={1000} />
    </div>
  </section>
)

const SecondSection = () => (
  <section className='bg-neutral'>
    <div className='flex flex-col justify-center items-center py-16 gap-5'>
      <div>
        <div className='font-bold text-5xl'>
          <span className='text-secondary'>About</span> the Application.
        </div>
      </div>
      <div>
        We have some great features from the application and it’s totally free
        to use by all users around the world.
      </div>
      <div className='flex flex-col lg:flex-row lg:overflow-y-auto gap-5'>
        <div className='card w-96 bg-primary'>
          <div className='card-body items-center text-center'>
            <Icon
              icon='material-symbols:phone-enabled'
              width='50'
              height='50'
            />
            <h2 className='card-title'>24/7</h2>
            <p>
              We have 24/7 contact support so you can contact us whenever you
              want and we will respond it.
            </p>
          </div>
        </div>
        <div className='card w-96 bg-primary'>
          <div className='card-body items-center text-center'>
            <Icon icon='material-symbols:lock' width='50' height='50' />
            <h2 className='card-title'>Data Privacy</h2>
            <p>
              We make sure your data is safe in our database and we will encrypt
              any data you submitted to us.
            </p>
          </div>
        </div>
        <div className='card w-96 bg-primary'>
          <div className='card-body items-center text-center'>
            <Icon icon='material-symbols:download' width='50' height='50' />
            <h2 className='card-title'>Easy Download</h2>
            <p>
              Zwallet is 100% totally free to use it’s now available on Google
              Play Store and App Store.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const ThirdSection = () => (
  <section>
    <div className='flex justify-center items-center gap-5'>
      <div>
        <Image src={PhoneImage1} alt='Phone Image' width={400} height={400} />
        <Image src={PhoneImage2} alt='Phone Image' width={400} height={400} />
      </div>
      <div className='flex flex-col gap-10'>
        <div className='font-bold text-5xl'>
          All The <span className='text-secondary'>Great</span> MexL Pay
          Features.
        </div>
        <div className='flex flex-col lg:overflow-y-auto gap-10'>
          <div className='card bg-neutral shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>
                <span className='text-secondary'>1.</span> Small Fee
              </h2>
              <p>
                We only charge 5% of every success transaction done in MexL Pay
                app.
              </p>
            </div>
          </div>
          <div className='card bg-neutral shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>
                <span className='text-secondary'>2.</span> Data Secured
              </h2>
              <p>
                All your data is secured properly in our system and it’s
                encrypted.
              </p>
            </div>
          </div>
          <div className='card bg-neutral shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>
                <span className='text-secondary'>3.</span> User Friendly
              </h2>
              <p>
                MexL Pay come up with modern and sleek design and not
                complicated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const FourthSection = ({ review }) => (
  <section className='bg-neutral'>
    <div className='flex flex-col justify-center items-center py-16 gap-5'>
      <div className='font-bold text-5xl'>
        What Users are <span className='text-secondary'>Saying.</span>
      </div>
      <div>
        We have some great features from the application and it’s totally free
        to use by all users around the world.
      </div>
      <div className='card w-1/2 bg-primary'>
        <div className='card-body items-center text-center'>
          <Image src={review.picture} alt='User 1' width={100} height={100} />
          <h2 className='text-2xl font-bold'>{review.name}</h2>
          <h2 className='text-xl'>{review.job}</h2>
          <p>{review.review}</p>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className='bg-primary py-2 px-4'>
    <div className='flex flex-col gap-5'>
      <div className='py-4 grid grid-flow-row w-1/3 gap-5'>
        <div className='text-secondary font-bold text-2xl'>MexL Pay</div>
        <p className='text-justify'>
          MexL Pay is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in MexL Pay everyday with worldwide users
          coverage.
        </p>
      </div>
      <hr />
      <div className='flex justify-between'>
        <div>
          &copy; 2021 - {new Date().getFullYear()} MexL Pay. All Rights
          Reserved.
        </div>
        <div className='grid grid-cols-2 gap-10'>
          <div>+6282256964453</div>
          <div>mexlpay@mail.com</div>
        </div>
      </div>
    </div>
  </footer>
)

export async function getStaticProps () {
  return {
    props: {
      review: data
    }
  }
}

export default function Home ({ review }) {
  return (
    <>
      <Head>
        <title>MexL Pay</title>
        <meta name='description' content='MexL Pay' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <FirstSection />
      <Sponsor />
      <SecondSection />
      <ThirdSection />
      <FourthSection review={review} />
      <Footer />
    </>
  )
}
