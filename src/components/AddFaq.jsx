import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useFaqStore } from '../store';
import Spinner from './Spinner';

export default function AddFaq({
  isOpen,
  setIsOpen,
  isViewOnly,
  setIsViewOnly,
}) {
  const { addFaq, faq, editFaq, isLoading } = useFaqStore();

  const [formData, setFormData] = useState({
    title: faq?.title || '',
    answer: faq?.answer || '',
  });

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!faq) {
        addFaq(formData);
      } else {
        editFaq(formData);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      clearData();
    }
  };

  function closeModal() {
    setIsOpen(false);
    setIsViewOnly(false);
  }

  function clearData() {
    setFormData({
      title: '',
      answer: '',
    });
  }

  useEffect(() => {
    if (faq) {
      setFormData({ title: faq.title, answer: faq.answer });
    } else {
      setFormData({
        title: '',
        answer: '',
      });
    }
  }, [faq]);

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
                    Add Faq
                  </Dialog.Title>
                  <form onSubmit={onSubmit}>
                    <div className='mt-2'>
                      <div className='my-4 space-y-4'>
                        <div class='relative z-0'>
                          <input
                            type='text'
                            id='floating_standard'
                            name='title'
                            value={formData.title}
                            onChange={onChange}
                            class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=''
                            disabled={isViewOnly}
                          />
                          <label
                            htmlFor='floating_standard'
                            class='absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Title
                          </label>
                        </div>
                        <div class='relative z-0'>
                          <textarea
                            type='text'
                            id='floating_standard'
                            name='answer'
                            value={formData.answer}
                            onChange={onChange}
                            rows={6}
                            class='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                            placeholder=' '
                            disabled={isViewOnly}
                          />
                          <label
                            htmlFor='floating_standard'
                            class='absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                          >
                            Answer
                          </label>
                        </div>
                      </div>
                    </div>

                    {!isViewOnly && (
                      <div className='mt-4'>
                        <button
                          type='submit'
                          className='inline-flex justify-center rounded-md border border-transparent bg-orange-150 w-full bg-opacity-25 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                          onClick={closeModal}
                        >
                          {isLoading ? (
                            <div className='flex w-5 h-5'>
                              {' '}
                              <Spinner /> Adding...{' '}
                            </div>
                          ) : (
                            'Submit'
                          )}
                        </button>
                      </div>
                    )}
                    <div className='mt-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-orange-150 w-full bg-opacity-25 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}
                      >
                        Close
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
