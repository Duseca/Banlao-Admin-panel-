import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2, RxUpload } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useCategoryStore, useMusicStore } from '../store';

export default function AddMusic({ isOpen, setIsOpen, folderId }) {
  const { addMusicItem, editMusicItem, musicItem, isLoading } = useMusicStore();
  const [formData, setFormData] = useState({
    name: '',
    audio_file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, audio_file: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (musicItem) {
        await editMusicItem(formData, musicItem.id);
        toast.success('Music updated successfully');
      } else {
        await addMusicItem(formData, folderId);
        toast.success('Music added successfully');
      }
      setIsOpen(false);
      clearForm();
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      name: '',
      audio_file: null,
    });
  };

  useEffect(() => {
    if (musicItem) {
      setFormData(musicItem);
    }
  }, [musicItem]);

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
                    <p>{musicItem ? 'Edit Music' : 'Add New Music'}</p>
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
                        <input
                          type='text'
                          name='name'
                          placeholder='Music Title'
                          className='border p-2 rounded'
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />

                        <div className='space-y-4'>
                          {/* Audio Upload Section */}
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Upload Audio
                            </label>
                            <div className='flex flex-col items-start gap-4'>
                              {formData.audio_url && (
                                <div className='w-64 h-36 border-2 border-gray-300 rounded-lg overflow-hidden'>
                                  <audio
                                    className='w-full h-full object-cover'
                                    src={formData.audio_url}
                                    controls
                                    alt='Uploaded'
                                    loading='lazy'
                                  />
                                </div>
                              )}
                              <div className='flex items-center gap-3'>
                                <label className='cursor-pointer hover:opacity-80 transition-opacity'>
                                  <div className='bg-gray-100 p-3 rounded-full shadow-sm hover:bg-gray-200'>
                                    <RxUpload className='text-gray-600 w-6 h-6' />
                                  </div>
                                  <input
                                    type='file'
                                    accept='audio/*'
                                    onChange={handleAudioChange}
                                    className='hidden'
                                  />
                                </label>
                                <div className='text-sm text-gray-600'>
                                  {formData.audio_file ? (
                                    <div>
                                      <p className='font-medium'>
                                        {formData.audio_file.name}
                                      </p>
                                      <p className='text-xs text-gray-500'>
                                        {(
                                          formData.audio_file.size /
                                          1024 /
                                          1024
                                        ).toFixed(2)}{' '}
                                        MB
                                      </p>
                                    </div>
                                  ) : formData.audio_url ? (
                                    'Audio file uploaded'
                                  ) : (
                                    'No file chosen'
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex justify-end gap-4'>
                        <button
                          type='button'
                          onClick={closeModal}
                          className='bg-gray-500 text-white px-4 py-2 rounded'
                        >
                          Cancel
                        </button>
                        <button
                          type='submit'
                          className='bg-gray-150 text-white px-4 py-2 rounded'
                          disabled={isLoading}
                        >
                          {isLoading
                            ? 'Saving...'
                            : musicItem
                            ? 'Update Music'
                            : 'Save Music'}
                        </button>
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
