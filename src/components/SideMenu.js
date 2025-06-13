'use client';

import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  MessageCircle,
  Calendar,
  Search,
  BarChart2,
  User,
  Settings,
  DollarSign,
} from 'lucide-react';

const studentMenu = [
  { label: 'My Lessons', icon: BookOpen, path: '/student/lessons' },
  { label: 'Messages', icon: MessageCircle, path: '/student/messages', badge: 3 },
//   { label: 'Schedule', icon: Calendar, path: '/student/schedule' },
//   { label: 'Find Tutors', icon: Search, path: '/student/explore' },
//   { label: 'Progress', icon: BarChart2, path: '/student/progress' },
  { label: 'Profile', icon: User, path: '/student/profile' },
  { label: 'Settings', icon: Settings, path: '/student/settings' },
];

const tutorMenu = [
  { label: 'Dashboard', icon: BookOpen, path: '/tutor/' },
  { label: 'Messages', icon: MessageCircle, path: '/tutor/messages', badge: 3 },
  { label: 'Schedule', icon: Calendar, path: '/tutor/schedule' },
  { label: 'Earnings', icon: DollarSign, path: '/tutor/earnings' },
  { label: 'Students', icon: User, path: '/tutor/students' },
  { label: 'Settings', icon: Settings, path: '/tutor/settings' },
];

const SideMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname.startsWith(path);
  const menuItems = user?.role === 'student' ? studentMenu : tutorMenu;

  return (<>
    <div className="w-64 space-y-6">
      <nav className="space-y-2">
        {menuItems.map(({ label, icon: Icon, path, badge }) => (
          <button
            key={path}
            onClick={() => router.push(path)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              isActive(path) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
            {badge && (
              <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
    </>
  );
};

export default SideMenu;
