import React, { useState, useEffect, useCallback } from 'react';
import DoctorCard from './DoctorCard';
import DoctorDetail from './DoctorDetail';
import AddDoctorForm from './AddDoctorForm';
import LoadingSpinner from '../common/LoadingSpinner';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('list');

  const [newDoctor, setNewDoctor] = useState({
    fullName: '',
    specialization: '',
    contactNumber: '',
    department: '',
    customSpecialization: '',
    customDepartment: ''
  });

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        setError('Failed to fetch doctors');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDoctorById = async (id) => {
    setLoading(true);
    try {
      // Since there's no individual doctor endpoint, find from the list
      const doctor = doctors.find(d => d.id === id);
      if (doctor) {
        setSelectedDoctor(doctor);
        setActiveView('detail');
      } else {
        setError('Doctor not found');
      }
    } catch (err) {
      setError('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchDoctors = useCallback(async (term, type) => {
    if (!term.trim()) {
      fetchDoctors();
      return;
    }

    setLoading(true);
    try {
      const endpoint = type === 'name' 
        ? `http://localhost:8080/api/doctors/search?name=${encodeURIComponent(term)}`
        : `http://localhost:8080/api/doctors/search?specialization=${encodeURIComponent(term)}`;
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setDoctors(Array.isArray(data) ? data : [data]);
      } else {
        setError('Failed to search doctors');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchDoctors]);

  const createDoctor = useCallback(async () => {
    setLoading(true);
    try {
      const doctorData = {
        fullName: newDoctor.fullName,
        specialization: newDoctor.specialization === 'Other' ? newDoctor.customSpecialization : newDoctor.specialization,
        contactNumber: newDoctor.contactNumber,
        department: newDoctor.department === 'Other' ? newDoctor.customDepartment : newDoctor.department
      };

      const response = await fetch('http://localhost:8080/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      if (response.ok) {
        setActiveView('list');
        setNewDoctor({
          fullName: '',
          specialization: '',
          contactNumber: '',
          department: '',
          customSpecialization: '',
          customDepartment: ''
        });
        fetchDoctors();
      } else {
        setError('Failed to create doctor');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, [newDoctor, fetchDoctors]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  useEffect(() => {
    if (activeView === 'list') {
      const debounceTimer = setTimeout(() => {
        searchDoctors(searchTerm, searchType);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, searchType, activeView, searchDoctors]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Management</h1>
        <p className="text-gray-600">Manage doctor profiles and specializations</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
          <button onClick={() => setError('')} className="ml-2 text-sm underline hover:no-underline">Dismiss</button>
        </div>
      )}

      {activeView === 'list' && (
        <>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-green-500"
              >
                <option value="name">Search by Name</option>
                <option value="specialization">Search by Specialization</option>
              </select>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={`Search doctors by ${searchType}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={() => setActiveView('add')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              + Add Doctor
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onView={fetchDoctorById} />
              ))}
            </div>
          )}

          {!loading && doctors.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-500">Add your first doctor to get started</p>
            </div>
          )}
        </>
      )}

      {activeView === 'detail' && selectedDoctor && (
        <DoctorDetail doctor={selectedDoctor} onClose={() => setActiveView('list')} />
      )}

      {activeView === 'add' && (
        <AddDoctorForm
          newDoctor={newDoctor}
          handleInputChange={handleInputChange}
          createDoctor={createDoctor}
          loading={loading}
          setActiveView={setActiveView}
        />
      )}
    </div>
  );
};

export default DoctorManagement;