import React from 'react';
import { UserCheck } from 'lucide-react';

const DoctorCard = ({ doctor, onView }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Dr. {doctor.fullName}</h3>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
        </div>
      </div>
      <button
        className="text-green-600 hover:text-green-800 px-3 py-1 rounded border border-green-600 hover:bg-green-50"
        onClick={() => onView(doctor.id)}
      >
        View
      </button>
    </div>
    <div className="text-sm text-gray-600 space-y-1">
      <p>📞 {doctor.contactNumber}</p>
      <p>🏥 {doctor.department}</p>
    </div>
  </div>
);

export default DoctorCard;