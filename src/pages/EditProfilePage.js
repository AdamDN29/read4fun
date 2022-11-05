import { useState, useEffect, useReducer } from "react";
import ImgAsset from '../resources';
import '../css/editprofilepage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import axios from "axios";
import Swal from 'sweetalert2'

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap'

const initialState = {
    avatar: "",
    username: "",
	name: "",
	birthdate: "",
	occupation: "",
	address: "",
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "avatar":
            return { ...currentState, avatar: action.payload };
        case "username":
            return { ...currentState, username: action.payload };
		case "name":
            return { ...currentState, name: action.payload };
		case "birthdate":
            return { ...currentState, birthdate: action.payload };
		case "occupation":
            return { ...currentState, occupation: action.payload };
		case "address":
            return { ...currentState, address: action.payload };
        default:
            return currentState;
    }
}

export default function EditProfilePage(props) {
    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const [preload, setPreLoad] = useState([]);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${userId}`)
        .then((response) => {
            setPreLoad(response.data.data);
            console.log(response.data.data);
        })
          .catch((err) => {
            console.log(err);
          });
        }, []);
        
        const [user, dispatch] = useReducer(reducer, initialState);
        const [disable, setDisable] = useState(false);
        
    const submitProfile = (e) => {        
		e.preventDefault();
        setDisable(true);
        console.log(user);

        const formData = new FormData();
		formData.append("id", userId);
		if (user.avatar !== ""){
			formData.append("avatar", user.avatar);
		}
		if (user.username !== null){
			formData.append("username", user.username);
		}
		if (user.name !== ""){
			formData.append("name", user.name);
		}
		if (user.birthdate !== ""){
			formData.append("birthdate", user.birthdate);
		}
		if (user.occupation !== ""){
			formData.append("occupation", user.occupation);
		}
		if (user.address !== ""){
			formData.append("address", user.address);
		}

		axios
          .create({
            headers: {
              Authorization : `Bearer ${sessionStorage.getItem("token")}`
              }
            })
		  .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/edit`, formData)
		  .then((response) => {
			console.log(response)
            setDisable(false);
			Swal.fire({
				icon: 'success',
				title: 'Profile Changed!',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#21c177',
				preConfirm: () => {
					window.location.href = "/editprofile";
				}	  
			}) 		
		  })
		  .catch((error) => {
            Swal.fire({
				icon: 'error',
				title: 'Edit Profile Failed',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: '#D3455B',
			}) 
            console.log(error)
			return;
		  });
		
	};

    return (
        <div>
            <Navbars />
            <Container className="mt-3">
                <Card className="edit_profile card mx-1">
                    <Card.Body className="edit_profile_body card-body">
                        <Row>
                            <Col >
                                <Card.Title className="title card-title">Edit Profile</Card.Title>
                            </Col>
                            <Col md="auto">
                                <Button href='/changePassword' className="btn_password">Change Password</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md='auto' className="upload_col">
                                {
                                    preload.avatar !== null ?(
                                        <img src={preload.avatar} alt="Cover" style={{width: 300, height: 300, borderRadius: 300/ 2}}/>
                                    ):(
                                        <img src={ImgAsset.avatar2} alt="Cover" width="300px"/>
                                    )
                                }
                                <InputGroup size="md" className="upload_form2 mb-3">
                                    <InputGroup.Text id="basic-addon1" className='upload_icon'>
                                        <img
                                            src={ImgAsset.icon_upload}
                                        />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Enter Link of Your Profile Picture"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        name='avatar'
                                        type="text" 
                                        // defaultValue ={preload.link}
                                        onChange={(e) =>
                                            dispatch({ type: "avatar", payload: e.target.value })
                                        }
                                    />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        Please enter a valid link of your profile picture
                                    </Form.Text>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form className='form_edit_profile' onSubmit={submitProfile}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Username</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="" 
                                            name='username'
                                            defaultValue ={preload.username}
                                            onBlur={(e) =>
                                                dispatch({ type: "username", payload: e.target.value })
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Name" 
                                            name='name'
                                            defaultValue ={preload.name}
                                            onBlur={(e) =>
                                                dispatch({ type: "name", payload: e.target.value })
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Birthdate</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            placeholder="" 
                                            name='birthdate'
                                            defaultValue ={preload.birthdate}
                                            onBlur={(e) =>
                                                dispatch({ type: "birthdate", payload: e.target.value })
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Occupation</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Occupation" 
                                            name='occupation'
                                            defaultValue ={preload.occupation}
                                            onBlur={(e) =>
                                                dispatch({ type: "occupation", payload: e.target.value })
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label className="label_form">Address</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter Address" 
                                            name='address'
                                            defaultValue ={preload.address}
                                            onBlur={(e) =>
                                                dispatch({ type: "address", payload: e.target.value })
                                            }
                                        />
                                    </Form.Group>
                                    <Row className="btn_group">
                                        <Col>
                                            <Button href='/dashboard' variant="primary" className="btn_back" >
                                                Back
                                            </Button>
                                            <Button variant="primary" className="btn_save" type="submit" onClick={submitProfile}>
                                                Save Profile
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

            </Container>
            <Footer />
        </div>
    );
}