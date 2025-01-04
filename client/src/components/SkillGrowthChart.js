import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SkillGrowthChart = ({ progressData }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timePeriod" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="improvedSkills" stroke="#4caf50" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SkillGrowthChart;
