'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { fetchOrdersByUserId } from '@/app/redux/orderSlice';
import { RootState, AppDispatch } from '@/app/redux/store';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { checkAuth } from '@/app/redux/authSlice';
import Image from 'next/image';
import { Order, OrderItem } from '@/app/data/orderTypes'; // Ensure this import points to the correct file

const OrderHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items, loading, error } = useSelector((state: RootState) => state.orders);
  const router = useRouter();

  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('desc');
  const [filterByStatus, setFilterByStatus] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  useEffect(() => {
    if (token && !user?.id) {
      dispatch(checkAuth());
    }
  }, [token, user, dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  // Sort and filter orders
  const sortedAndFilteredOrders = [...items]
    .filter((order: Order) => filterByStatus === 'ALL' || order.status === filterByStatus)
    .sort((a: Order, b: Order) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return sortBy === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedAndFilteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(sortedAndFilteredOrders.length / ordersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleOrderItems = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleOrderClick = (orderId: string) => {
    router.push(`/order-confirmation/${orderId}`);
  };

  const checkPaymentStatus = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'COMPLETED':
        return 'Completed';
      case 'PENDING':
        return 'Pending';
      case 'NOT_COMPLETED':
        return 'Not Completed';
      case 'FAILED':
        return 'Failed';
      default:
        return 'Failed';
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (sortedAndFilteredOrders.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">No Orders Found</h2>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping now!</p>
        <Button onClick={() => router.push('/products')}>Go to Products</Button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Order History</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-auto">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</Label>
          <Select value={sortBy} onValueChange={(value: 'asc' | 'desc') => setSortBy(value)}>
            <SelectTrigger className="w-full md:w-[180px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-auto">
          <Label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status:</Label>
          <Select value={filterByStatus} onValueChange={(value: string) => setFilterByStatus(value)}>
            <SelectTrigger className="w-full md:w-[180px] bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {currentOrders.map((order: Order) => (
          <div key={order.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p
                  className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                  onClick={() => handleOrderClick(order.orderId)}
                >
                  Order #{order.orderId}
                </p>
                <p className="text-sm text-gray-600">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Total: LKR {order.totalAmount}</p>
                <div className="flex gap-4">
                  <p
                    className={`text-sm font-semibold ${
                      order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'
                    }`}
                  >
                    Status: {order.status}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      order.paymentStatus === 'COMPLETED'
                        ? 'text-green-600'
                        : order.paymentStatus === 'PENDING'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    Payment: {checkPaymentStatus(order.paymentStatus)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => toggleOrderItems(order.id)}
              >
                {expandedOrderId === order.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </Button>
            </div>

            {/* Order Items Dropdown */}
            {expandedOrderId === order.id && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Order Items:</h3>
                <ul className="space-y-4">
                  {order.OrderItems?.map((item: OrderItem) => {
                    const discountAmount = (item.Product?.discountPercentage / 100) * item.price;
                    const discountedPrice = item.price - discountAmount;
                    return (
                      <li key={item.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 relative">
                            <Image
                              src={item.Product?.images[0]}
                              alt={item.Product?.name}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                          {/* Product Details */}
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{item.Product?.name}</p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <p className="text-gray-600">Size: {item.size}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-gray-600 line-through">LKR {item.price}</p>
                              <p className="text-green-600 font-semibold">LKR {discountedPrice.toFixed(2)}</p>
                              <p className="text-sm text-red-600">({item.Product?.discountPercentage}% off)</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="mx-2 px-4 py-2 rounded-lg"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="mx-4 flex items-center text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          className="mx-2 px-4 py-2 rounded-lg"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrderHistory;