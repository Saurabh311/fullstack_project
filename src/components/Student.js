import * as React from 'react';
import { useState } from 'react';
import { Container } from '@mui/system';
import { Paper } from '@mui/material'
import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';

export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [students, setStudents] = useState([])
    let nevigate = useNavigate()
    const token = localStorage.getItem('jwtToken')
    console.log(token)
    if (!token) {
        console.error("JWT token not found");
        // Redirect to login page if the token is missing
        nevigate('/login');
      }

    React.useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async() => {
        try {
            const response = await fetch("http://localhost:8080/student/getAll", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include', // If your backend requires cookies for session
          })
        .then(res => {
            if (!res.ok) {
                // Handle errors, such as unauthorized or not found
                throw new Error('Network response was not ok: ' + res.status);
            }
            return res.json();
        })
        .then(result => {
            setStudents(result);
        })
        }catch(error) {
            console.error('Error fetching students:', error);
        }        
    }

    const deleteStudent = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/student/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies if required by the backend
            });
    
            // Check if the response is successful (status code 2xx)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Navigate to the "/Student" page after successful deletion
            fetchStudents();
            nevigate("/Student");
        } catch (error) {
            console.error("Error deleting student:", error);
            // Handle the error (e.g., show a notification or alert to the user)
            alert("Failed to delete the student. Please try again.");
        }
    };

    return (
        <Container>
            <h1> Students </h1>
            <Paper elevation={3} style={paperStyle}>
                {students.map(student => (
                    <Paper elevation={6} style={{ padding: "15px", margin: "10px", textAlign: "left" }} key={student.id}>
                        ID: 0{student.id} <br />
                        Name: {student.name} <br />
                        Address: {student.address} <br />
                        <span style={{ padding: 25 }}>
                            <Button variant="contained" color="success" size="small" href={`/editStudent/${student.id}`}>Edit</Button>
                        </span>
                        <span style={{ padding: 25 }}>
                            <Button variant="contained" color="error" size="small" onClick={() => deleteStudent(student.id)}>Delete</Button>
                        </span>
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
