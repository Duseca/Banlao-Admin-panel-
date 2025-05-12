import Header from "../layouts/partials/header";
import { useState } from "react";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header header={'Admin Information'} />
      <div className='max-w-screen-lg mx-auto p-4 xl:px-8 space-y-4 mb-8'>
        <div className='bg-white w-full pb-4 px-6'>
          <div className='flex items-center justify-between border-b py-3'>
            <h4 className='text-2xl font-semibold capitalize'>Admin Profile</h4>
            <button onClick={e => setIsOpen(!isOpen)} className='capitalize px-6 py-2 text-white bg-gray-150 rounded-md text-sm'>Edit profile</button>
          </div>
          <div className='bg-white  py-3.5 space-y-5 '>
            <div className='flex items-center gap-4'>
              <div className=''>
                <img className='w-24 h-24 rounded-2xl object-cover' src={'https://images.pexels.com/photos/3851914/pexels-photo-3851914.jpeg?auto=compress&cs=tinysrgb&w=600'} />
              </div>
              <div className='w-full space-y-1'>
                <div className='flex justify-between w-full items-start'>
                  <div>
                    <h5 className='text-3xl font-semibold'>Jane Doe</h5>
                    <p className='text-sm text-gray-600 '>Jane@larmwar.com</p>
                  </div>
                  <p className='px-5 py-1.5 bg-green-500 bg-opacity-5 text-green-500 rounded-md'>Approved</p>
                </div>
                <div className='flex items-center  justify-between w-full text-sm text-[#434343]'>
                  <p>+92337465889</p>
                  <p>Member Since 12/12/12-10:34</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
