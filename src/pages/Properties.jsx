import { Link } from 'react-router-dom';
import Header from '../layouts/partials/header';
import { useState } from 'react';

const Properties = () => {
  // Sample property data
  const propertyData = [
    {
      id: 1,
      name: 'New Jersey Apartment',
      type: 'Rent',
      propertyType: 'Apartment',
      area: '500 sqm',
      bedrooms: 4,
      bathrooms: 3,
      location: 'New Jersey',
      date: '08/08/2025',
      active: true,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    },
    {
      id: 2,
      name: 'Manhattan Office',
      type: 'Sale',
      propertyType: 'Office',
      area: '350 sqm',
      bedrooms: 2,
      bathrooms: 2,
      location: 'New York',
      date: '05/15/2025',
      active: true,
      image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg',
    },
    {
      id: 3,
      name: 'California Villa',
      type: 'Sale',
      propertyType: 'Villa',
      area: '800 sqm',
      bedrooms: 5,
      bathrooms: 4,
      location: 'Los Angeles',
      date: '06/20/2025',
      active: false,
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
    },
    {
      id: 4,
      name: 'Chicago Studio',
      type: 'Rent',
      propertyType: 'Studio',
      area: '250 sqm',
      bedrooms: 1,
      bathrooms: 1,
      location: 'Chicago',
      date: '07/10/2025',
      active: true,
      image: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg',
    },
    {
      id: 5,
      name: 'Texas House',
      type: 'Sale',
      propertyType: 'House',
      area: '600 sqm',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Houston',
      date: '04/25/2025',
      active: false,
      image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
    },
    {
      id: 6,
      name: 'Miami Apartment',
      type: 'Rent',
      propertyType: 'Apartment',
      area: '450 sqm',
      bedrooms: 2,
      bathrooms: 2,
      location: 'Miami',
      date: '09/01/2025',
      active: true,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    },
    {
      id: 7,
      name: 'Seattle Office',
      type: 'Rent',
      propertyType: 'Office',
      area: '400 sqm',
      bedrooms: 3,
      bathrooms: 2,
      location: 'Seattle',
      date: '08/15/2025',
      active: true,
      image: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg',
    },
  ];

  // State for filters
  const [activeFilter, setActiveFilter] = useState('All');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('All');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('All');

  // Filter the properties based on selected filters
  const filteredProperties = propertyData.filter((property) => {
    return (
      (activeFilter === 'All' ||
        (activeFilter === 'Active' && property.active) ||
        (activeFilter === 'Inactive' && !property.active)) &&
      (propertyTypeFilter === 'All' ||
        property.propertyType === propertyTypeFilter) &&
      (transactionTypeFilter === 'All' ||
        property.type === transactionTypeFilter)
    );
  });

  return (
    <div>
      <Header header={'Manage Properties'} />
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
                  placeholder='Search properties...'
                  required
                />
              </div>
            </div>
            <div className='flex flex-col w-full sm:w-auto sm:flex-row sm:items-center gap-4'>
              {/* Status Filter */}
              <select
                className='px-3 py-2 border text-xs rounded-md font-medium'
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value='All'>All Statuses</option>
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
              </select>

              {/* Property Type Filter */}
              <select
                className='px-3 py-2 border text-xs rounded-md font-medium'
                value={propertyTypeFilter}
                onChange={(e) => setPropertyTypeFilter(e.target.value)}
              >
                <option value='All'>All Types</option>
                <option value='Apartment'>Apartment</option>
                <option value='Office'>Office</option>
                <option value='Villa'>Villa</option>
                <option value='Studio'>Studio</option>
                <option value='House'>House</option>
              </select>

              {/* Transaction Type Filter */}
              <select
                className='px-3 py-2 border text-xs rounded-md font-medium'
                value={transactionTypeFilter}
                onChange={(e) => setTransactionTypeFilter(e.target.value)}
              >
                <option value='All'>All Transactions</option>
                <option value='Rent'>Rent</option>
                <option value='Sale'>Sale</option>
              </select>

              <button className='px-5 py-2 border text-xs rounded-md font-medium'>
                Download.csv
              </button>
            </div>
          </div>
          <div className='my-3'>
            <div className='relative overflow-x-auto drop-shadow-xl bg-white sm:rounded-lg'>
              <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase border-b-2 bg-white'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Type
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Property Type
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Area
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Bedrooms/Bathrooms
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Location
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Status
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
                  {filteredProperties.map((property) => (
                    <tr
                      key={property.id}
                      className='bg-white border-b hover:bg-gray-150/30'
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center space-x-2'>
                          <img
                            src={property.image}
                            alt={property.name}
                            className='w-8 h-8 rounded-full object-cover'
                          />
                          <h1 className=''>{property.name}</h1>
                        </div>
                      </td>
                      <td className='px-6 py-4'>{property.type}</td>
                      <td className='px-6 py-4'>{property.propertyType}</td>
                      <td className='px-6 py-4'>{property.area}</td>
                      <td className='px-6 py-4'>
                        {property.bedrooms + ' bedrooms'} /{' '}
                        {property.bathrooms + ' bathrooms'}
                      </td>
                      <td className='px-6 py-4'>{property.location}</td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            property.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {property.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>{property.date}</td>
                      <td className='px-6 py-4 space-x-2'>
                        <Link
                          to='/property/view'
                          className='font-medium text-gray-150 bg-gray-150 px-3 py-0.5 rounded-md hover:text-gray-250 bg-opacity-10'
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
