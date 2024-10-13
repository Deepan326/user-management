import './App.css';
import { Bounce, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserManagementPortal from './features/userPortal/UserManagementPortal';


function App() {
  return (
    <div className="App">

          <UserManagementPortal  />
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
