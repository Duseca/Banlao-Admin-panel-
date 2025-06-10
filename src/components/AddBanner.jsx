import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2, RxUpload } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useBannerStore } from '../store';

export default function AddBanner({ isOpen, setIsOpen, viewOnly }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    imageFile: null,
    imagePreview: null,
  });
  const { banner, addBanner, editBanner, isLoading } = useBannerStore();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalForm = {
        title: formData.title,
        description: formData.description,
        imageFile: formData.imageFile,
      };
      if (banner) {
        editBanner(banner.id, finalForm);
        toast.success('Banner Updated Successfuly');
      } else {
        await addBanner(finalForm);
        toast.success('Banner Created Successfuly');
      }
      resetForm();
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      imageFile: null,
      imagePreview: null,
    });
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title,
        description: banner.description,
        image: banner.image,
        imageFile: null,
        imagePreview: banner.image,
      });
    } else {
      resetForm();
    }
  }, [banner]);

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
                    {banner ? 'Edit Banner' : 'Add Banner'}
                  </Dialog.Title>
                  <form onSubmit={onSubmit}>
                    <div className='mt-2'>
                      <div className='flex items-center justify-center w-full'>
                        <label
                          htmlFor='dropzone-file'
                          className='flex flex-col items-center justify-center w-full h-44 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100'
                        >
                          {formData.imagePreview ? (
                            <div className='relative w-full h-full'>
                              <img
                                src={formData.imagePreview}
                                alt='Preview'
                                className='w-full h-full object-cover rounded-lg'
                              />
                              <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                <span className='text-white font-medium'>
                                  Change Image
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                              <svg
                                className='w-8 h-8 mb-4 text-gray-500'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 20 16'
                              >
                                <path
                                  stroke='currentColor'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth='2'
                                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                                />
                              </svg>
                              <p className='mb-2 text-sm text-gray-500 text-center'>
                                <span className='font-semibold'>
                                  Click to upload
                                </span>{' '}
                                <br /> or drag and drop
                              </p>
                              <p className='text-xs text-gray-500'>
                                PNG, JPG (MAX. 5MB)
                              </p>
                            </div>
                          )}
                          <input
                            id='dropzone-file'
                            type='file'
                            className='hidden'
                            accept='image/*'
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <div className='my-4 space-y-4'>
                        <div className='relative z-0'>
                          <input
                            type='text'
                            id='title-input'
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            name='title'
                            value={formData.title}
                            onChange={onChange}
                            required
                          />
                          <label
                            htmlFor='title-input'
                            className='absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Title
                          </label>
                        </div>
                        <div className='relative z-0'>
                          <textarea
                            type='text'
                            id='description-input'
                            className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            name='description'
                            value={formData.description}
                            onChange={onChange}
                            rows={3}
                            required
                          />
                          <label
                            htmlFor='description-input'
                            className='absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Description
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='mt-4 flex space-x-3'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-1'
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-1'
                      >
                        {banner
                          ? 'Update'
                          : isLoading
                          ? '...Updating'
                          : 'Submit'}
                      </button>
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
