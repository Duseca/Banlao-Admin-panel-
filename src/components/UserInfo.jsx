import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div>
      <div className='bg-white max-w-2xl px-4 xl:px-6 py-5'>
        <div className='flex items-center gap-4'>
          <div>
            <img
              className='w-16 h-16 rounded-full ring-2 ring-gray-250 object-cover border'
              src={user.profileImage}
              alt='user'
            />
          </div>
          <div>
            <h2 className='text-xl font-semibold'>{user.name || 'N/A'}</h2>
            <p className='text-xs text-gray-600'>{user.email || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className='bg-white w-full max-w-2xl'>
        <div className='border-b px-4 xl:px-6 py-3'>
          <div>
            <h5 className='uppercase text-xl font-bold'>
              Personal Information
            </h5>
          </div>
        </div>
        <div className='px-4 xl:px-6 py-8 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4'>
          <div>
            <p className='text-xs text-gray-600'>Location</p>
            <h6 className='text-sm font-medium'>{user.location || 'N/A'}</h6>
          </div>
          <div>
            <p className='text-xs text-gray-600'>Address</p>
            <h6 className='text-sm font-medium'>{user.address || 'N/A'}</h6>
          </div>
          <div>
            <p className='text-xs text-gray-600'>Phone Number</p>
            <h6 className='text-sm font-medium'>{user.phoneNo || 'N/A'}</h6>
          </div>
          <div>
            <p className='text-xs text-gray-600'>Registered On</p>
            <h6 className='text-sm font-medium'>
              {new Date(user.created_at).toDateString() || 'N/A'}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
