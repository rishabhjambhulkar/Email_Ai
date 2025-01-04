import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CareerSkillAnalysis = () => {
    const [jobListings, setJobListings] = useState([]);
    const [currentSkills, setCurrentSkills] = useState([]);
    const [skillDeficiencies, setSkillDeficiencies] = useState({});

    const learningResources = {
        JavaScript: 'Explore JavaScript at https://javascript.info/',
        React: 'Dive into React at https://reactjs.org/docs/getting-started.html',
        Nodejs: 'Understand Node.js at https://nodejs.dev/',
    };

    useEffect(() => {
        const retrieveData = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch job postings
                const { data: jobs } = await axios.get('http://localhost:5000/api/job-listings', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Fetch user skill set
                const { data: userSkills } = await axios.get('http://localhost:5000/api/user-skills', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setJobListings(jobs);
                setCurrentSkills(userSkills);

                // Identify skill gaps
                const gaps = {};
                jobs.forEach((job) => {
                    const missingSkills = job.requiredAbilities.filter((ability) => !userSkills.includes(ability));
                    gaps[job._id] = missingSkills;
                });
                setSkillDeficiencies(gaps);
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        retrieveData();
    }, []);

    return (
        <div>
            <h2>Career Skill Analysis</h2>
            <ul>
                {jobListings.map((job) => (
                    <li key={job._id}>
                        <h3>
                            {job.employerName} - {job.positionTitle}
                        </h3>
                        <p>
                            <strong>Skill Gaps:</strong>{' '}
                            {skillDeficiencies[job._id] && skillDeficiencies[job._id].length > 0
                                ? skillDeficiencies[job._id].join(', ')
                                : 'No skill gaps identified'}
                        </p>
                        <ul>
                            {skillDeficiencies[job._id]?.map((ability) => (
                                <li key={ability}>
                                    {ability}: {learningResources[ability] || 'No recommendations available'}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CareerSkillAnalysis;
