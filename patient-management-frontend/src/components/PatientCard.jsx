import React from 'react';
import { User, Eye, Mail, Phone, MapPin } from 'lucide-react';

const PatientCard = ({ patient, onView }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
          <User />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{patient.fullName}</h3>
          <p className="text-sm text-gray-500">Age: {patient.age}, {patient.gender}</p>
        </div>
      </div>
      <button
        className="text-blue-600 hover:text-blue-800"
        onClick={() => onView(patient.id)}
      >
        <Eye className="w-5 h-5" />
      </button>
    </div>
    <div className="text-sm text-gray-600 space-y-1">
      <p><Mail className="inline w-4 h-4 mr-1" />{patient.email}</p>
      <p><Phone className="inline w-4 h-4 mr-1" />{patient.contactNumber}</p>
      <p><MapPin className="inline w-4 h-4 mr-1" />{patient.address.city}, {patient.address.state}</p>
    </div>
  </div>
);

export default PatientCard;
