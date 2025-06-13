'use client';

import { Menu as MenuIcon, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import AuthModal from './LoginPop';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { persistor } from '@/store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const dispatch=useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
 const router=useRouter();
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';
const logoutClick=()=>{
dispatch(logout());
persistor.purge();
router.push('/');
}

const handleClick=(type)=>{
    if(type=='dashboard'){
        if(user.role=='student'){
            router.push('/student');

        }else{
router.push('/tutor');

        }
    }

}


  return (
    <>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <Link href="/">TutorHub</Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/findtutor" className="text-gray-900 hover:text-blue-600 text-sm font-medium">Find Tutors</Link>
              <Link href="/teach" className="text-gray-900 hover:text-blue-600 text-sm font-medium">Become a Tutor</Link>
              <Link href="/about" className="text-gray-900 hover:text-blue-600 text-sm font-medium">How it Works</Link>
              <Link href="/pricing" className="text-gray-900 hover:text-blue-600 text-sm font-medium">Pricing</Link>
           
            </div>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-4">
                <button onClick={() => setIsOpen(true)} className="text-gray-900 hover:text-blue-600 px-4 py-2 text-sm font-medium">Log in</button>
                <button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">Sign up</button>
              </div>
            ) : (
              <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {initials}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
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
                          <button onClick={()=>handleClick('dashboard')} className={`block px-2 py-2 text-sm rounded-md ${active ? 'bg-gray-100' : ''}`}>Dasboard</button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/profile" className={`block px-2 py-2 text-sm rounded-md ${active ? 'bg-gray-100' : ''}`}>Profile</Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/change-password" className={`block px-2 py-2 text-sm rounded-md ${active ? 'bg-gray-100' : ''}`}>Change Password</Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={()=>logoutClick()} className={`w-full text-left px-2 py-2 text-sm rounded-md ${active ? 'bg-gray-100 text-red-600' : 'text-red-500'}`}>
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/findtutor" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Find Tutors</Link>
              <Link href="/becometutor" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Become a Tutor</Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">How it Works</Link>
              <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Pricing</Link>

              <div className="border-t pt-4 mt-4">
                {!isLoggedIn ? (
                  <>
                    <button onClick={() => setIsOpen(true)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Log in</button>
                    <button onClick={() => setIsOpen(true)} className="block w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-base font-medium">Sign up</button>
                  </>
                ) : (
                  <>
                    <Link href="/profile" className="block px-3 py-2 text-base text-gray-900 hover:text-blue-600">Profile</Link>
                    <button className="block w-full text-left px-3 py-2 text-base text-red-500 hover:text-red-600">Logout</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="spacer" style={{ padding: '32px' }}></div>
    </>
  );
};

export default Header;
