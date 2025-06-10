import { Link } from 'react-router-dom';
import Header from '../layouts/partials/header';
import { useState, useEffect } from 'react';
import AddBanner from '../components/AddBanner';
import ReactPaginate from 'react-paginate';
import Spinner from '../components/Spinner';
import { useBannerStore } from '../store';
import { toast } from 'react-toastify';

export default function Banners() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, banners, fetchBanners, setBanner, removeBanner } =
    useBannerStore();
  const [originalBanners, setOriginalBanners] = useState([]);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentBanners = originalBanners?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const searchBanners = () => {
    if (search === '') {
      setOriginalBanners(banners);
    } else {
      const filteredBanners = originalBanners.filter((banner) =>
        banner.title?.toLowerCase().includes(search.toLowerCase())
      );
      setOriginalBanners(filteredBanners);
    }
  };

  useEffect(() => {
    searchBanners();
  }, [search]);

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 0) {
      setOriginalBanners(banners);
    }
  }, [banners]);

  const deleteBanner = async (banner) => {
    try {
      const confirmDel = confirm(
        'Are you sure you want to delete this banner? This action cannot be undone'
      );
      if (confirmDel) {
        await removeBanner(banner);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Header header={'Manage Banners'} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='flex flex-wrap gap-4 justify-between bg-white px-4 py-2'>
            <div className='max-w-xs w-full'>
              <div className='relative w-full sm:w-auto'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full px-4 py-2 outline-none pl-10 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Search banners...'
                  required
                />
              </div>
            </div>
            <div className='flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4'>
              <button
                onClick={() => setIsOpen(true)}
                className=' px-5 py-2 border text-xs rounded-md font-medium'
              >
                Add Banner
              </button>
              <button className=' px-5 py-2 border text-xs rounded-md font-medium'>
                Download.csv
              </button>
              {/* <Filterdropdown /> */}
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
                        Description
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Date
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBanners.map((banner) => (
                      <tr
                        key={banner.id}
                        className='bg-white border-b hover:bg-gray-150/30'
                      >
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center space-x-2'>
                            <img
                              src={banner.image}
                              alt='banner'
                              className='w-8 h-8 rounded-full object-cover'
                            />
                            <h1 className=''>{banner.title || 'N/A'}</h1>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          {banner.description || 'N/A'}
                        </td>
                        <td className='px-6 py-4'>
                          {(banner.created_at &&
                            new Date(banner.created_at).toDateString()) ||
                            'N/A'}
                        </td>
                        <td className='px-6 py-4 space-x-2'>
                          <Link
                            to='#'
                            onClick={() => {
                              setBanner(banner);
                              setIsOpen(true);
                            }}
                            className='font-medium text-green-400 bg-green-400 px-3 py-0.5 rounded-md hover:text-green-600 bg-opacity-10'
                          >
                            Edit
                          </Link>
                          <Link
                            to='#'
                            onClick={() => deleteBanner(banner)}
                            className='font-medium text-red-400 bg-red-400 px-3 py-0.5 rounded-md hover:text-red-600 bg-opacity-10'
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {banners.length > itemsPerPage && (
                  <div className='py-4 px-4 flex items-start justify-center'>
                    <ReactPaginate
                      onPageChange={paginate}
                      pageCount={Math.ceil(banners?.length / itemsPerPage)}
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
      <AddBanner isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
