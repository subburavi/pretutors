'use client';
import {
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';
import { persistor } from '@/store';

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

    const dispatch=useDispatch();
    const router=useRouter();
const logoutClick=()=>{
dispatch(logout());
persistor.purge();
router.push('/');
}
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <span className="text-xl font-bold text-gray-900"><Link href="/">TutorHub</Link></span>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                  {user.avathar ? (
                    <img
                      src={user.avathar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                      {initials}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{user.name || 'User'}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                  <div className="px-1 py-1">
                     <Menu.Item>
                      {({ active }) => (
                       <Link href={'/student'}> <button  
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Dashboard
                        </button></Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Change Password
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button 
                        onClick={()=>logoutClick()}
                          className={`${
                            active ? 'bg-gray-100 text-red-600' : 'text-red-500'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
