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
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const student = { name, address }
  const { id } = useParams()

  const handleClick = (e) => {
    e.preventDefault()
    fetch(`http://localhost:8080/student/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    }).then(() => {
      nevigate("/")
    });
  }

  const loadStudent = () => {
    fetch(`http://localhost:8080/student/${id}`)
      .then(res => res.json())
  }

  useEffect(() => {
    loadStudent()
  })

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
          <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button variant="contained" color="success" onClick={handleClick}>
            Submit
          </Button>
          <Button variant="contained" color="error" onClick={handleClick}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
