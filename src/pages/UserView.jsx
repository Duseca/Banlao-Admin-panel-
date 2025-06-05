import { useState } from 'react';
import Header from '../layouts/partials/header';
import UserInfo from '../components/UserInfo';
import UserChat from '../components/UserChat';

export default function UserView() {
  const [tab, setTab] = useState(1);
  return (
    <div>
      <Header header={'User Details'} link={'/users'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='space-y-1.5'>
            <div className='bg-white px-4 rounded-md'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <h3
                    onClick={() => setTab(1)}
                    className={`text-sm py-2 cursor-pointer ${
                      tab === 1 && 'border-b border-gray-250'
                    } font-medium`}
                  >
                    User Information
                  </h3>
                  <h3
                    onClick={() => setTab(2)}
                    className={`text-sm py-2 cursor-pointer ${
                      tab === 2 && 'border-b border-gray-250'
                    } font-medium`}
                  >
                    User Chat
                  </h3>
                </div>
                <div>
                  <button className='px-5 py-1 border text-sm text-gray-250 rounded-md font-semibold'>
                    Block
                  </button>
                </div>
              </div>
            </div>

            {tab === 1 && <UserInfo />}
            {tab === 2 && <UserChat />}
          </div>
        </div>
      </div>
    </div>
  );
}
