import { Fragment } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Typography } from '@/components/common/typography';
import YearPicker from '@/components/common/year-picker';
import Datepicker from '@/components/common/date-picker';
import cn from '@/utils/cn';

const SuperAdminDashboard = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-6">
      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-white">
        <article className="h-[101.46px] flex items-center gap-x-4 flex-1 p-6 border rounded-3xl cursor-pointer box-shadow bg-red-500">
          <img src="svgs/previous-shipments.svg" className="size-10" />
          <div className="flex flex-col justify-center">
            <Typography variant="body-small" className="font-semibold">
              Previous Shipments
            </Typography>
            <Typography variant="small">Quick Access To View Past Shipments</Typography>
          </div>
        </article>
        <article className="h-[101.46px] flex items-center gap-x-4 flex-1 p-6 border rounded-3xl cursor-pointer box-shadow bg-pink-400">
          <img src="svgs/volume-carrier.svg" className="size-10" />
          <div className="flex flex-col justify-center">
            <Typography variant="body-small" className="font-semibold">
              Volumne Carrier
            </Typography>
            <Typography variant="small">Carriers with the maximum number of shipments</Typography>
          </div>
        </article>
        <article className="h-[101.46px] flex items-center gap-x-4 flex-1 p-6 border rounded-3xl cursor-pointer box-shadow bg-cyan-400">
          <img src="svgs/invoices.svg" className="size-10" />
          <div className="flex flex-col justify-center">
            <Typography variant="body-small" className="font-semibold">
              invoices
            </Typography>
            <Typography variant="small">Overall billing detail on shipments</Typography>
          </div>
        </article>
      </div>

      {/* graphs */}
      <div className="w-full flex gap-x-6">
        <AccountsGraph />
        <TotalSystemUsageGraph />
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
        <Statuses />
      </div>
    </div>
  );
};

const AccountsGraph = () => {
  const handleYearChange = (year?: number) => {
    console.log(year);
  };

  const data = [
    { month: 'Jan', shipping: 4000, mailbox: 2400 },
    { month: 'Feb', shipping: 3000, mailbox: 1398 },
    { month: 'Mar', shipping: 2000, mailbox: 9800 },
    { month: 'Apr', shipping: 2780, mailbox: 3908 },
    { month: 'May', shipping: 1890, mailbox: 4800 },
    { month: 'Jun', shipping: 2390, mailbox: 3800 },
    { month: 'Jul', shipping: 3490, mailbox: 4300 },
    { month: 'Aug', shipping: 3200, mailbox: 3000 },
    { month: 'Sep', shipping: 3100, mailbox: 2700 },
    { month: 'Oct', shipping: 2900, mailbox: 4100 },
    { month: 'Nov', shipping: 3700, mailbox: 3200 },
    { month: 'Dec', shipping: 3900, mailbox: 3600 },
  ];

  return (
    <section className="w-7/12 flex flex-col gap-x-6 bg-white rounded-xl p-4 box-shadow">
      <div className="flex justify-between items-center">
        <Typography variant="body" className="font-semibold">
          Shipping Vs Mailbox Account
        </Typography>
        <YearPicker initialState={new Date().getFullYear()} callback={handleYearChange} />
      </div>
      <div className="w-full mt-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} ticks={[0, 2000, 4000, 6000, 8000, 10000]} />
            <Tooltip />
            <Line type="monotone" dataKey="shipping" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="mailbox" stroke="#f472b6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

const TotalSystemUsageGraph = () => {
  const handleStartChange = (date?: Date) => {
    console.log(date);
  };

  const handleEndChange = (date?: Date) => {
    console.log(date);
  };

  const data = [
    { name: 'Completed', value: 4000 },
    { name: 'Cancelled', value: 1500 },
  ];

  const COLORS = ['#63e88b', '#ef4444'];

  return (
    <section className="w-5/12 flex flex-col gap-x-6 bg-white rounded-xl p-4 box-shadow">
      <div className="flex flex-col gap-y-2 justify-between items-start">
        <Typography variant="body" className="font-semibold">
          Total System Usage
        </Typography>
        <div className="flex gap-x-2">
          <Datepicker callback={handleStartChange} />
          <Datepicker callback={handleEndChange} />
        </div>
      </div>
      <div className="w-full mt-2">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={110}
              innerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

const Statuses = () => {
  const statuses = [
    {
      icon: 'svgs/delayed.svg',
      title: 'Delayed',
      count: 0,
      borderColor: 'border-yellow-600',
      textColor: 'text-yellow-600',
    },
    {
      icon: 'svgs/exceptions.svg',
      title: 'Exceptions',
      count: 2,
      borderColor: 'border-blue-800',
      textColor: 'text-blue-800',
    },
    {
      icon: 'svgs/delayed.svg',
      title: 'Orders Created',
      count: 0,
      borderColor: 'border-gray-700',
      textColor: 'text-gray-700',
    },
    {
      icon: 'svgs/cancelled.svg',
      title: 'Cancelled',
      count: 0,
      borderColor: 'border-purple-800',
      textColor: 'text-purple-800',
    },
    {
      icon: 'svgs/on-time.svg',
      title: 'On Time',
      count: 0,
      borderColor: 'border-cyan-500',
      textColor: 'text-cyan-500',
    },
    {
      icon: 'svgs/delivered.svg',
      title: 'Delivered',
      count: 0,
      borderColor: 'border-green-600',
      textColor: 'text-green-600',
    },
    {
      icon: 'svgs/out-for-delivery.svg',
      title: 'Out for delivery',
      count: 0,
      borderColor: 'border-orange-500',
      textColor: 'text-orange-500',
    },
    {
      icon: 'svgs/out-for-delivery.svg',
      title: 'In Transit',
      count: 0,
      borderColor: 'border-orange-500',
      textColor: 'text-orange-500',
    },
  ];

  return (
    <Fragment>
      {statuses.map((status, index) => (
        <article
          key={index}
          className={cn(
            'bg-white flex items-center justify-between gap-x-4 px-6 py-4 rounded-2xl border',
            status.borderColor,
          )}
        >
          <div className="flex items-center gap-x-4">
            <img src={status.icon} className="size-6" alt={status.title} />
            <Typography variant="body-small" className="font-semibold">
              {status.title}
            </Typography>
          </div>
          <Typography variant="h3" className={status.textColor}>
            {status.count}
          </Typography>
        </article>
      ))}
    </Fragment>
  );
};

export default SuperAdminDashboard;
