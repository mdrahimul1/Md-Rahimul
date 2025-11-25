import React, { useMemo } from 'react';
import OrdersTable from './OrdersTable';
import { type Order } from '../types';

const OrdersPage: React.FC = () => {
    const ordersData: Order[] = useMemo(() => [
        { id: 'ORD001', customer: 'John Doe', date: '2024-07-20', amount: 250.00, status: 'Completed' },
        { id: 'ORD002', customer: 'Jane Smith', date: '2024-07-19', amount: 150.75, status: 'Pending' },
        { id: 'ORD003', customer: 'Sam Wilson', date: '2024-07-19', amount: 75.50, status: 'Completed' },
        { id: 'ORD004', customer: 'Chris Evans', date: '2024-07-18', amount: 25.00, status: 'Cancelled' },
        { id: 'ORD005', customer: 'Peter Parker', date: '2024-07-17', amount: 2890.50, status: 'Completed' },
        { id: 'ORD006', customer: 'Tony Stark', date: '2024-07-17', amount: 5500.00, status: 'Pending' },
        { id: 'ORD007', customer: 'Bruce Wayne', date: '2024-07-16', amount: 999.99, status: 'Completed' },
    ], []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">All Orders</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <OrdersTable orders={ordersData} />
      </div>
    </div>
  );
};

export default OrdersPage;
