import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import LoginPage from './pages/LoginPage';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: !!localStorage.getItem('token'),
        };
    }

    updateLoginStatus = (isLoggedIn) => {
        this.setState({ isLoggedIn });
    }
    render() {
        return (
            <Layout updateLoginStatus={this.updateLoginStatus} isLoggedIn={this.state.isLoggedIn}>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                    <Route
                        path="/"
                        element={<LoginPage updateLoginStatus={this.updateLoginStatus} />}
                    />
                </Routes>
            </Layout>
        );
    }
}
