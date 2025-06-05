import { Link } from 'react-router-dom';
import Header from '../layouts/partials/header';
import { useState } from 'react';
import AddNotification from '../components/AddNotification';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notificationsList = [
    {
      id: 1,
      title: 'System Maintenance',
      message: 'The platform will be down for maintenance on Friday at 10 PM.',
      date: '08/08/2023',
      status: 'Sent',
    },
    {
      id: 2,
      title: 'New Feature',
      message: 'Check out our new property comparison tool!',
      date: '05/15/2023',
      status: 'Sent',
    },
    {
      id: 3,
      title: 'Important Update',
      message: 'Our terms of service have been updated.',
      date: '06/20/2023',
      status: 'Sent',
    },
    {
      id: 4,
      title: 'Welcome',
      message: 'Welcome to our new notification system!',
      date: '07/10/2023',
      status: 'Sent',
    },
    {
      id: 5,
      title: 'Security Alert',
      message: 'Please update your passwords regularly.',
      date: '04/25/2023',
      status: 'Sent',
    },
  ];

  return (
    <div>
      <Header header={'Notifications'} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          {/* Notifications Table Section */}
          <div className='bg-white rounded-lg shadow-md'>
            <div className='p-4 border-b flex justify-between items-center'>
              <h2 className='text-xl font-semibold'>Notifications</h2>
              <div className='flex gap-4'>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-gray-500'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                      />
                    </svg>
                  </div>
                  <input
                    type='search'
                    className='block w-full px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Search notifications...'
                  />
                </div>
                <button
                  onClick={() => setIsOpen(true)}
                  className=' px-5 py-2 border text-xs rounded-md font-medium'
                >
                  Add Notification
                </button>
                <button className='px-4 py-2 border text-xs rounded-md font-medium'>
                  Download.csv
                </button>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      ID
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Title
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Message
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Date
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Status
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notificationsList.map((notification) => (
                    <tr
                      key={notification.id}
                      className='bg-white border-b hover:bg-gray-50'
                    >
                      <td className='px-6 py-4'>{notification.id}</td>
                      <td className='px-6 py-4 font-medium text-gray-900'>
                        {notification.title}
                      </td>
                      <td className='px-6 py-4'>{notification.message}</td>
                      <td className='px-6 py-4'>{notification.date}</td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            notification.status === 'Sent'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {notification.status}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <button className='font-medium text-blue-600 hover:text-blue-900 mr-3'>
                          Resend
                        </button>
                        <button className='font-medium text-red-600 hover:text-red-900'>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddNotification isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Notifications;
