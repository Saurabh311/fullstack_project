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

    React.useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result)
            })
    }, [])

    const deleteStudent = (id) => {
        fetch(`http://localhost:8080/student/${id}`, {
            method: "DELETE",
        }).then(() => {
            nevigate("/")
        });
    }

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
