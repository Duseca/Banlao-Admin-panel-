import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2, RxUpload } from 'react-icons/rx';
import { toast } from 'react-toastify';

export default function AddBanner({ isOpen, setIsOpen, viewOnly }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    howToApply: '',
    type: 'percentage',
    price: '',
    discount: '',
  });

  const onChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (banner) {
      //   await editBanner(formData, banner.id);
      // } else {
      //   await addBanner(formData);
      // }
      // closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // useEffect(() => {
  //   if (banner) {
  //     setFormData(banner);
  //   } else {
  //     setFormData({
  //       title: '',
  //       description: '',
  //       howToApply: '',
  //       type: '',
  //       price: '',
  //       discount: '',
  //     });
  //   }
  // }, [banner]);

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-[1000]' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
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
                <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 flex justify-between'
                  >
                    {/* <p>{banner ? 'Edit Banner' : 'Add Banner'}</p> */}
                    <p>Add Banner</p>
                    <div
                      onClick={closeModal}
                      className='border rounded-full flex items-center justify-center w-6 h-6 cursor-pointer hover:border-gray-700'
                    >
                      <RxCross2 />
                    </div>
                  </Dialog.Title>
                  <form className='mt-2' onSubmit={handleSubmit}>
                    <div className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
                      <div className='grid grid-cols-1 gap-4 mb-6'>
                        <div className='space-y-4'>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                              Title
                            </label>
                            <input
                              type='text'
                              name='title'
                              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                              value={formData.title}
                              onChange={onChange}
                              disabled={viewOnly}
                              required
                            />
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Discount Type
                            </label>
                            <div className='flex gap-6'>
                              <label className='inline-flex items-center'>
                                <input
                                  type='radio'
                                  name='type'
                                  value='percentage'
                                  checked={formData.type === 'percentage'}
                                  onChange={onChange}
                                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                                  disabled={viewOnly}
                                />
                                <span className='ml-2 text-gray-700'>
                                  Percentage
                                </span>
                              </label>
                              <label className='inline-flex items-center'>
                                <input
                                  type='radio'
                                  name='type'
                                  value='fixed'
                                  checked={formData.type === 'fixed'}
                                  onChange={onChange}
                                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                                  disabled={viewOnly}
                                />
                                <span className='ml-2 text-gray-700'>
                                  Fixed Amount
                                </span>
                              </label>
                            </div>
                          </div>

                          {formData.type === 'percentage' ? (
                            <div>
                              <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Discount Percentage
                              </label>
                              <div className='relative rounded-md shadow-sm'>
                                <input
                                  type='number'
                                  name='discount'
                                  className='block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                  value={formData.discount}
                                  onChange={onChange}
                                  disabled={viewOnly}
                                  required
                                  min='0'
                                  max='100'
                                  placeholder='0'
                                />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                                  <span className='text-gray-500 sm:text-sm'>
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Price
                              </label>
                              <div className='relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                  <span className='text-gray-500 sm:text-sm'>
                                    $
                                  </span>
                                </div>
                                <input
                                  type='number'
                                  name='price'
                                  className='block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                  value={formData.price}
                                  onChange={onChange}
                                  disabled={viewOnly}
                                  required
                                  min='0'
                                  step='0.01'
                                  placeholder='0.00'
                                />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                                  <span className='text-gray-500 sm:text-sm'>
                                    USD
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                              Description
                            </label>
                            <textarea
                              name='description'
                              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                              value={formData.description}
                              onChange={onChange}
                              disabled={viewOnly}
                              required
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                              How To Apply
                            </label>
                            <textarea
                              name='howToApply'
                              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                              value={formData.howToApply}
                              onChange={onChange}
                              disabled={viewOnly}
                              required
                              rows={3}
                            />
                          </div>
                        </div>

                        {/* <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Types (folders)
                          </label>
                          <textarea
                            name='sub_types'
                            placeholder='Enter subtypes (folders), separated by commas (e.g., Notes, Chords, Loops etc)'
                            className='border p-2 rounded w-full'
                            value={formData.sub_types?.join(', ')}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                sub_types: e.target.value.split(', '),
                              }))
                            }
                            rows={2}
                            required
                            disabled={viewOnly}
                          />
                        </div> */}
                      </div>
                      <div className='flex justify-end gap-4'>
                        <button
                          type='button'
                          onClick={closeModal}
                          className='bg-gray-500 text-white px-4 py-2 rounded'
                        >
                          Cancel
                        </button>
                        {!viewOnly && (
                          <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded'
                            // disabled={isLoading}
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
