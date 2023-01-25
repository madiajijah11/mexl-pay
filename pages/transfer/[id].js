import Head from 'next/head'
import NavbarHome from '../../components/NavbarHome'
import FooterHome from '../../components/FooterHome'
import Image from 'next/image'
import HomeMenu from '../../components/HomeMenu'
import ProfilePicture from '../../images/review.png'
import IsLogin from '../../components/IsLogin'
import http from '../../helpers/http'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import {
  chooseRecipient,
  chooseAmount
} from '../../redux/reducers/transactionReducer'

YupPassword(Yup)

const TopUpSchema = Yup.object().shape({
  amount: Yup.number().required().positive().integer()
})

const Transfer = ({ receiver }) => {
  const router = useRouter()
  const imgURL = process.env.NEXT_PUBLIC_IMAGE_URL
  const { userInfo } = useSelector(state => state.profile)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(TopUpSchema),
    defaultValues: {
      amount: ''
    }
  })

  const onSubmit = async data => {
    dispatch(chooseRecipient({ recipientId: receiver.id }))
    dispatch(chooseAmount({ amount: data.amount, notes: data.notes }))
    router.push('/transfer/transfer-confirm')
  }

  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl'>
          <div className='font-bold'>Transfer Money</div>
          <div className='flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5'>
            <div className='flex gap-4'>
              {receiver.picture ? (
                <Image
                  src={imgURL + receiver.picture}
                  alt='ProfilePicture'
                  width={70}
                  height={70}
                  className='rounded-lg w-[70px] h-[70px]'
                />
              ) : (
                <Image
                  src={ProfilePicture}
                  alt='ProfilePicture'
                  width={70}
                  height={70}
                  className='rounded-lg w-[70px] h-[70px]'
                />
              )}
              <div className='flex flex-col justify-center gap-2'>
                <div className='font-bold'>
                  {receiver.firstName} {receiver.lastName}
                </div>
                <div>{receiver.phoneNumber}</div>
              </div>
            </div>
          </div>
          <p>
            Type the amount you want to transfer and then press continue to the
            next steps.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center justify-center gap-5'
          >
            <input
              type='text'
              className='input input-lg text-center'
              placeholder='0.00'
              name='amount'
              {...register('amount')}
            />
            <div className='font-bold'>
              Rp
              {userInfo?.balance === 0
                ? Number(0).toLocaleString('id')
                : Number(userInfo?.balance).toLocaleString('id')}{' '}
              Available
            </div>
            <textarea
              type='text'
              className='input'
              placeholder='Add some notes'
              cols={50}
              rows={30}
              name='notes'
              {...register('notes')}
            />
            <div className='w-full justify-end flex'>
              <button
                className='btn btn-primary'
                disabled={!isDirty || !isValid}
                type='submit'
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function TransferAmount () {
  const router = useRouter()
  const { id } = router.query
  const [receiver, setReceiver] = useState({})
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    const fetchReceiver = async () => {
      const response = await http(token).get(`/transactions/recipient/${id}`)
      setReceiver(response.data.results)
    }
    fetchReceiver()
  }, [id, token])

  return (
    <>
      <Head>
        <title>Transfer: MexL Pay</title>
        <meta name='description' content='Transfer MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <Transfer receiver={receiver} />
      <FooterHome />
    </>
  )
}

export default IsLogin(TransferAmount)
