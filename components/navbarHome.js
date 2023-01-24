import Image from 'next/image'
import { Icon } from '@iconify-icon/react'
import { getProfile } from '../redux/actions/profileAction'
import { useDispatch, useSelector } from 'react-redux'
import ProfilePicture from '../images/review.png'
import { useEffect, useState } from 'react'
import http from '../helpers/http'

export default function NavbarHome () {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const { userInfo } = useSelector(state => state.profile)
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const imgURL = process.env.NEXT_PUBLIC_IMAGE_URL

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await http(token).get(
          'transactions/notification?page=1&limit=5'
        )
        setNotifications(response.data.results)
        setIsLoading(false)
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
      }
    }
    if (token !== null) {
      dispatch(getProfile())
      fetchNotification()
    }
  }, [dispatch, token])

  return (
    <nav className='navbar bg-neutral py-6 px-40 rounded-b-xl shadow-xl'>
      <div className='navbar-start'>
        <div className='text-secondary font-bold text-2xl btn glass btn-disabled'>
          MexL Pay
        </div>
      </div>
      <div className='navbar-end gap-2'>
        <div className='w-[50px] h-[50px]'>
          {userInfo && userInfo?.picture ? (
            <Image
              src={imgURL + userInfo.picture}
              alt='profile'
              width={50}
              height={50}
              className='rounded-lg w-[50px] h-[50px]'
            />
          ) : (
            <Image
              src={ProfilePicture}
              alt='profile'
              width={50}
              height={50}
              className='rounded-lg w-[50px] h-[50px]'
            />
          )}
        </div>
        <div className='mr-5'>
          <div className='font-bold'>
            {userInfo?.firstName} {userInfo?.lastName}
          </div>
          <div>{userInfo?.phoneNumber}</div>
        </div>
        <ul className='menu menu-horizontal px-1'>
          <li tabIndex={0}>
            <a>
              <Icon icon='ph:bell' width='30' height='30' />
            </a>
            <ul className='p-2 bg-neutral gap-2 right-0 mt-7 z-10'>
              {isLoading && (
                <progress className='progress progress-primary w-56'></progress>
              )}
              {notifications.map(notification => (
                <li key={notification.id}>
                  <a className='flex flex-row bg-base-100 gap-2'>
                    {notification.type === 'CREDIT' ? (
                      <Icon
                        icon='material-symbols:arrow-downward-rounded'
                        width='40'
                        height='40'
                        style={{ color: 'green' }}
                      />
                    ) : (
                      <Icon
                        icon='material-symbols:arrow-upward-rounded'
                        width='40'
                        height='40'
                        style={{ color: 'red' }}
                      />
                    )}
                    <div>
                      <div className='text-sm'>{notification.notes}</div>
                      <div className='font-bold'>Rp{notification.amount}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  )
}
