import React from 'react';

const AddPatientForm = ({ newPatient, handleInputChange, createPatient, loading, setActiveView }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border">
    <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>

    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input name="fullName" value={newPatient.fullName} onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input name="email" type="email" value={newPatient.email} onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block font-medium mb-1">Contact Number</label>
        <input name="contactNumber" value={newPatient.contactNumber} onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block font-medium mb-1">Age</label>
        <input name="age" type="number" value={newPatient.age} onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      </div>
      <div>
        <label className="block font-medium mb-1">Gender</label>
        <select name="gender" value={newPatient.gender} onChange={handleInputChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>

    <h3 className="font-semibold text-lg mb-2">Address</h3>
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <input name="street" placeholder="Street" value={newPatient.address.street}
        onChange={(e) => handleInputChange(e, 'address')} 
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input name="city" placeholder="City" value={newPatient.address.city}
        onChange={(e) => handleInputChange(e, 'address')} 
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input name="state" placeholder="State" value={newPatient.address.state}
        onChange={(e) => handleInputChange(e, 'address')} 
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input name="zipCode" placeholder="Zip Code" value={newPatient.address.zipCode}
        onChange={(e) => handleInputChange(e, 'address')} 
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

    <div className="flex gap-4">
      <button onClick={createPatient} disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
        {loading ? 'Creating...' : 'Create Patient'}
      </button>
      <button onClick={() => setActiveView('list')} className="border px-6 py-2 rounded hover:bg-gray-50">
        Cancel
      </button>
    </div>
  </div>
);

export default AddPatientForm;