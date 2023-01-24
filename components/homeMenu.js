import { Icon } from '@iconify-icon/react'
import Link from 'next/link'
import { logout } from '../redux/reducers/authReducer'
import http from '../helpers/http'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../redux/actions/profileAction'
import { useState } from 'react'

YupPassword(Yup)

const TopUpSchema = Yup.object().shape({
  amount: Yup.number().required().positive().integer()
})

export default function HomeMenu () {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(TopUpSchema),
    defaultValues: {
      amount: ''
    }
  })

  const onSubmit = async data => {
    try {
      setIsLoading(true)
      const newAmount = parseInt(data.amount)
      await http(token).post('/transactions/topup', { amount: newAmount })
      dispatch(getProfile())
      setIsSuccess(true)
      setIsLoading(false)
    } catch (error) {
      setIsError(true)
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-neutral rounded-box flex flex-col justify-between shadow-xl w-60 p-2'>
      <ul className='menu'>
        <li className='hover-bordered'>
          <Link href='/home'>
            <Icon
              icon='material-symbols:space-dashboard-outline-sharp'
              width='40'
              height='40'
            />
            Dashboard
          </Link>
        </li>
        <li className='hover-bordered'>
          <Link href='/transfer'>
            <Icon
              icon='material-symbols:arrow-upward-rounded'
              width='40'
              height='40'
            />
            Transfer
          </Link>
        </li>
        <li className='hover-bordered'>
          <label htmlFor='top-up'>
            <Icon icon='ic:baseline-plus' width='40' height='40' />
            Top Up
          </label>
        </li>
        <li className='hover-bordered'>
          <Link href='/profile'>
            <Icon
              icon='material-symbols:person-outline'
              width='40'
              height='40'
            />
            Profile
          </Link>
        </li>
      </ul>
      <div>
        <ul className='menu'>
          <li className='hover-bordered'>
            <button
              onClick={() => {
                dispatch(logout())
              }}
            >
              <Icon icon='material-symbols:logout' width='40' height='40' />
              Logout
            </button>
          </li>
        </ul>
      </div>
      <input type='checkbox' id='top-up' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box relative'>
          <label
            htmlFor='top-up'
            className='btn btn-sm btn-circle absolute right-2 top-2'
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>Top Up</h3>
          <p className='py-4'>Enter the amount of money, and click submit</p>
          {isError && <span className='text-error'>Something went wrong</span>}
          {isSuccess && <span className='text-success'>Top up success</span>}
          {errors.amount && (
            <span className='text-error'>{errors.amount.message}</span>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type='text'
              className='input input-bordered w-full'
              name='amount'
              {...register('amount')}
            />
            <div className='modal-action'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={!isDirty || !isValid || isLoading}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
