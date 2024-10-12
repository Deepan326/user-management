import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


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

  const userData = ["First Name", "Last Name", "User Name", "Age", "Marital Status", "Is Employed", "Is Founder"];

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
      toast.error("Please fill in all fields.");
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
    
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteUser = (row) => {
    setUserList(userList.filter(user => user.id !== row.id));
    toast.success(` ${row.first_name} deleted successfully`)
  };

  useEffect(() => {
    axios.get("https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e").then(res => {
      if (res.status === 200) {
        
        setUserList(res.data.map(user => ({ ...user, id: Date.now() + Math.random() }))); // Adding unique IDs
      } else {
        console.log("server down");
      }
    });
  }, []); // Fetch data once on mount

  return (
    <div style={{ justifyContent: 'flex-end', padding: '6%', margin: '40px' }}>
      <Button variant="contained" color="primary" onClick={handleButtonClick} style={{ marginLeft: '80%', marginBottom: '1%' }}>
        Add User
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <React.Fragment>
          <TableContainer component={Paper}>
            {
              userList.length>0 &&
            
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  {userData.map((row, index) => (
                    <TableCell align='left' key={index}><b>{row}</b></TableCell>
                  ))}
                  <TableCell align='left'><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.first_name}</TableCell>
                    <TableCell>{row.last_name}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.marital_status}</TableCell>
                    <TableCell>{row.is_employed ? 'true' : 'false'}</TableCell>
                    <TableCell>{row.is_founder ? 'true' : 'false'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditUser(row)}>
                      <FontAwesomeIcon icon={faEdit} style={{ fontSize: '15px' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(row)}>
                      <FontAwesomeIcon icon={faTrash} style={{ fontSize: '15px' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
}
         </TableContainer>
        </React.Fragment>
      </div>
  <div style={{ padding: '1%', margin: '40px' ,marginLeft:'65%'}}>
      <Stack spacing={2}>
      <Pagination count={5} shape="rounded" />
     </Stack>
     </div>
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
            required ={true}

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
            required ={true}

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
            required ={true}

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
            required ={true}

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
            required ={true}
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
