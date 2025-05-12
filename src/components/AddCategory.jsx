import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2, RxUpload } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useCategoryStore } from '../store';

export default function AddCategory({ isOpen, setIsOpen, viewOnly }) {
  const { category, addCategory, editCategory, isLoading } = useCategoryStore();
  const [formData, setFormData] = useState({
    name: '',
    // sub_types: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (category) {
        await editCategory(formData, category.id);
      } else {
        await addCategory(formData);
      }
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        name: '',
        // sub_types: [],
      });
    }
  }, [category]);

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
                    <p>{category ? 'Edit Category' : 'Add Category'}</p>
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
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Name
                          </label>
                          <input
                            type='text'
                            name='name'
                            placeholder='Guitar'
                            className='border p-2 rounded w-full'
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ name: e.target.value })
                            }
                            disabled={viewOnly}
                            required
                          />
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
                            disabled={isLoading}
                          >
                            {isLoading
                              ? category
                                ? 'Saving...'
                                : 'Adding...'
                              : category
                              ? 'Save Category'
                              : 'Add Category'}
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
