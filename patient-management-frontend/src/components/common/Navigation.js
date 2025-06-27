import React from 'react';
import { Users, UserCheck } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => (
  <nav className="bg-white shadow-md border-b">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">Healthcare Management</h1>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('patients')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === 'patients'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Patients</span>
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeTab === 'doctors'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span>Doctors</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;