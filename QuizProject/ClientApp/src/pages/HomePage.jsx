import React, { useEffect, useState } from 'react';
import { useNavigate } from '../../node_modules/react-router-dom/index';
import AdminHome from '../components/AdminHome';
import UserHome from '../components/UserHome';

function HomePage() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userDataJSON = localStorage.getItem('token');
        if (!userDataJSON) {
            navigate('/');
            return;
        }
        const userData = JSON.parse(userDataJSON);
        const userRole = userData.role; 
        setRole(userRole);
    }, [navigate]);
    return (
        <div>
            {role === 'ADMIN' ? (
                <AdminHome />
            ) : role === 'USER' ? (
                <UserHome />
            ) : null}
        </div>
    );
}
export default HomePage;