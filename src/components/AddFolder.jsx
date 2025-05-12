import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2, RxUpload } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useFolderStore } from '../store';

export default function AddFolder({ isOpen, setIsOpen, folderId }) {
  const { createRootFolder, createFolder, folder, editFolder, isLoading } =
    useFolderStore();
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (folder) {
        await editFolder(folder.id, formData.name);
        toast.success('Folder updated successfully');
        // onEditSuccess?.();
      } else {
        if (folderId) {
          await createFolder(formData.name, folderId);
        } else {
          createRootFolder(formData.name);
        }
        toast.success('Folder created successfully');
        // onCreateSuccess?.();
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
    });
  };

  useEffect(() => {
    if (folder) {
      setFormData(folder);
    }
  }, [folder]);

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
                    <p>{folder ? 'Edit Folder' : 'Add New Folder'}</p>
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
                          placeholder='Folder Name'
                          className='border p-2 rounded'
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
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
                            : folder
                            ? 'Update Folder'
                            : 'Save Folder'}
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
