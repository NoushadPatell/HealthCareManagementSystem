const AddDoctorForm = ({ newDoctor, handleInputChange, createDoctor, loading, setActiveView }) => {
  const specializations = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology',
    'Psychiatry', 'Radiology', 'Anesthesiology', 'Emergency Medicine', 'Other'
  ];

  const departments = [
    'HEART', 'NEURO', 'ORTHO', 'PEDIATRICS', 'DERMATOLOGY',
    'PSYCHIATRY', 'RADIOLOGY', 'ANESTHESIA', 'EMERGENCY', 'Other'
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input name="fullName" value={newDoctor.fullName} onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input name="contactNumber" value={newDoctor.contactNumber} onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Specialization</label>
          <select name="specialization" value={newDoctor.specialization} onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Specialization</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          {newDoctor.specialization === 'Other' && (
            <input 
              name="customSpecialization" 
              placeholder="Enter custom specialization"
              value={newDoctor.customSpecialization || ''} 
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Department</label>
          <select name="department" value={newDoctor.department} onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {newDoctor.department === 'Other' && (
            <input 
              name="customDepartment" 
              placeholder="Enter custom department"
              value={newDoctor.customDepartment || ''} 
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={createDoctor} disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400">
          {loading ? 'Creating...' : 'Create Doctor'}
        </button>
        <button onClick={() => setActiveView('list')} className="border px-6 py-2 rounded hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddDoctorForm;