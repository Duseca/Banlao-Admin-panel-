import { Link } from 'react-router-dom';
import Header from '../layouts/partials/header';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Spinner from '../components/Spinner';
import { useUserStore } from '../store';

export default function Users() {
  const { isLoading, users, fetchUsers } = useUserStore();
  const [originalUsers, setOriginalUsers] = useState([]);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentUsers = originalUsers?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const searchUsers = () => {
    if (search === '') {
      setOriginalUsers(users);
    } else {
      const filteredUsers = originalUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase())
      );
      setOriginalUsers(filteredUsers);
    }
  };

  useEffect(() => {
    searchUsers();
  }, [search]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      setOriginalUsers(users);
    }
  }, [users]);

  return (
    <div>
      <Header header={'Manage Users'} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='flex flex-wrap gap-4 justify-between bg-white px-4 py-2'>
            <div className='max-w-xs w-full'>
              {/* <button className="rounded-md w-full sm:w-auto bg-orange-150 text-white px-6 py-2 text-lg font-medium capitalize">Add category</button> */}
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
                  placeholder='Search users...'
                  onChange={() => setSearch(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4'>
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
                        name
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        email
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Phn. No
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        location
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
                    {currentUsers.map((user) => (
                      <tr
                        key={user.id}
                        className='bg-white border-b hover:bg-gray-150/30'
                      >
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center space-x-2'>
                            <img
                              src={user.profileImage}
                              alt='user'
                              className='w-8 h-8 rounded-full object-cover'
                            />
                            <h1 className=''>{user.name || 'N/A'}</h1>
                          </div>
                        </td>
                        <td className='px-6 py-4'>{user.email || 'N/A'}</td>
                        <td className='px-6 py-4'>{user.phoneNo || 'N/A'}</td>
                        <td className='px-6 py-4'>{user.location || 'N/A'}</td>
                        <td className='px-6 py-4'>
                          {(user.created_at &&
                            new Date(user.created_at).toDateString()) ||
                            'N/A'}
                        </td>
                        <td className='px-6 py-4 space-x-2'>
                          <Link
                            to='/users/view'
                            state={{ ...user }}
                            className='font-medium text-gray-150 bg-gray-150 px-3 py-0.5 rounded-md hover:text-gray-250 bg-opacity-10'
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length > itemsPerPage && (
                  <div className='py-4 px-4 flex items-start justify-center'>
                    <ReactPaginate
                      onPageChange={paginate}
                      pageCount={Math.ceil(users?.length / itemsPerPage)}
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
    </div>
  );
}
