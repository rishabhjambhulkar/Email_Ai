import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div>
            <h1>Welcome to Career Tracker</h1>
            <nav>
                <Link to="/job-applications">Manage Job Applications</Link>
                <Link to="/skill-analysis">Analyze Skill Gaps</Link>
                <Link to="/growth-progress">Monitor Progress</Link>
            </nav>
        </div>
    );
};

export default UserDashboard;
