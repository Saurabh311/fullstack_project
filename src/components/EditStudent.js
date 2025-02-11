import { Paper } from '@mui/material'
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStudent() {
  let nevigate = useNavigate()
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [students, setStudents] = useState([])
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const student = { name, address }
  const { id } = useParams()
  const token = localStorage.getItem('jwtToken')
    console.log(token)
    if (!token) {
        console.error("JWT token not found");
        // Redirect to login page if the token is missing
        nevigate('/login');
      }

  const handleClick = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8080/student/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(student)
    }).then(() => {
      nevigate("/Student")
    });
  }

  useEffect(() => {
    fetch(`http://localhost:8080/student/${id}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
        credentials: 'include', // If your backend requires cookies for session
      })
      .then(res => res.json())
      .then((result) => {
        setStudents(result)
      })
  }, [students])

  const onCancel = (e) => {
    nevigate("/Student")
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>Edit Student</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-required" fullWidth label=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder ={students.name}
          />
          <TextField id="outlined-basic" variant="outlined" fullWidth label=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={students.address}
          />
          <Button variant="contained" color="success" onClick={handleClick}>
            Submit
          </Button>
          <Button variant="contained" color="error" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
