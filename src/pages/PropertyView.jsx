import { useEffect, useState } from 'react';
import { FiArrowLeft, FiZoomIn, FiX } from 'react-icons/fi';
import Header from '../layouts/partials/header';
import { useLocation } from 'react-router-dom';
import { usePropertyStore } from '../store';

export default function PropertyView() {
  const stateProperty = useLocation().state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [property, setProperty] = useState(null);
  const { blockProperty } = usePropertyStore();

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const handleBlockProperty = async () => {
    if (!property) return;
    try {
      const updatedProperty = await blockProperty(
        property.id,
        property.isBlocked
      );
      setProperty(updatedProperty);
    } catch (error) {
      console.error('Error blocking/unblocking property:', error);
    }
  };

  useEffect(() => {
    if (stateProperty) {
      setProperty(stateProperty);
    }
  }, [stateProperty]);

  return (
    <div>
      <Header header={'Property? Details'} link={'/properties'} arrow={true} />
      <div className='max-w-screen-2xl mx-auto'>
        <div className='mx-4 sm:mx-9 my-3'>
          <div className='space-y-1.5'>
            <div className='bg-white px-4 rounded-md'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <h3 className='text-sm py-2 cursor-pointer border-b border-gray-250 font-medium'>
                    Property Information
                  </h3>
                </div>
                <div>
                  <button
                    onClick={handleBlockProperty}
                    className={`px-5 py-1 border text-sm rounded-md font-semibold ${
                      property?.isBlocked
                        ? 'bg-green-500 text-white'
                        : 'text-gray-250'
                    }`}
                  >
                    {property?.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </div>
              </div>
            </div>

            <div className='bg-white max-w-2xl px-4 xl:px-6 py-5 relative'>
              <div className='relative'>
                <img
                  className='w-full h-64 md:h-80 rounded-lg object-cover'
                  src={property?.images[0]}
                  alt='property main'
                  loading='lazy'
                />
                <button
                  onClick={() => openModal(property?.images[0])}
                  className='absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition'
                >
                  <FiZoomIn className='text-gray-700' />
                </button>
              </div>
              <h2 className='text-2xl font-semibold mt-4'>{property?.title}</h2>
              <p className='text-gray-600 mt-2'>{property?.location}</p>
              <div className='flex items-center mt-2'>
                <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded'>
                  {property?.type === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
                <span className='ml-2 text-xl font-bold'>
                  {property?.price}
                </span>
              </div>
            </div>

            <div className='bg-white w-full max-w-2xl'>
              <div className='border-b px-4 xl:px-6 py-3'>
                <div>
                  <h5 className='uppercase text-xl font-bold'>
                    Property? Details
                  </h5>
                </div>
              </div>
              <div className='px-4 xl:px-6 py-8 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4'>
                <div>
                  <p className='text-xs text-gray-600'>Bedrooms</p>
                  <h6 className='text-sm font-medium'>{property?.bedrooms}</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Bathrooms</p>
                  <h6 className='text-sm font-medium'>{property?.bathrooms}</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Area</p>
                  <h6 className='text-sm font-medium'>{property?.area}</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Type</p>
                  <h6 className='text-sm font-medium capitalize'>
                    {property?.type}
                  </h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Price</p>
                  <h6 className='text-sm font-medium'>{property?.price}</h6>
                </div>
                <div>
                  <p className='text-xs text-gray-600'>Location</p>
                  <h6 className='text-sm font-medium'>{property?.location}</h6>
                </div>
              </div>
            </div>

            <div className='bg-white w-full max-w-2xl'>
              <div className='border-b px-4 xl:px-6 py-3'>
                <div>
                  <h5 className='uppercase text-xl font-bold'>Description</h5>
                </div>
              </div>
              <div className='px-4 xl:px-6 py-8'>
                <p className='text-gray-700'>{property?.description}</p>
              </div>
            </div>

            <div className='bg-white w-full max-w-2xl'>
              <div className='border-b px-4 xl:px-6 py-3'>
                <div>
                  <h5 className='uppercase text-xl font-bold'>Gallery</h5>
                </div>
              </div>
              <div className='px-4 xl:px-6 py-8 grid grid-cols-2 md:grid-cols-3 gap-4'>
                {property?.images?.map((image, index) => (
                  <div
                    key={index}
                    className='relative group cursor-pointer'
                    onClick={() => openModal(image)}
                  >
                    <img
                      className='w-full h-32 object-cover rounded-lg'
                      src={image}
                      alt={`property? ${index + 1}`}
                      loading='lazy'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition flex items-center justify-center rounded-lg'>
                      <FiZoomIn className='text-white opacity-0 group-hover:opacity-100 transition text-2xl' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black bg-opacity-75'
            onClick={closeModal}
          ></div>

          <div className='relative z-50 max-w-4xl w-full mx-4'>
            <button
              onClick={closeModal}
              className='absolute -right-3 -top-3 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition'
            >
              <FiX className='w-6 h-6 text-gray-800' />
            </button>

            <img
              src={selectedImage}
              alt='property? full view'
              className='w-full max-h-[90vh] object-contain rounded-lg'
            />
          </div>
        </div>
      )}
    </div>
  );
}
