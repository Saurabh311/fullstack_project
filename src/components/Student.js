import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container} from '@mui/system';
import {Paper} from '@mui/material'
import {Button} from '@mui/material'
import Popup from "./Popup"

export default function Student() {
    const paperStyle = { padding: '50px 20px', width:600, margin:"20px auto"}
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [students, setStudents] = useState([])
    const student ={name, address}

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }

    const handleClick = (e)=>{
        
        e.preventDefault()        
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(() =>{
            console.log("New Student Added")
        });        
        togglePopup()        
        setName("")
        setAddress("")
    }

    React.useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then((result)=>{
            setStudents(result)
        })
    }, [student])
  return (
    
    <Container>        
        <Paper elevation={3} style= {paperStyle}>
            <h1 style={{color: "blue"}}>Add Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, 
         },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
      value ={name} 
      onChange = {(e) => setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
      value ={address} 
      onChange = {(e) => setAddress(e.target.value)}
      />   
      
<Button variant="contained" color="success" onClick={handleClick}>
  Submit
</Button>
{isOpen &&
<Popup content={<><h1>New Student {student.name} added</h1></>}
handleClose={togglePopup}
/>}
    </Box>
    </Paper>
    <h1> Students </h1>
    <Paper elevation={3} style={paperStyle}>
        {students.map(student =>(
            <Paper elevation={6} style={{padding:"15px", margin:"10px", textAlign:"left"}} key={student.id}>
                ID:{student.id} <br/>
                Name: {student.name} <br/>
                Address: {student.address} <br/>
        </Paper>
        ))
    }
    </Paper>

    </Container>
  );
}
