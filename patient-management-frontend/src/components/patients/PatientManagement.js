import React, { useState, useEffect, useCallback } from 'react';
import PatientCard from './PatientCard';
import PatientDetail from './PatientDetail';
import AddPatientForm from './AddPatientForm';
import LoadingSpinner from '../common/LoadingSpinner';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('list');

  const [newPatient, setNewPatient] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    age: '',
    gender: 'male',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/patients');
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        setError('Failed to fetch patients');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPatientById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/patients/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedPatient(data);
        setActiveView('detail');
      } else {
        setError('Failed to fetch patient details');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = useCallback(async (name) => {
    if (!name.trim()) {
      fetchPatients();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/patients/search?name=${encodeURIComponent(name)}`);
      if (response.ok) {
        const data = await response.json();
        setPatients(Array.isArray(data) ? data : [data]);
      } else {
        setError('Failed to search patients');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchPatients]);

  const createPatient = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newPatient, age: parseInt(newPatient.age) }),
      });

      if (response.ok) {
        setActiveView('list');
        setNewPatient({
          fullName: '',
          email: '',
          contactNumber: '',
          age: '',
          gender: 'male',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: ''
          }
        });
        fetchPatients();
      } else {
        setError('Failed to create patient');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }, [newPatient, fetchPatients]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  useEffect(() => {
    if (activeView === 'list') {
      const debounceTimer = setTimeout(() => {
        searchPatients(searchTerm);
      }, 300);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, activeView, searchPatients]);

  const handleInputChange = useCallback((e, section = null) => {
    const { name, value } = e.target;
    if (section === 'address') {
      setNewPatient(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setNewPatient(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Patient Management</h1>
        <p className="text-gray-600">Manage patient records efficiently and securely</p>
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
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setActiveView('add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              + Add Patient
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} onView={fetchPatientById} />
              ))}
            </div>
          )}

          {!loading && patients.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-500">Add your first patient to get started</p>
            </div>
          )}
        </>
      )}

      {activeView === 'detail' && selectedPatient && (
        <PatientDetail patient={selectedPatient} onClose={() => setActiveView('list')} />
      )}

      {activeView === 'add' && (
        <AddPatientForm
          newPatient={newPatient}
          handleInputChange={handleInputChange}
          createPatient={createPatient}
          loading={loading}
          setActiveView={setActiveView}
        />
      )}
    </div>
  );
};

export default PatientManagement;