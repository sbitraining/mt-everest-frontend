'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Clock, CheckCircle, Truck, MapPin, Calendar, User, ShoppingBag, AlertCircle } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  orderDate: string;
  estimatedDelivery: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
  total: number;
  trackingNumber: string | null;
  shippingAddress: string;
}

interface StatusInfo {
  icon: React.ReactElement;
  text: string;
  color: string;
  bgColor: string;
}

export default function CustomerOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Fetch real orders from Django backend
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        router.push('/authentication/login');
        return;
      }
      try {
        setLoading(true);
        const res = await fetch('http://127.0.0.1:8000/api/orders/paid/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to fetch orders');
        }

        const data = await res.json();

        // ✅ map backend JSON to frontend Order[]
        const formatted: Order[] = data.map((o: any) => ({
          id: String(o.id),
          items: o.items.map((i: any) => ({
            name: i.name,
            quantity: i.quantity,
            price: parseFloat(i.price),
            image: i.image || '',  // replace with a real image if available in backend
          })),
          orderDate: o.created_at,
          estimatedDelivery: o.created_at, // or another field if you store delivery date
          status: o.payment_status,
          total: parseFloat(o.total_amount),
          trackingNumber: null,
          shippingAddress: `${o.address}, ${o.city}, ${o.state}, ${o.country}`,
        }));

        setOrders(formatted);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  // ✅ Status styling helper
 const getStatusInfo = (paymentStatus: string): StatusInfo => {
  switch (paymentStatus) {
    case 'processing':
      return {
        icon: <Clock className="w-5 h-5" />,
        text: 'Processing',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        bgColor: 'bg-yellow-50',
      };
    case 'confirmed':
      return {
        icon: <CheckCircle className="w-5 h-5" />,
        text: 'Confirmed',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        bgColor: 'bg-blue-50',
      };
    case 'shipped':
      return {
        icon: <Truck className="w-5 h-5" />,
        text: 'Shipped',
        color: 'bg-green-100 text-green-800 border-green-200',
        bgColor: 'bg-green-50',
      };
    case 'delivered':
      return {
        icon: <Package className="w-5 h-5" />,
        text: 'Delivered',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        bgColor: 'bg-gray-50',
      };
    default:
      return {
        icon: <AlertCircle className="w-5 h-5" />,
        text: paymentStatus || 'Unknown',
        color: 'bg-red-100 text-red-800 border-red-200',
        bgColor: 'bg-red-50',
      };
  }
};

  const formatDate = (dateString: string): string => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Invalid Date';
    return d.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleTrackOrder = (orderId: string) => {
    console.log(`Tracking order: ${orderId}`);
    // Add tracking functionality here
  };

  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing details for order: ${orderId}`);
    // Add view details functionality here
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Your Orders</h2>
          <p className="text-gray-600">Please wait while we fetch your order details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No orders found state
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg text-center">
          <div className="mb-6">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Orders Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button 
              onClick={() => router.push('/Navigation/bestsellers')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Orders</h1>
                <p className="text-gray-600">Track your recent purchases</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
              <p className="text-xs text-gray-400">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} total spent
              </p>
            </div>
          </div>
        </div>

        {/* Top Message - Your orders will arrive within 3 days */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">🎉 Great News!</h2>
                  <p className="text-emerald-100 text-lg">
                    Your orders will be arrived within 3 days
                  </p>
                  <p className="text-emerald-200 text-sm mt-1">
                    Track your packages and get ready for delivery
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white bg-opacity-20 rounded-full px-6 py-3 backdrop-blur-sm">
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
                       <span className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.icon}
                        <span className="ml-2">{statusInfo.text}</span>
                      </span>

                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Placed on {formatDate(order.orderDate)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {order.shippingAddress}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-800 mb-1">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                    <div className="space-y-3">
                     {order.items.map((item, idx) => (
  <div
    key={idx}
    className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
  >
    <div className="flex items-center space-x-3">
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 rounded object-cover"
        />
      )}
      <div>
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
      </div>
    </div>
    <span className="font-semibold text-gray-700">${item.price.toFixed(2)}</span>
  </div>
))}

                    </div>
                  </div>

                  {/* 
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-purple-400 to-blue-400 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white text-white text-sm font-bold">
                            {item.image}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center border-2 border-white text-xs font-medium text-gray-600">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                    {/*
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleViewDetails(order.id)}
                        className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
                      >
                        View Details
                      </button>
                      {order.status === 'shipped' && (
                        <button 
                          onClick={() => handleTrackOrder(order.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
                        >
                          Track Order
                        </button>
                      )}
                    </div>
                   
                  </div>
                   */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}