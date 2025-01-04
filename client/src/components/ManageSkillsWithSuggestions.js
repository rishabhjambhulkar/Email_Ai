import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const availableSkills = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Python', label: 'Python' },
];

const ManageSkillsWithSuggestions = () => {
    const [chosenSkills, setChosenSkills] = useState([]);

    const handleSkillsSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const skillValues = chosenSkills.map((skill) => skill.value); // Extract skill values
            await axios.put(
                'http://localhost:5000/api/users/skills',
                { skills: skillValues },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Your skillset has been updated successfully!');
        } catch (error) {
            console.error('Error while updating skills:', error);
            alert('An error occurred while updating your skills. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSkillsSubmit}>
            <h2>Update Your Skillset</h2>
            <Select
                isMulti
                options={availableSkills}
                value={chosenSkills}
                onChange={setChosenSkills}
                placeholder="Search or select skills"
            />
            <button type="submit">Save Skillset</button>
        </form>
    );
};

export default ManageSkillsWithSuggestions;
