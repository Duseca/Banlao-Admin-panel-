import { useState } from 'react';
import { FiCheck, FiX, FiDollarSign } from 'react-icons/fi';
import Header from '../layouts/partials/header';

export default function SaleView() {
  const [tipStatus, setTipStatus] = useState('pending'); // 'pending', 'approved', 'declined'

  const transaction = {
    id: 'TRX-2023-0456',
    propertyName: 'Modern Luxury Villa',
    transactionType: 'Sold',
    propertyType: 'Villa',
    price: '$1,250,000',
    commission: '$25,000',
    client: 'John Smith',
    clientContact: 'john.smith@example.com | (555) 123-4567',
    agent: 'Sarah Johnson',
    agentContact: 'sarah.j@realestate.com | (555) 987-6543',
    date: 'June 15, 2023',
    status: 'Completed',
    description:
      'This transaction was completed after 3 weeks of negotiation. The client was particularly interested in the ocean view and modern amenities. Final sale price was 5% below asking after inspection findings.',
    tip: {
      amount: '$500',
      message: 'Thank you for your exceptional service throughout the process!',
      date: 'June 16, 2023',
      status: tipStatus,
    },
  };

  const handleApproveTip = () => {
    setTipStatus('approved');
    // API call would go here
  };

  const handleDeclineTip = () => {
    setTipStatus('declined');
    // API call would go here
  };

  return (
    <div>
      <Header header={'Transaction Details'} link={'/sales'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='space-y-1.5'>
            <div className='bg-white px-4 rounded-md'>
              <div className='flex justify-between items-center py-2'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-sm cursor-pointer border-b border-gray-250 font-medium'>
                    Transaction Information
                  </h3>
                </div>
              </div>
            </div>

            <div className='bg-white max-w-2xl px-4 xl:px-6 py-5'>
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className='text-2xl font-semibold'>
                    {transaction.propertyName}
                  </h2>
                  <p className='text-gray-600 mt-1'>
                    Transaction ID: {transaction.id}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {transaction.status}
                </span>
              </div>

              <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='text-lg font-semibold mb-3'>
                    Transaction Details
                  </h4>
                  <div className='space-y-3'>
                    <div>
                      <p className='text-xs text-gray-600'>Transaction Type</p>
                      <p className='text-sm font-medium'>
                        {transaction.transactionType}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>Property Type</p>
                      <p className='text-sm font-medium'>
                        {transaction.propertyType}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>Sale Price</p>
                      <p className='text-sm font-medium'>{transaction.price}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>Commission</p>
                      <p className='text-sm font-medium'>
                        {transaction.commission}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>Date</p>
                      <p className='text-sm font-medium'>{transaction.date}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className='text-lg font-semibold mb-3'>
                    Parties Involved
                  </h4>
                  <div className='space-y-3'>
                    <div>
                      <p className='text-xs text-gray-600'>Client</p>
                      <p className='text-sm font-medium'>
                        {transaction.client}
                      </p>
                      <p className='text-xs text-gray-500 mt-1'>
                        {transaction.clientContact}
                      </p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-600'>Agent</p>
                      <p className='text-sm font-medium'>{transaction.agent}</p>
                      <p className='text-xs text-gray-500 mt-1'>
                        {transaction.agentContact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip Approval Section */}
            <div className='bg-white w-full max-w-2xl'>
              <div className='border-b px-4 xl:px-6 py-3'>
                <h5 className='uppercase text-xl font-bold flex items-center gap-2'>
                  <FiDollarSign className='text-lg' />
                  Tip Approval
                </h5>
              </div>
              <div className='px-4 xl:px-6 py-8'>
                <div
                  className={`p-6 rounded-lg ${
                    tipStatus === 'approved'
                      ? 'bg-green-50'
                      : tipStatus === 'declined'
                      ? 'bg-red-50'
                      : 'bg-blue-50'
                  }`}
                >
                  <div className='space-y-4'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h4 className='font-medium text-lg'>
                          Tip Amount: {transaction.tip.amount}
                        </h4>
                        <p className='text-gray-600 mt-1'>From Client</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tipStatus === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : tipStatus === 'declined'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {tipStatus === 'approved'
                          ? 'Approved'
                          : tipStatus === 'declined'
                          ? 'Declined'
                          : 'Pending Approval'}
                      </span>
                    </div>

                    <div className='bg-white p-4 rounded-md border'>
                      <p className='font-medium mb-2'>Client's Message:</p>
                      <p className='text-gray-700'>
                        "{transaction.tip.message}"
                      </p>
                    </div>

                    <div className='text-sm text-gray-500'>
                      Submitted: {transaction.tip.date}
                    </div>

                    {tipStatus === 'pending' && (
                      <div className='flex gap-3 mt-4 pt-4 border-t'>
                        <button
                          onClick={handleApproveTip}
                          className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition'
                        >
                          <FiCheck /> Approve Tip
                        </button>
                        <button
                          onClick={handleDeclineTip}
                          className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
                        >
                          <FiX /> Decline Tip
                        </button>
                      </div>
                    )}

                    {(tipStatus === 'approved' || tipStatus === 'declined') && (
                      <div className='mt-4 pt-4 border-t text-sm text-gray-500'>
                        {tipStatus === 'approved'
                          ? 'You approved this tip on ' +
                            new Date().toLocaleDateString()
                          : 'You declined this tip on ' +
                            new Date().toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white w-full max-w-2xl'>
              <div className='border-b px-4 xl:px-6 py-3'>
                <h5 className='uppercase text-xl font-bold'>
                  Transaction Notes
                </h5>
              </div>
              <div className='px-4 xl:px-6 py-8'>
                <p className='text-gray-700'>{transaction.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
