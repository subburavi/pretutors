'use client';
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MessageCircle, 
  RotateCcw, 
  X, 
  Star, 
  Download, 
  Search,
  Filter,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  MoreVertical,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Award,
  Bell,
  Eye,
  ArrowUp,
  ArrowDown,
  Activity,
  CreditCard,
  Banknote,
  RefreshCw,
  FileText,
  ChevronDown,
  CalendarDays
} from 'lucide-react';

const TutorEarningsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [chartView, setChartView] = useState('earnings');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for earnings
  const earningsSummary = {
    totalEarned: 52000,
    amountSettled: 48000,
    pendingPayout: 3500,
    refunded: 500
  };

  // Mock chart data
  const chartData = {
    earnings: [
      { date: 'Jun 1', amount: 2500 },
      { date: 'Jun 2', amount: 3200 },
      { date: 'Jun 3', amount: 2800 },
      { date: 'Jun 4', amount: 3500 },
      { date: 'Jun 5', amount: 2200 },
      { date: 'Jun 6', amount: 4100 },
      { date: 'Jun 7', amount: 2900 }
    ],
    refunds: [
      { date: 'Jun 1', amount: 0 },
      { date: 'Jun 2', amount: 750 },
      { date: 'Jun 3', amount: 0 },
      { date: 'Jun 4', amount: 0 },
      { date: 'Jun 5', amount: 500 },
      { date: 'Jun 6', amount: 0 },
      { date: 'Jun 7', amount: 250 }
    ],
    payouts: [
      { date: 'Jun 1', amount: 8000 },
      { date: 'Jun 2', amount: 0 },
      { date: 'Jun 3', amount: 12000 },
      { date: 'Jun 4', amount: 0 },
      { date: 'Jun 5', amount: 0 },
      { date: 'Jun 6', amount: 15000 },
      { date: 'Jun 7', amount: 0 }
    ]
  };

  // Mock transactions data
  const transactionsData = [
    {
      id: 1,
      date: 'June 4, 2025',
      student: 'Riya M.',
      subject: 'Physics',
      classType: '1-on-1 Trial',
      amount: 500,
      status: 'settled',
      paymentMode: 'UPI'
    },
    {
      id: 2,
      date: 'June 3, 2025',
      student: 'Aarav S.',
      subject: 'Chemistry',
      classType: 'Group Class',
      amount: 1000,
      status: 'pending',
      paymentMode: 'Bank Transfer'
    },
    {
      id: 3,
      date: 'June 2, 2025',
      student: 'Neha J.',
      subject: 'English',
      classType: 'Cancelled',
      amount: 750,
      status: 'refunded',
      paymentMode: 'Credit Card'
    },
    {
      id: 4,
      date: 'June 1, 2025',
      student: 'Arjun K.',
      subject: 'Mathematics',
      classType: '1-on-1 Regular',
      amount: 800,
      status: 'settled',
      paymentMode: 'UPI'
    },
    {
      id: 5,
      date: 'May 31, 2025',
      student: 'Priya S.',
      subject: 'Biology',
      classType: 'Group Class',
      amount: 1200,
      status: 'settled',
      paymentMode: 'Bank Transfer'
    },
    {
      id: 6,
      date: 'May 30, 2025',
      student: 'Rohit M.',
      subject: 'Physics',
      classType: '1-on-1 Trial',
      amount: 500,
      status: 'pending',
      paymentMode: 'UPI'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'settled': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'refunded': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'settled': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <AlertCircle className="w-3 h-3" />;
      case 'refunded': return <XCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'settled': return 'Settled';
      case 'pending': return 'Pending';
      case 'refunded': return 'Refunded';
      default: return status;
    }
  };

  const EarningsCard = ({ icon: Icon, title, value, subtitle, color = "blue", trend, trendValue }) => {
    const colorClasses = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
      indigo: "from-indigo-500 to-indigo-600",
      red: "from-red-500 to-red-600"
    };

    return (
      <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-2">
          <div className={`w-8 h-8 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">₹{value.toLocaleString()}</h3>
          <p className="text-xs text-gray-600 mt-1">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    );
  };

  const SimpleChart = ({ data, type = "bar", color = "blue" }) => {
    const maxValue = Math.max(...data.map(d => d.amount));
    
    if (maxValue === 0) {
      return (
        <div className="flex items-center justify-center h-16 text-gray-500">
          <span className="text-xs">No data for selected period</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-end space-x-1 sm:space-x-2 h-16">
        {data.map((item, index) => {
          const height = (item.amount / maxValue) * 48;
          return (
            <div key={index} className="flex flex-col items-center space-y-1 flex-1">
              <div 
                className={`w-full bg-gradient-to-t from-${color}-400 to-${color}-500 rounded-t-sm transition-all duration-500`}
                style={{ height: `${height}px` }}
              ></div>
              <span className="text-xs text-gray-600 hidden sm:block">{item.date}</span>
              <span className="text-xs text-gray-600 sm:hidden">{item.date.split(' ')[1]}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const filteredTransactions = transactionsData.filter(transaction =>
    transaction.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.classType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto rounded-lg bg-white shadow p-3 sm:p-4 lg:p-6">
      <div className="space-y-4 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Earnings Overview</span>
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">Track your teaching income and payouts</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 font-medium text-xs transition-colors">
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Export Report</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <EarningsCard
            icon={DollarSign}
            title="Total Earned"
            value={earningsSummary.totalEarned}
            subtitle="Total earnings since joining"
            color="green"
            trend="up"
            trendValue="₹5,200"
          />
          
          <EarningsCard
            icon={Banknote}
            title="Amount Settled"
            value={earningsSummary.amountSettled}
            subtitle="Transferred to your account"
            color="blue"
          />
          
          <EarningsCard
            icon={Clock}
            title="Pending Payout"
            value={earningsSummary.pendingPayout}
            subtitle="Scheduled for next transfer"
            color="orange"
          />
          
          <EarningsCard
            icon={RefreshCw}
            title="Refunded"
            value={earningsSummary.refunded}
            subtitle="Refunds due to cancellations"
            color="red"
          />
        </div>

        {/* Period Filter */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Earnings Period</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-7 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                >
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <CalendarDays className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Earnings Summary</h3>
            <div className="flex items-center space-x-1">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                {[
                  { id: 'earnings', label: 'Earnings', color: 'green' },
                  { id: 'refunds', label: 'Refunds', color: 'red' },
                  { id: 'payouts', label: 'Payouts', color: 'blue' }
                ].map(view => (
                  <button
                    key={view.id}
                    onClick={() => setChartView(view.id)}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      chartView === view.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <SimpleChart 
            data={chartData[chartView]} 
            type="bar" 
            color={chartView === 'earnings' ? 'green' : chartView === 'refunds' ? 'red' : 'blue'} 
          />
          
          <div className="mt-3 text-xs text-gray-600 text-center">
            Total {chartView}: ₹{chartData[chartView].reduce((sum, day) => sum + day.amount, 0).toLocaleString()}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-3 sm:p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">Transaction History</h3>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs w-full"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Subject</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Class Type</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Payment</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-3 text-xs text-gray-900">{transaction.date}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {transaction.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs font-medium text-gray-900">{transaction.student}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-xs font-medium text-blue-600 hidden sm:table-cell">{transaction.subject}</td>
                    <td className="py-2 px-3 text-xs text-gray-600 hidden lg:table-cell">{transaction.classType}</td>
                    <td className="py-2 px-3 text-xs font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</td>
                    <td className="py-2 px-3">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span className="hidden sm:inline">{getStatusText(transaction.status)}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-xs text-gray-600 hidden md:table-cell">{transaction.paymentMode}</td>
                    <td className="py-2 px-3">
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600 text-sm">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorEarningsPage;