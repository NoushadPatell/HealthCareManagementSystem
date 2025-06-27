import React, { useState } from 'react';
import Navigation from './components/common/Navigation';
import PatientManagement from './components/patients/PatientManagement';
import DoctorManagement from './components/doctors/DoctorManagement';

const App = () => {
  const [activeTab, setActiveTab] = useState('patients');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'patients' && <PatientManagement />}
        {activeTab === 'doctors' && <DoctorManagement />}
      </div>
    </div>
  );
};

export default App;