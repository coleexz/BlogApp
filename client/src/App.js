import './App.css';
import IndexPage from './pages/IndexPage';
import Layout from './Layout';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {UserContextProvider} from "./UserContext";

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage  />} />
                    <Route path={"/login"} element={<div><LoginPage/></div>} />
                    <Route path={"/register"} element={<div><RegisterPage/></div>} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
