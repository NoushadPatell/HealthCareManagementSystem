import React from 'react';
import { Users } from 'lucide-react';

const PatientCard = ({ patient, onView }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{patient.fullName}</h3>
          <p className="text-sm text-gray-500">Age: {patient.age}, {patient.gender}</p>
        </div>
      </div>
      <button
        className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50"
        onClick={() => onView(patient.id)}
      >
        View
      </button>
    </div>
    <div className="text-sm text-gray-600 space-y-1">
      <p>📧 {patient.email}</p>
      <p>📞 {patient.contactNumber}</p>
      <p>📍 {patient.address.city}, {patient.address.state}</p>
    </div>
  </div>
);

export default PatientCard;