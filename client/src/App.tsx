
import { ToastContainer } from 'react-toastify';
import AllRoutes from './components/AllRoutes';
import LandingPage from './components/LandingPage';
import MySignup from './components/MySignup';

function App() {

    return (
        <>
            <AllRoutes/>
            <LandingPage/>
            <MySignup/>
            <ToastContainer/>
        </>
    );
}

export default App;
