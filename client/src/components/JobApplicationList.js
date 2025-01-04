import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobApplicationList = () => {
    const [jobApplications, setJobApplications] = useState([]);

    useEffect(() => {
        const fetchJobApplications = async () => {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/applications', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobApplications(data);
        };
        fetchJobApplications();
    }, []);

    return (
        <div>
            <h2>My Applications</h2>
            <ul>
                {jobApplications.map((application) => (
                    <li key={application._id}>
                        <strong>{application.companyName}</strong> - {application.jobTitle} 
                        <br />
                        <span>Deadline: {new Date(application.deadline).toDateString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobApplicationList;
