import React from 'react';
import JobApplicationForm from '../components/JobApplicationForm';
import JobApplicationList from '../components/JobApplicationList';

const ApplicationDashboard = () => {
    return (
        <div>
            <h1>Track and Manage Job Applications</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                {/* Section to Add a New Job Application */}
                <div style={{ flex: 1 }}>
                    <JobApplicationForm />
                </div>
                {/* Section to View Existing Job Applications */}
                <div style={{ flex: 2 }}>
                    <JobApplicationList />
                </div>
            </div>
        </div>
    );
};

export default ApplicationDashboard;
