import React from 'react';
import ActiveProjects from './projects/ActiveProjects';
import InactiveProjects from './projects/InactiveProjects';

const Dashboard = props =>
    <div>
        <ActiveProjects />
        <InactiveProjects />
    </div>
    
export default Dashboard;