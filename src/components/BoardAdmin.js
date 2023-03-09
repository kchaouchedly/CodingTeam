import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios  from "axios";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody ,MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox} from 'mdb-react-ui-kit';
// import EventCard from "./EventCard";


// import { Row, Col  } from 'antd';
const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const [id,setid]=useState('');
  const [isVerified,]=useState(false);
  const [ViewEdit, SetEditShow] = useState(false)
  const [ViewUsers,SetViewUsers] = useState(false)
  const handleEditShow = () => { SetEditShow(true) }
  const hanldeEditClose = () => { SetEditShow(false) }
  const [selectedFile, setSelectedFile] = useState([]);
  
  const [dataU, setDataU] = useState({
    photo:"" ,
    username: '',
    email: '',
    isVerified:false,
  });

  const [data, setData] = useState({
    photo:"" ,
    username: '',
    email: '',
    isVerified:false,
  });
  const handleFileSelect = (e) => {
    ///   setSelectedFile(selectedFile)
  
    // setSelectedFile(e.target.files)
    setSelectedFile(e.target.files);
  
    console.log('e.target.files ', e.target.files);
  };
  const handleChangee = (event) => {
    setDataU({
      ...dataU,
      [event.target.name]: event.target.value
    });
  };
  const SetRowData = (item) => {
    setUsername(item.username);
    setEmail(item.email);
    setPassword(item.password);
  }

  //////////////////BAN+EDIT///////////////////
/*
  const handleEdit = () =>{
    const url =` http://localhost:8080/api/auth/update/${id}`
    setusername(RowData.username);
    setemail(RowData.email);
    setpassword(RowData.password);
    
    const Credentials = new FormData();
    console.log(dataU.email)
    //multiple files

      Credentials.append('photo', selectedFile[0]);
      Credentials.append('username', username);
      Credentials.append('email', dataU.email);
      Credentials.append('password', password);
    // const Credentials = {selectedFile, name, start_at, end_at, latitude, longitude ,link}
    axios.put(url, Credentials)
        .then(response => {
            const result = response.data;
            const { status, message } = result;
  
            console.log("edittttttt",Credentials)
            console.log("idddddddddd",)
            if (status !== 'SUCCESS') {
                alert("la modification est  traité", status)
                window.location = '/';
            }
            else {
                alert(message)
                // window.location.reload()
            
            }
        })
        .catch(err => {
            console.log(err)
        })
  
  
  
  
  }*/
  const handleEdit = () =>{
    const url = `http://localhost:8080/api/auth/update/${id}`
    const credentials = new FormData();
    
    // set the values in the FormData object
    credentials.append('photo', selectedFile[0]);
    credentials.append('username', username);
    credentials.append('email', email);
    credentials.append('password', password);
  
    axios.put(url, credentials)
      .then(response => {
        const result = response.data;
        const { status, message } = result;
  
        console.log("edittttttt", credentials);
        console.log("idddddddddd", id);
  
        if (status !== 'SUCCESS') {
          alert("la modification est  traité", status)
          window.location = '/';
        } else {
          alert(message);
          // window.location.reload()
        }
      })
      .catch(err => {
        console.log(err);
      });
  }



  const banneUser = async (id)=>{
    try {
      const { data: response } = await axios.get(`http://localhost:8080/api/auth/bannedUser/${id}`);
      
      console.log(response)
    } catch (error) {
      console.error(error.message);
    }
  }
  
  



  ////////////////////////////////////
  const fetchData = async () => {
     
    try {
      const { data: response } = await axios.get('http://localhost:8080/api/auth/users');
      setData(response);
      console.log("egrsqgrqgrq",response)
    } catch (error) {
      console.error(error.message);
    }
  
  };
  
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        fetchData();
        SetViewUsers(true);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <><div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
    {ViewUsers && (
    <MDBContainer>
        <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Username</th>
              <th scope='col'>Email</th>
              <th scope='col'>Status</th>
              <th scope='col'>Position</th>
              <th scope='col'>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.user?.map((item) => (

              <><tr key={item._id}>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={`http://localhost:8080/${item.photo}`}
                      alt=''
                      style={{ width: '55px', height: '55px' }}
                      className='rounded-circle' />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>{item.username}</p>

                    </div>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.email}</p>

                </td>
                <td>

                  <MDBBadge color='success' pill>
                    {item.isVerified}
                  </MDBBadge>
                </td>
                <td>Senior</td>
                <td>
                  <button className="btn btn-sm btn-primary" size='sm' variant='warning' onClick={() => { handleEditShow(SetRowData(item), setid(item._id)); } }>Edit</button>
                  <button className="btn btn-sm btn-primary" size='sm' variant='warning' onClick={() => { banneUser(item._id); } }>Banne</button>
                </td>
              </tr></>
            ))}
          </MDBTableBody>

        </MDBTable>
        {ViewEdit && (
          <MDBContainer>
            <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleEdit}>Save Changes</button>
    </div>
          </MDBContainer>
        )}
      </MDBContainer>
    )}
     </>
        );
      }


export default BoardAdmin;





