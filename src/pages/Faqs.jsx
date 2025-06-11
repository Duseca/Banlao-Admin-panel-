import React, { useEffect, useRef, useState } from 'react';
import Header from '../layouts/partials/header';
import { Link } from 'react-router-dom';
import AddFaq from '../components/AddFaq';
import ReactPaginate from 'react-paginate';
import Spinner from '../components/Spinner';
import { useFaqStore } from '../store';
// import ExportExcel from '../components/ExportExcel';

export default function Faqs() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  const { isLoading, faqs, setFaq, fetchFaqs, deleteFaq } = useFaqStore();
  const originalFaqs = useRef([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentFaqs = faqs?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    fetchFaqs();
    if (faqs) {
      originalFaqs.current = faqs;
    }
  }, []);

  return (
    <div>
      <Header header={'Manage FAQs'} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='flex flex-wrap gap-4 justify-between bg-white px-4 py-2'>
            <div className='max-w-xs w-full'>
              <div className='relative w-full sm:w-auto'></div>
            </div>
            <div className='flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4'>
              <button
                className='px-5 py-2 border text-xs rounded-md font-medium'
                onClick={() => {
                  setFaq(null);
                  setIsOpen(!isOpen);
                }}
              >
                Add Faq
              </button>

              {/* <ExportExcel apiData={faqs} fileName={'FAQs'} /> */}
            </div>
          </div>
          <div className='my-3'>
            {isLoading ? (
              <div className='flex w-full h-full'>
                <Spinner />
              </div>
            ) : (
              <div className='relative overflow-x-auto drop-shadow-xl bg-white sm:rounded-lg'>
                <table className='w-full text-sm text-left text-gray-500'>
                  <thead className='text-xs text-gray-700 uppercase border-b-2 bg-white'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Title
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Answer
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Date
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFaqs.map((faq) => (
                      <tr
                        key={faq.id}
                        className='bg-white border-b hover:bg-gray-150/30'
                      >
                        <td className='px-6 py-4'>{faq.title || 'NA'}</td>
                        <td className='px-6 py-4 max-w-xs truncate'>
                          {faq.answer || 'NA'}
                        </td>
                        <td className='px-6 py-4 max-w-xs truncate'>
                          {new Date(faq.created_at).toDateString() || 'NA'}
                        </td>
                        <td className='px-6 py-4 space-x-2'>
                          <button
                            className='font-medium text-gray-150 bg-gray-150 px-3 py-0.5 rounded-md hover:text-gray-250 bg-opacity-10'
                            onClick={() => {
                              setFaq(faq);
                              setIsOpen(true);
                              setViewOnly(true);
                            }}
                          >
                            View
                          </button>
                          <button
                            className='font-medium text-green-500 bg-green-500 px-3 py-0.5 rounded-md hover:text-green-500 bg-opacity-10'
                            onClick={() => {
                              setFaq(faq);
                              setIsOpen(true);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className='font-medium text-red-500 bg-red-500 px-3 py-0.5 rounded-md hover:text-red-500 bg-opacity-10'
                            onClick={() => {
                              const confirmDel = confirm(
                                `Are you sure you want to delete this faq? This action cannot be undone`
                              );
                              if (confirmDel) {
                                deleteFaq(faq.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {faqs.length > itemsPerPage && (
                  <div className='py-4 px-4 flex items-start justify-center'>
                    <ReactPaginate
                      onPageChange={paginate}
                      pageCount={Math.ceil(faqs?.length / itemsPerPage)}
                      previousLabel={'⮜'}
                      nextLabel={'⮞'}
                      breakLabel={'...'}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      containerClassName='flex space-x-2'
                      breakLinkClassName='bg-gray-150 px-3 py-0.5 border border-gray-250 border-opacity-10 rounded-md hover:text-gray-250 bg-opacity-20 text-gray-900'
                      pageLinkClassName='bg-gray-150 px-3 py-0.5 border border-gray-250 border-opacity-10 rounded-md hover:text-gray-250 bg-opacity-20 text-gray-900'
                      previousLinkClassName='bg-gray-150 px-3 py-0.5 border border-gray-250 border-opacity-10 rounded-md hover:text-gray-250 bg-opacity-20 text-gray-900'
                      nextLinkClassName='bg-gray-150 px-3 py-0.5 border border-gray-250 border-opacity-10 rounded-md hover:text-gray-250 bg-opacity-20 text-gray-900'
                      activeLinkClassName='bg-orange-250 px-3 py-0.5 border border-gray-250 border-opacity-10 rounded-md text-gray-900 font-bold shadow-md hover:text-gray-250'
                      disabledLinkClassName='bg-slate-800 px-3 py-0.5 border border-gray-250 border-opacity-10 rounded-md text-gray-500'
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <AddFaq
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isViewOnly={viewOnly}
        setIsViewOnly={setViewOnly}
      />
    </div>
  );
}
