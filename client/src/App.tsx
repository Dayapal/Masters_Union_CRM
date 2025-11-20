
import { ToastContainer } from 'react-toastify';
import AllRoutes from './components/AllRoutes';
import MySignup from './components/MySignup';

function App() {

    return (
        <>
            <AllRoutes/>
            <MySignup/>
            <ToastContainer/>
        </>
    );
}

export default App;
