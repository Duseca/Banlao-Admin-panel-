import { Link } from 'react-router-dom';
import Header from '../layouts/partials/header';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Spinner from '../components/Spinner';
import { useUserStore } from '../store';
import QueryModal from '../components/QueryModal';

const UserQueries = () => {
  const { isLoading, queries, fetchQueries } = useUserStore();
  const [originalQueries, setOriginalQueries] = useState([]);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentQueries = originalQueries?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const searchQueries = () => {
    if (search === '') {
      setOriginalQueries(queries);
    } else {
      const filteredQueries = originalQueries.filter(
        (queries) =>
          queries.name?.toLowerCase().includes(search.toLowerCase()) ||
          queries.email?.toLowerCase().includes(search.toLowerCase())
      );
      setOriginalQueries(filteredQueries);
    }
  };

  useEffect(() => {
    searchQueries();
  }, [search]);

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    if (queries.length > 0) {
      setOriginalQueries(queries);
    }
  }, [queries]);

  const queriesQueries = [
    {
      id: 1,
      queries: {
        name: 'John Smith',
        profilePic: 'https://randomqueries.me/api/portraits/men/1.jpg',
        email: 'john.smith@example.com',
      },
      query:
        'I want to know more about the New Jersey apartment before making a decision.',
      date: '08/08/2023',
      status: 'Pending',
    },
    {
      id: 2,
      queries: {
        name: 'Emma Wilson',
        profilePic: 'https://randomqueries.me/api/portraits/women/2.jpg',
        email: 'emma.wilson@example.com',
      },
      query:
        'Is the California villa still available? What are the payment terms?',
      date: '05/15/2023',
      status: 'Responded',
    },
    {
      id: 3,
      queries: {
        name: 'Alex Taylor',
        profilePic: 'https://randomqueries.me/api/portraits/men/3.jpg',
        email: 'alex.taylor@example.com',
      },
      query: 'Can I schedule a viewing for the Chicago studio this weekend?',
      date: '06/20/2023',
      status: 'Completed',
    },
    {
      id: 4,
      queries: {
        name: 'Olivia Martinez',
        profilePic: 'https://randomqueries.me/api/portraits/women/4.jpg',
        email: 'olivia.martinez@example.com',
      },
      query: 'What are the amenities included in the Miami apartment?',
      date: '07/10/2023',
      status: 'Pending',
    },
    {
      id: 5,
      queries: {
        name: 'Robert Garcia',
        profilePic: 'https://randomqueries.me/api/portraits/men/5.jpg',
        email: 'robert.garcia@example.com',
      },
      query: 'Is there any flexibility in the price for the Texas house?',
      date: '04/25/2023',
      status: 'Responded',
    },
  ];

  const [statusFilter, setStatusFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(null);

  const filteredQueries = queriesQueries.filter((query) => {
    return statusFilter === 'All' || query.status === statusFilter;
  });

  return (
    <div>
      <Header header={'Queries Queries'} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='flex flex-wrap gap-4 justify-between bg-white px-4 py-2'>
            <div className='max-w-xs w-full'>
              <div className='relative w-full sm:w-auto'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  className='block w-full px-4 py-2 outline-none pl-10 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Search queries...'
                  onChange={() => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4'>
              <select
                className='px-3 py-2 border text-xs rounded-md font-medium'
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value='All'>All Statuses</option>
                <option value='Pending'>Pending</option>
                <option value='Responded'>Responded</option>
                <option value='Completed'>Completed</option>
              </select>
              <button className='px-5 py-2 border text-xs rounded-md font-medium'>
                Download.csv
              </button>
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
                        Queries
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Query
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Date
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Status
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQueries.map((query) => (
                      <tr
                        key={query.id}
                        className='bg-white border-b hover:bg-gray-50'
                      >
                        <td className='px-6 py-4'>
                          <div className='flex items-center'>
                            <img
                              src={query.queries.profilePic}
                              alt={query.queries.name}
                              className='w-10 h-10 rounded-full mr-3'
                            />
                            <div>
                              <div className='font-medium'>
                                {query.queries.name}
                              </div>
                              <div className='text-gray-500 text-xs'>
                                {query.queries.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 max-w-xs'>
                          <div className='line-clamp-2'>{query.query}</div>
                        </td>
                        <td className='px-6 py-4'>{query.date}</td>
                        <td className='px-6 py-4'>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              query.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : query.status === 'Responded'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {query.status}
                          </span>
                        </td>
                        <td className='flex space-x-2 px-6 py-4'>
                          <Link
                            to={`#`}
                            onClick={() => {
                              setQuery(query);
                              setOpen(true);
                            }}
                            className='font-medium text-green-600 hover:text-green-900'
                          >
                            View
                          </Link>
                          <Link
                            to={`/queries/view/${query.id}`}
                            className='font-medium text-blue-600 hover:text-blue-900'
                          >
                            Chat
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {queries.length > itemsPerPage && (
                  <div className='py-4 px-4 flex items-start justify-center'>
                    <ReactPaginate
                      onPageChange={paginate}
                      pageCount={Math.ceil(queries?.length / itemsPerPage)}
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
      <QueryModal isOpen={open} setIsOpen={setOpen} query={query} />
    </div>
  );
};

export default UserQueries;
