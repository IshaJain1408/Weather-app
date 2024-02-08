import React, { useState, useEffect } from 'react';
import app from '../firebase';
import auth from '../firebase';
import './UserTable.css'
import { signOut } from 'firebase/auth';
import {
  getFirestore,
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  where,
} from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel, // Import InputLabel
  Select, // Import Select
  MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


const firestore = getFirestore(app);

const UserTable = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [startDate, setStartDate] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      let usersQuery = collection(firestore, 'users');

      if (statusFilter) {
        usersQuery = query(usersQuery, where('status', '==', statusFilter));
      }

      const querySnapshot = await getDocs(usersQuery);

      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });

      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [firestore, statusFilter]);

  const handleAdd = async () => {
    try {
      await addDoc(collection(firestore, 'users'), {
        username: newUsername,
        addedDate: new Date().toISOString(),
        status: 'active',
      });

      setNewUsername('');
      setOpenAddDialog(false); // Close the dialog
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteDoc(doc(firestore, 'users', userId));
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChangeStatus = async (userId, newStatus) => {
    try {
      await updateDoc(doc(firestore, 'users', userId), { status: newStatus });
      fetchUsers();
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Additional steps if needed (e.g., redirect user)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const columns = [
    { Header: 'Username', accessor: 'username' },
    { Header: 'Added Date', accessor: 'addedDate' },
    { Header: 'Status', accessor: 'status' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <>
          <IconButton  onClick={() => handleDelete(row.original.id)}>
            <DeleteIcon  />
          </IconButton>
          <IconButton onClick={() => handleChangeStatus(row.original.id, 'inactive')}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setOpenAddDialog(true)}>
            <AddIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className='UserTable'>
      <h2 style={{fontWeight:'450'}}>User Table</h2>
     
      <TableContainer component={Paper}>
      <div className="filter-section" >
    {/* <InputLabel>Filter by Status: </InputLabel> */}
    <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
      <MenuItem value="">All</MenuItem>
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
    </Select>
  
    {/* <DatePicker label="Basic date picker" /> */}
    <label>Filter by Date: </label>
    <DatePicker   selected={startDate} onChange={(date) => setStartDate(date)} />
 
</div>

        <Table>
        
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Added Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.addedDate}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleChangeStatus(user.id, 'inactive')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => setOpenAddDialog(true)}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="New Username"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {user && (
        <div>
          <p>User Information: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
