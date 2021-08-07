import React , {useState} from 'react'
import { Container ,Form ,Button} from 'react-bootstrap'
import {v4 as uuidv4} from 'uuid'
import Axios from 'axios';
import Dashboard from './Dashboard'
import { Redirect,Route ,Link,useHistory} from 'react-router-dom';

export default function Login() {
    const [details, setDetails] =useState({id:'',username:''});
    const [submitted, setSubmitted] =useState(false);
    const history=useHistory();
function handleSubmit(e){
    console.log(e)
    e.preventDefault();
        Axios.post('http://localhost:3001/',{
          id:details.id,
          username:details.username
      }).then(res => {
          console.log(res.data)
          setSubmitted(true)
         // <Dashboard/>
          
});

}



 function createNewId(){
  setDetails({username:'RandomName', id: uuidv4()})
  
 }
 

    return (
        <div>
         
            <Container className="align-items-center d-flex" style={{height:'100vh'}}>
                <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
                    <Form.Label >
                        Enter YOur ID
                    </Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({...details, id: e.target.value})} value={details.id} required>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label >
                        Enter YOur Name
                    </Form.Label>
                    <Form.Control type="text" onChange={e => setDetails({...details, username: e.target.value})} value={details.username} required>
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Login</Button>
               
                <Button onClick={createNewId} variant="secondary">Create A new ID</Button>
                
                </Form>
            </Container>
            {submitted && <Redirect push  to={`/dashboard/${details.id}`} >DashBoard</Redirect>}
        </div>
    );

}

