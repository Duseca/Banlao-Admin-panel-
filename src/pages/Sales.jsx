import { Link } from 'react-router-dom';
import Header from '../layouts/partials/header';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Spinner from '../components/Spinner';
import { useSaleStore } from '../store';

const Sales = () => {
  const { isLoading, sales, fetchSales } = useSaleStore();
  const [originalSales, setOriginalSales] = useState([]);
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentSales = originalSales?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const searchSales = () => {
    if (search === '') {
      setOriginalSales(sales);
    } else {
      const filteredSales = originalSales.filter(
        (sale) =>
          sale.name?.toLowerCase().includes(search.toLowerCase()) ||
          sale.email?.toLowerCase().includes(search.toLowerCase())
      );
      setOriginalSales(filteredSales);
    }
  };

  useEffect(() => {
    searchSales();
  }, [search]);

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    if (sales.length > 0) {
      setOriginalSales(sales);
    }
  }, [sales]);

  const transactionData = [
    {
      id: 1,
      propertyName: 'New Jersey Apartment',
      transactionType: 'Rented',
      propertyType: 'Apartment',
      price: '$2,500/month',
      client: 'John Smith',
      agent: 'Sarah Johnson',
      date: '08/08/2023',
    },
    {
      id: 2,
      propertyName: 'Manhattan Office',
      transactionType: 'Sold',
      propertyType: 'Office',
      price: '$1,250,000',
      client: 'Tech Solutions Inc',
      agent: 'Michael Brown',
      date: '05/15/2023',
    },
    {
      id: 3,
      propertyName: 'California Villa',
      transactionType: 'Sold',
      propertyType: 'Villa',
      price: '$3,750,000',
      client: 'Emma Wilson',
      agent: 'David Lee',
      date: '06/20/2023',
    },
    {
      id: 4,
      propertyName: 'Chicago Studio',
      transactionType: 'Rented',
      propertyType: 'Studio',
      price: '$1,200/month',
      client: 'Alex Taylor',
      agent: 'Jessica Chen',
      date: '07/10/2023',
    },
    {
      id: 5,
      propertyName: 'Texas House',
      transactionType: 'Sold',
      propertyType: 'House',
      price: '$850,000',
      client: 'Robert Garcia',
      agent: 'Sarah Johnson',
      date: '04/25/2023',
    },
    {
      id: 6,
      propertyName: 'Miami Apartment',
      transactionType: 'Rented',
      propertyType: 'Apartment',
      price: '$2,100/month',
      client: 'Olivia Martinez',
      agent: 'Michael Brown',
      date: '09/01/2023',
    },
    {
      id: 7,
      propertyName: 'Seattle Office',
      transactionType: 'Rented',
      propertyType: 'Office',
      price: '$3,500/month',
      client: 'Digital Marketing Co',
      agent: 'David Lee',
      date: '08/15/2023',
    },
  ];

  // State for filter
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('All');

  // Filter the transactions based on selected filter
  const filteredTransactions = transactionData.filter((transaction) => {
    return (
      transactionTypeFilter === 'All' ||
      transaction.transactionType
        .toLowerCase()
        .includes(transactionTypeFilter.toLowerCase())
    );
  });

  return (
    <div>
      <Header header={'Sales & Rentals'} />
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
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full px-4 py-2 outline-none pl-10 text-sm text-gray-900 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Search transactions...'
                  onChange={() => setSearch(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4'>
              {/* Transaction Type Filter */}
              <select
                className='px-3 py-2 border text-xs rounded-md font-medium'
                value={transactionTypeFilter}
                onChange={(e) => setTransactionTypeFilter(e.target.value)}
              >
                <option value='All'>All Transactions</option>
                <option value='Sold'>Sold</option>
                <option value='Rented'>Rented</option>
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
                        Property
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Transaction Type
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Property Type
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Amount
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Client
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Agent
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
                    {currentSales.map((sale) => (
                      <tr
                        key={sale.id}
                        className='bg-white border-b hover:bg-gray-150/30'
                      >
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <h1 className='font-medium'>
                            {sale.propertyName || 'N/A'}
                          </h1>
                        </td>
                        <td className='px-6 py-4'>{sale.saleType || 'N/A'}</td>
                        <td className='px-6 py-4'>
                          {sale.propertyType || 'N/A'}
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex flex-col'>
                            <span className='font-semibold'>
                              {sale.price || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>{sale.client || 'N/A'}</td>
                        <td className='px-6 py-4'>{sale.agent || 'N/A'}</td>
                        <td className='px-6 py-4'>{sale.date || 'N/A'}</td>
                        <td className='px-6 py-4 space-x-2'>
                          <Link
                            to={`/sale/view`}
                            state={{ ...sale }}
                            className='font-medium text-gray-150 bg-gray-150 px-3 py-0.5 rounded-md hover:text-gray-250 bg-opacity-10'
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {sales.length > itemsPerPage && (
                  <div className='py-4 px-4 flex items-start justify-center'>
                    <ReactPaginate
                      onPageChange={paginate}
                      pageCount={Math.ceil(sales?.length / itemsPerPage)}
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
};

export default Sales;
