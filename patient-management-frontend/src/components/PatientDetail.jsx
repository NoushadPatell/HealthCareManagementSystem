import React from 'react';
import { X, User, Mail, Phone, MapPin } from 'lucide-react';

const PatientDetail = ({ patient, onClose }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-xl font-bold">{patient.fullName}</h2>
          <p className="text-gray-500">Patient ID: #{patient.id}</p>
        </div>
      </div>
      <button onClick={onClose}>
        <X className="text-gray-500 hover:text-gray-800 w-6 h-6" />
      </button>
    </div>
    <div className="space-y-2 text-gray-700">
      <p><Mail className="inline w-4 h-4 mr-2" /> {patient.email}</p>
      <p><Phone className="inline w-4 h-4 mr-2" /> {patient.contactNumber}</p>
      <p><User className="inline w-4 h-4 mr-2" /> Age: {patient.age}, Gender: {patient.gender}</p>
      <p><MapPin className="inline w-4 h-4 mr-2" /> {patient.address.street}, {patient.address.city}, {patient.address.state} - {patient.address.zipCode}</p>
    </div>
  </div>
);

export default PatientDetail;
