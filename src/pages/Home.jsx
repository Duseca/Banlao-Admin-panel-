import { Link } from "react-router-dom";
import Header from "../layouts/partials/header";
import { BsCartCheckFill } from "react-icons/bs";
import { HiMiniUsers } from "react-icons/hi2";
import ChartOne from "../components/chartOne";

export default function Home() {
  return (
    <div>
      <Header header={"Dashboard"} />
      <div className="max-w-screen-2xl mx-auto">
        <div className="mx-4 sm:mx-9 my-5">
          {/* <div className="flex justify-end pb-5">
            <DashboardFilter />
          </div> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6 2xl:grid-cols-4 2xl:gap-7">
            <Link to='/users' className="w-full">
              <div className="rounded-sm border border-stroke bg-white py-6 px-7 shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black bg-opacity-10">
                  <BsCartCheckFill className="w-6 h-6 text-gray-250" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black ">
                      456
                    </h4>
                    <span className="text-sm font-medium text-gray-500">Users</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    0.43%
                  </span>
                </div>
              </div>
            </Link>
            <Link to='/feedback' className="w-full">
              <div className="rounded-sm border border-stroke bg-white py-6 px-7 shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black bg-opacity-10">
                  <HiMiniUsers className="w-6 h-6 text-gray-250" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black ">
                      56
                    </h4>
                    <span className="text-sm font-medium text-gray-500">User Feedback</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    0.43%
                  </span>
                </div>
              </div>
            </Link>
            <Link to='/content' className="w-full">
              <div className="rounded-sm border border-stroke bg-white py-6 px-7 shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black bg-opacity-10">
                  <HiMiniUsers className="w-6 h-6 text-gray-250" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black ">
                      03
                    </h4>
                    <span className="text-sm font-medium text-gray-500">App Settings</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    0.43%
                  </span>
                </div>
              </div>
            </Link>
            <Link to='/faqs' className="w-full">
              <div className="rounded-sm border border-stroke bg-white py-6 px-7 shadow-lg">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black bg-opacity-10">
                  <HiMiniUsers className="w-6 h-6 text-gray-250" />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h4 className="text-title-md font-bold text-black ">
                      07
                    </h4>
                    <span className="text-sm font-medium text-gray-500">FAQs</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                    0.43%
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
            <ChartOne />
            {/* <ChartTwo /> */}
            {/* <ChartThree />
            <ChartFour /> */}
          </div>
        </div>
        {/* <div className="mx-4 sm:mx-9 my-8 rounded pt-8">
          <div className="my-4">
            <h1 className="font-bold text-2xl">Top Businesses</h1>
          </div>
          <div className="relative overflow-x-auto drop-shadow-xl bg-white sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase border-b-2 bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-orange-150/30">
                  <td className="px-6 py-4whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 border ring-gray-250" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="pizza" />
                      <h1 className="">Yael Bar-Meir Beauty Boutique</h1>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    (123)-456789
                  </td>
                  <td className="px-6 py-4">
                    jane@cita.com
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh. Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh.
                  </td>
                  <td className="px-6 py-4 truncate max-w-xs">
                    Details of the place - number of building/apartment/housing unit
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-orange-400 hover:underline">view</a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-orange-150/30">
                  <td className="px-6 py-4whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 border ring-gray-250" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="pizza" />
                      <h1 className="">Yael Bar-Meir Beauty Boutique</h1>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    (123)-456789
                  </td>
                  <td className="px-6 py-4">
                    jane@cita.com
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh. Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh.
                  </td>
                  <td className="px-6 py-4 truncate max-w-xs">
                    Details of the place - number of building/apartment/housing unit
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-orange-400 hover:underline">view</a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-orange-150/30">
                  <td className="px-6 py-4whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 border ring-gray-250" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="pizza" />
                      <h1 className="">Yael Bar-Meir Beauty Boutique</h1>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    (123)-456789
                  </td>
                  <td className="px-6 py-4">
                    jane@cita.com
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh. Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh.
                  </td>
                  <td className="px-6 py-4 truncate max-w-xs">
                    Details of the place - number of building/apartment/housing unit
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-orange-400 hover:underline">view</a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-orange-150/30">
                  <td className="px-6 py-4whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 border ring-gray-250" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="pizza" />
                      <h1 className="">Yael Bar-Meir Beauty Boutique</h1>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    (123)-456789
                  </td>
                  <td className="px-6 py-4">
                    jane@cita.com
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh. Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh.
                  </td>
                  <td className="px-6 py-4 truncate max-w-xs">
                    Details of the place - number of building/apartment/housing unit
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-orange-400 hover:underline">view</a>
                  </td>
                </tr>
                <tr className="bg-white border-b hover:bg-orange-150/30">
                  <td className="px-6 py-4whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <img className="w-10 h-10 rounded-full object-cover ring-2 border ring-gray-250" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="pizza" />
                      <h1 className="">Yael Bar-Meir Beauty Boutique</h1>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    (123)-456789
                  </td>
                  <td className="px-6 py-4">
                    jane@cita.com
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh. Lorem ipsum dolor sit , sectetur adipiscing elit. Phasellus lectus augue,  in efficitur a, ornare eget nibh.
                  </td>
                  <td className="px-6 py-4 truncate max-w-xs">
                    Details of the place - number of building/apartment/housing unit
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-orange-400 hover:underline">view</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </div>
  )
}
