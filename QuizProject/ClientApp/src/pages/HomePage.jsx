import React, { useEffect, useState } from 'react';
import AdminHome from '../components/AdminHome';
import UserHome from '../components/UserHome';
import LoginPage from './LoginPage';

function HomePage() {
    const [role, setRole] = useState('');

    useEffect(() => {
        const userDataJSON = localStorage.getItem('token');
        const userData = JSON.parse(userDataJSON);
        const userRole = userData.role; 
        console.log(userRole)
        setRole(userRole);
    }, []);
    return (
        <div>
            {role === 'ADMIN' ? (
                <AdminHome />
            ) : role === 'USER' ? (
                <UserHome />
            ) : <LoginPage></LoginPage>}
        </div>
    );
}
export default HomePage;