import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSkills = () => {
    const [skillSet, setSkillSet] = useState('');

    useEffect(() => {
        const fetchUserSkills = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get('http://localhost:5000/api/skills', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSkillSet(data.join(', ')); // Convert array to comma-separated string
            } catch (error) {
                console.error('Error fetching user skills:', error);
            }
        };

        fetchUserSkills();
    }, []);

    const handleSkillUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                'http://localhost:5000/api/users/skills',
                { skills: skillSet.split(',').map((skill) => skill.trim()) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Skillset updated successfully!');
        } catch (error) {
            console.error('Error updating skillset:', error);
            alert('Error updating skillset. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSkillUpdate}>
            <h2>Manage Your Skills</h2>
            <textarea
                value={skillSet}
                onChange={(e) => setSkillSet(e.target.value)}
                placeholder="List your skills, separated by commas (e.g., Python, Data Analysis)"
            />
            <button type="submit">Save Skills</button>
        </form>
    );
};

export default UpdateSkills;
