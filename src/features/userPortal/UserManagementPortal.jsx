import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as REST_URL from '../utils/RestURL';
import TableComponent from './components/TableComponent';

export default function UserManagementPortal() {
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    first_name: '',
    last_name: '',
    username: '',
    age: '',
    marital_status: '',
    is_employed: false,
    is_founder: false,
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;


  const handleButtonClick = () => {
    setIsEditing(false);
    setCurrentUser({
      id: null,
      first_name: '',
      last_name: '',
      username: '',
      age: '',
      marital_status: '',
      is_employed: false,
      is_founder: false,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentUser(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddUser = () => {
    const { first_name, last_name, username, age, marital_status } = currentUser;

    if (!first_name || !last_name || !username || !age || !marital_status) {
      toast.error("Please fill all fields.");
      return;
    }

    if (isEditing) {
      setUserList(userList.map(user => (user.id === currentUser.id ? currentUser : user)));
      toast.success(`${currentUser.first_name} updated successfully`);
    } else {
      setUserList([...userList, { ...currentUser, id: Date.now() }]);
      toast.success(`${currentUser.first_name} added successfully`);
    }

    handleClose();
  };
    
  

  useEffect(() => {
    axios.get(REST_URL.DOMAIN_URL + REST_URL.GET_USER_PATH).then(res => {
      if (res.status === 200) {
        setUserList(res.data.map(user => ({ ...user, id: Date.now() + Math.random() }))); // Adding unique IDs
      } else {
        console.log("Service unavailable");
      }
    });
  }, []); 

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userList.length / usersPerPage);

  return (
    <div style={{ justifyContent: 'flex-end', padding: '4%', margin: '40px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <h2>USER MANAGEMENT</h2>
        <span>
        <Button variant="contained" color="primary" onClick={handleButtonClick} >
        Add User
      </Button>
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableComponent 
          setCurrentUser={setCurrentUser}
          setIsEditing={setIsEditing}
          setOpen={setOpen}
          setUserList={setUserList}
          userList={userList}
          currentUsers={currentUsers}
        />
      </div>
      {userList.length > 0 && (
        <div style={{ padding: '1%', display:"flex", alignItems:"flex-end", justifyContent:"flex-end"}}>
          <Stack spacing={2}>
            <Pagination 
              count={totalPages} 
              shape="rounded" 
              onChange={(event, value) => setCurrentPage(value)} 
              page={currentPage} 
            />
          </Stack>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            name="first_name"
            value={currentUser.first_name}
            onChange={handleChange}
            required={true}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            name="last_name"
            value={currentUser.last_name}
            onChange={handleChange}
            required={true}
          />
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            name="username"
            value={currentUser.username}
            onChange={handleChange}
            required={true}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            name="age"
            value={currentUser.age}
            onChange={handleChange}
            required={true}
          />
          <TextField
            margin="dense"
            label="Marital Status"
            type="text"
            fullWidth
            variant="outlined"
            name="marital_status"
            value={currentUser.marital_status}
            onChange={handleChange}
            required={true}
          />
          <FormControlLabel
            control={<Checkbox checked={currentUser.is_employed} onChange={handleChange} name="is_employed" />}
            label="Is Employed"
          />
          <FormControlLabel
            control={<Checkbox checked={currentUser.is_founder} onChange={handleChange} name="is_founder" />}
            label="Is Founder"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
