import React from 'react';
import { UserCheck } from 'lucide-react';

const DoctorDetail = ({ doctor, onClose }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <UserCheck className="w-8 h-8 text-green-600" />
        <div>
          <h2 className="text-xl font-bold">Dr. {doctor.fullName}</h2>
          <p className="text-gray-500">Doctor ID: #{doctor.id}</p>
        </div>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-800 px-3 py-1 rounded border"
      >
        ✕ Close
      </button>
    </div>
    <div className="space-y-2 text-gray-700">
      <p>🩺 <strong>Specialization:</strong> {doctor.specialization}</p>
      <p>📞 <strong>Contact:</strong> {doctor.contactNumber}</p>
      <p>🏥 <strong>Department:</strong> {doctor.department}</p>
    </div>
  </div>
);

export default DoctorDetail;