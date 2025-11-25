
import React from 'react';
import { type Order } from '../types';

interface OrdersTableProps {
  orders: Order[];
}

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-semibold';
  let specificClasses = '';

  switch (status) {
    case 'Completed':
      specificClasses = 'bg-green-500/20 text-green-400';
      break;
    case 'Pending':
      specificClasses = 'bg-yellow-500/20 text-yellow-400';
      break;
    case 'Cancelled':
      specificClasses = 'bg-red-500/20 text-red-400';
      break;
  }

  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};


const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b border-gray-600 text-sm text-gray-400">
          <tr>
            <th className="py-3 px-4 font-semibold">Order ID</th>
            <th className="py-3 px-4 font-semibold">Customer</th>
            <th className="py-3 px-4 font-semibold">Date</th>
            <th className="py-3 px-4 font-semibold">Amount</th>
            <th className="py-3 px-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50">
              <td className="py-3 px-4 font-mono text-primary">{order.id}</td>
              <td className="py-3 px-4">{order.customer}</td>
              <td className="py-3 px-4">{order.date}</td>
              <td className="py-3 px-4 font-medium">${order.amount.toFixed(2)}</td>
              <td className="py-3 px-4">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
