import React from 'react';
import { Users } from 'lucide-react';

const PatientDetail = ({ patient, onClose }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-xl font-bold">{patient.fullName}</h2>
          <p className="text-gray-500">Patient ID: #{patient.id}</p>
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
      <p>📧 {patient.email}</p>
      <p>📞 {patient.contactNumber}</p>
      <p>👤 Age: {patient.age}, Gender: {patient.gender}</p>
      <p>📍 {patient.address.street}, {patient.address.city}, {patient.address.state} - {patient.address.zipCode}</p>
    </div>
  </div>
);

export default PatientDetail;