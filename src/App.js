import logo from './logo.svg';
import './App.css';
import UserManagementPortal from './features/userPortal/UserManagementPortal';
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">

          <UserManagementPortal/>
          <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
           />
       
    </div>
  );
}
export default App;
