import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const QueryModal = ({ isOpen, setIsOpen, query }) => {
  const [currentStatus, setCurrentStatus] = useState(
    query?.status || 'Pending'
  );

  function closeModal() {
    setIsOpen(false);
  }

  const handleStatusUpdate = (newStatus) => {
    // In a real app, you would call an API to update the status
    setCurrentStatus(newStatus);
    // You might want to add a toast notification here
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Query Details
                  </Dialog.Title>

                  <div className='mt-6 space-y-6'>
                    {/* User Information */}
                    <div className='flex items-start space-x-4'>
                      <img
                        src={query?.user.profilePic}
                        alt={query?.user.name}
                        className='w-16 h-16 rounded-full object-cover'
                      />
                      <div>
                        <h4 className='text-lg font-semibold'>
                          {query?.user.name}
                        </h4>
                        <p className='text-gray-600'>{query?.user.email}</p>
                        <div className='mt-2'>
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              currentStatus === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : currentStatus === 'Responded'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {currentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Query Details */}
                    <div className='space-y-4'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-500'>
                          Property
                        </h4>
                        <p className='mt-1'>{query?.property}</p>
                      </div>

                      <div>
                        <h4 className='text-sm font-medium text-gray-500'>
                          Query
                        </h4>
                        <p className='mt-1 whitespace-pre-line'>
                          {query?.query}
                        </p>
                      </div>

                      <div>
                        <h4 className='text-sm font-medium text-gray-500'>
                          Date
                        </h4>
                        <p className='mt-1'>{query?.date}</p>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div>
                      <h4 className='text-sm font-medium text-gray-500 mb-2'>
                        Update Status
                      </h4>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => handleStatusUpdate('Pending')}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentStatus === 'Pending'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusUpdate('Responded')}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentStatus === 'Responded'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          Responded
                        </button>
                        <button
                          onClick={() => handleStatusUpdate('Completed')}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentStatus === 'Completed'
                              ? 'bg-green-500 text-white'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='mt-6 flex justify-end space-x-3'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <Link
                      to={`/users/view/${query?.id}`}
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    >
                      Open Chat
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default QueryModal;
