import React, { useState } from 'react';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { Breadcrumb } from '@components/ui/Breadcrumb';

interface ProfileProps {
  onLogout?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    birthDate: '1990-01-15',
  });

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-04-10',
      total: 1049.98,
      status: 'Delivered',
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-03-28',
      total: 299.99,
      status: 'Delivered',
      items: 1,
    },
    {
      id: 'ORD-003',
      date: '2024-03-15',
      total: 749.99,
      status: 'Cancelled',
      items: 2,
    },
  ];

  const addresses = [
    {
      id: 'ADDR-1',
      type: 'Home',
      address: '123 Main St, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: 'ADDR-2',
      type: 'Work',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false,
    },
  ];

  const handleUpdateProfile = () => {
    console.log('Update profile:', profileData);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-50';
      case 'Cancelled':
        return 'text-red-600 bg-red-50';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'My Account', current: true },
          ]}
          className="mb-8"
        />

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <h3 className="font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-sm text-gray-600">{profileData.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'info', label: 'Profile Info', icon: '👤' },
                  { id: 'orders', label: 'Orders', icon: '📦' },
                  { id: 'addresses', label: 'Addresses', icon: '📍' },
                  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === item.id
                        ? 'bg-yellow-100 text-yellow-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              <Button
                fullWidth
                variant="outline"
                className="mt-6 text-red-600 border-red-300"
                onClick={onLogout}
              >
                Logout
              </Button>
            </Card>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Profile Info */}
            {activeTab === 'info' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Last Name"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Input
                      type="email"
                      label="Email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                    />
                    <Input
                      type="tel"
                      label="Phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                    />
                    <Input
                      type="date"
                      label="Birth Date"
                      value={profileData.birthDate}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          birthDate: e.target.value,
                        })
                      }
                    />
                    <Button
                      fullWidth
                      onClick={handleUpdateProfile}
                      className="mt-4"
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">First Name</p>
                      <p className="font-medium text-gray-900">
                        {profileData.firstName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Name</p>
                      <p className="font-medium text-gray-900">
                        {profileData.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">
                        {profileData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">
                        {profileData.phone}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>

                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg mb-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-400">
                          ${order.total}
                        </p>
                        <p
                          className={`text-sm font-medium px-2 py-1 rounded ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items} item{order.items > 1 ? 's' : ''}
                    </p>
                    <Button size="sm" variant="outline" className="mt-3">
                      View Order
                    </Button>
                  </div>
                ))}
              </Card>
            )}

            {/* Addresses */}
            {activeTab === 'addresses' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Saved Addresses</h2>
                  <Button size="sm">+ Add Address</Button>
                </div>

                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 border rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-gray-900">{addr.type}</p>
                          {addr.isDefault && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-700">{addr.address}</p>
                      <p className="text-gray-600 text-sm">
                        {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Placeholder for other tabs */}
            {(activeTab === 'wishlist' || activeTab === 'settings') && (
              <Card className="p-6 text-center py-12">
                <p className="text-gray-600 text-lg">
                  {activeTab === 'wishlist'
                    ? 'Your wishlist is empty'
                    : 'Settings coming soon'}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.displayName = 'Profile';
