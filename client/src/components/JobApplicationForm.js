import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm = () => {
    const [organizationName, setOrganizationName] = useState('');
    const [positionTitle, setPositionTitle] = useState('');
    const [applicationDeadline, setApplicationDeadline] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          
            await axios.post(
                'http://localhost:4000/api/applications',
                {
                    companyName: organizationName,
                    jobTitle: positionTitle,
                    deadline: applicationDeadline,
                    requiredSkills: skillsRequired.split(','),
                },
             
            );
            alert('Job application submitted successfully!');
        } catch (error) {
            alert('Error while submitting: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h2>Submit Job Application</h2>
            <input
                type="text"
                placeholder="Organization Name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Position Title"
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Skills Required (comma-separated)"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
            />
            <input
                type="date"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
            />
            <button type="submit">Submit Application</button>
        </form>
    );
};

export default JobApplicationForm;
