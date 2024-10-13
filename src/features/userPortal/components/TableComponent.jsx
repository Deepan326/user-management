import React from 'react'
import Table from '@mui/material/Table';
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCircleCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function TableComponent({setCurrentUser,
    setIsEditing,
    setOpen,
    setUserList,
    userList,
    currentUsers}) {
    const userData = ["First Name", "Last Name", "User Name", "Age", "Marital Status", "Is Employed", "Is Founder"];

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
        setOpen(true);
      };
    
      const handleDeleteUser = (row) => {
        setUserList(userList.filter(user => user.id !== row.id));
        toast.success(`${row.first_name} deleted successfully`);
      };

  return (
    <TableContainer component={Paper}>
          {userList.length > 0 ? (
            <>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {userData.map((row, index) => (
                      <TableCell align='left' key={index}><b>{row}</b></TableCell>
                    ))}
                    <TableCell align='left'><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentUsers.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.first_name}</TableCell>
                      <TableCell>{row.last_name}</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.marital_status}</TableCell>
                      <TableCell>{row.is_employed ? <FontAwesomeIcon icon={faCircleCheck} color='green' style={{ fontSize: '15px' }} /> : <FontAwesomeIcon icon={faCheckCircle} color='red' style={{ fontSize: '15px' }} />}</TableCell>
                      <TableCell>{row.is_founder ? <FontAwesomeIcon icon={faCircleCheck} color='green' style={{ fontSize: '15px' }} /> : <FontAwesomeIcon icon={faCheckCircle} color='red' style={{ fontSize: '15px' }} />}</TableCell>
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
            </>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4>User list is empty. Click "Add User" to add user.</h4>
            </div>
          )}
        </TableContainer>
  )
}
