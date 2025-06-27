import React, { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
import PatientCard from './components/PatientCard';
import PatientDetail from './components/PatientDetail';
import AddPatientForm from './components/AddPatientForm';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Patient Management System</h1>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search patients by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setActiveView('add')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Patient</span>
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {patients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} onView={fetchPatientById} />
                ))}
              </div>
            )}

            {!loading && patients.length === 0 && (
              <div className="text-center py-12">
                <span className="w-16 h-16 text-gray-300 mx-auto mb-4">No Icon</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-500">Add your first patient to get started</p>
              </div>
            )}
          </>
        )}

        {activeView === 'detail' && selectedPatient && (
          <div className="space-y-6">
            <PatientDetail patient={selectedPatient} onClose={() => setActiveView('list')} />
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Medical Records</h3>
              <div className="space-y-4">
                {selectedPatient.medicalRecords?.map((record) => (
                  <div key={record.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(record.recordDate).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{record.treatment}</p>
                    {record.doctors && record.doctors.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Attending Doctors:</p>
                        <div className="space-y-1">
                          {record.doctors.map((doctor, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              Dr. {doctor.fullName} - {doctor.specialization}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default PatientManagement;
