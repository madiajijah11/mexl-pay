import Head from 'next/head'
import NavbarHome from '../../components/navbarHome'
import FooterHome from '../../components/footerHome'
import Image from 'next/image'
import HomeMenu from '../../components/homeMenu'
import ProfilePicture from '../../images/review.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import IsLogin from '../../components/isLogin'
import http from '../../helpers/http'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { transfer } from '../../redux/actions/transactionAction'
import { useRouter } from 'next/router'

YupPassword(Yup)

const PinSchema = Yup.object().shape({
  pin1: Yup.number().required(),
  pin2: Yup.number().required(),
  pin3: Yup.number().required(),
  pin4: Yup.number().required(),
  pin5: Yup.number().required(),
  pin6: Yup.number().required()
})

const Transfer = () => {
  const [receiver, setReceiver] = useState({})
  const imgURL = process.env.NEXT_PUBLIC_IMAGE_URL
  const { userInfo } = useSelector(state => state.profile)
  const { amount, recipientId, notes } = useSelector(state => state.transaction)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const router = useRouter()

  const getRecipient = async () => {
    const response = await http(token).get(
      `/transactions/recipient/${recipientId}`
    )
    return response.data.results
  }

  useEffect(() => {
    getRecipient().then(res => setReceiver(res))
  }, [recipientId])

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(PinSchema),
    defaultValues: {
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      pin5: '',
      pin6: ''
    }
  })

  const onSubmit = data => {
    const transferPin = `${data.pin1}${data.pin2}${data.pin3}${data.pin4}${data.pin5}${data.pin6}`
    dispatch(transfer({ amount, recipientId, notes, pin: transferPin }))
    router.push('/status')
  }

  return (
    <section>
      <div className='px-40 py-20 flex gap-5'>
        <HomeMenu />
        <div className='w-full flex flex-col gap-5 bg-neutral p-10 rounded-box shadow-xl'>
          <div className='font-bold'>Transfer To</div>
          <div className='flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5'>
            <div className='flex gap-4'>
              {receiver?.picture ? (
                <Image
                  src={imgURL + receiver?.picture}
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
                  {receiver?.firstName} {receiver?.lastName}
                </div>
                <div>{receiver?.phoneNumber}</div>
              </div>
            </div>
          </div>
          <div className='font-bold'>Details</div>
          <div className='flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5'>
            <div className='flex flex-col justify-center gap-2'>
              <div>Amount</div>
              <div className='font-bold text-xl'>
                Rp{Number(amount).toLocaleString('id')}
              </div>
            </div>
          </div>
          <div className='flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5'>
            <div className='flex flex-col justify-center gap-2'>
              <div>Balance Left</div>
              <div className='font-bold text-xl'>
                Rp{Number(userInfo?.balance - amount).toLocaleString('id')}
              </div>
            </div>
          </div>
          <div className='flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5'>
            <div className='flex flex-col justify-center gap-2'>
              <div>Date & Time</div>
              <div className='font-bold text-xl'>
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
          <div className='flex gap-5 items-center rounded-box bg-base-100 shadow-xl p-5'>
            <div className='flex flex-col justify-center gap-2'>
              <div>Notes</div>
              <div className='font-bold text-xl'>{notes}</div>
            </div>
          </div>
          <div className='w-full justify-end flex'>
            <label
              htmlFor='continue'
              className='btn btn-primary'
              disabled={userInfo?.balance - amount < 0}
            >
              Continue
            </label>
          </div>
        </div>
      </div>
      <input type='checkbox' id='continue' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='continue'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>Enter PIN to Transfer</h3>
          <p className='py-4'>
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-10'
          >
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
            <div className='modal-action'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={!isDirty || !isValid}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function TransferConfirm () {
  return (
    <>
      <Head>
        <title>Transfer: MexL Pay</title>
        <meta name='description' content='Transfer MexL Pay' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarHome />
      <Transfer />
      <FooterHome />
    </>
  )
}

export default IsLogin(TransferConfirm)
