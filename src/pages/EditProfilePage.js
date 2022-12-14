import { useState, useEffect, useReducer } from "react";
import ImgAsset from '../resources';
import '../css/editprofilepage.css'
import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import axios from "axios";
import Swal from 'sweetalert2'

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap'

const initialState = {
    avatar: null,
    username: "",
	name: "",
	birthdate: "",
	occupation: "",
	address: "",
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case "avatar":
            return { ...currentState, avatar: action.upload };
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

export default function EditProfilePage() {
    const [userId, setUserId] = useState(() => {
		const localData = sessionStorage.getItem("id");
		return localData ? localData : null;
	});

    const [preload, setPreLoad] = useState([]);
    const [imagePlaceholder, setImagePlaceholder] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/${userId}`)
        .then((response) => {
            setPreLoad(response.data.data);
            setImagePlaceholder(response.data.data.avatar);
            console.log(response.data.data);
        })
          .catch((err) => {
            console.log(err);
        });
    }, []);
        
    const [user, dispatch] = useReducer(reducer, initialState);

    function postData (formData){
        axios
          .create({
            headers: {
              Authorization : `Bearer ${sessionStorage.getItem("token")}`
              }
            })
		  .post(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile/edit`, formData)
		  .then((response) => {
			console.log(response)
            setIsLoading(false);
			Swal.fire({
				icon: 'success',
				title: 'Profile Changed!',
				allowOutsideClick: false,
				allowEscapeKey: false,
				confirmButtonColor: "#B8D9A0",
				preConfirm: () => {
					window.location.href = "/dashboard";
				}	  
			}) 		
		  })
		  .catch((error) => {
            setIsLoading(false);
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
    }

    function uploadImage (img, formData) {
        console.log("Image : ", img);
        let body = new FormData()
        body.set('key', 'fbf6a1214e399aee19712877bc787d54')
        body.append('image', img)
    
        return axios({
          method: 'POST',
          url: 'https://api.imgbb.com/1/upload',
          data: body
        })
        .then((response) => {
            console.log(response.data);
            console.log(response.data.data.display_url)

            formData.append("avatar", response.data.data.display_url);

            postData(formData);
        })
          .catch((err) => {
            console.log(err);
        });
      }   
        
    const submitProfile = (e) => {        
		e.preventDefault();
        setIsLoading(true);
        console.log(user);

        const formData = new FormData();
		formData.append("id", userId);
        let temp = '';

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

        if (user.avatar !== null){
            console.log(user.avatar);
			// formData.append("avatar", user.avatar);

            const reader = new FileReader()
            reader.readAsDataURL(user.avatar)      
            reader.onload = () => {
                console.log('called: ', reader)
                const img = reader.result.split(",").pop();
                uploadImage(img, formData);
        
                // postData(formData);
            }  
		}

        if (user.avatar === null){
            postData(formData);
        }	
	};

    const onImageChange = (e) => {
        dispatch({ type: "avatar", upload: e.target.files[0], })

        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              setImagePlaceholder(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
          }
    }

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
                                    imagePlaceholder !== null ?(
                                        <img src={imagePlaceholder} alt="Cover" style={{width: 300, height: 300, borderRadius: 300/ 2}}/>
                                    ):(
                                        <img src={ImgAsset.avatar2} alt="Cover" width="300px"/>
                                    )
                                }
                                {/* <InputGroup size="md" className="upload_form2 mb-3">
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
                                </InputGroup> */}
                                <Form.Group controlId="formFileSm" className="upload_form2 mb-3">
                                    {/* <Form.Label>Small file input example</Form.Label> */}
                                    <Form.Control type="file" 
                                        placeholder="Enter Link of Story Cover"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={onImageChange}
                                        // onChange={(e) =>
                                        //     dispatch({ type: "avatar", upload: e.target.files[0], })
        
                                        // }        
                                    />
                                </Form.Group>
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
                                            <Button variant="primary" disabled={isLoading} className="btn_save" type="submit" onClick={submitProfile}>
                                                {
                                                    isLoading === false ? (<>Save Profile</>)
                                                    :(
                                                        <>
                                                        <Spinner
                                                        as="span"
                                                        animation="grow"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        />{" "} Loading... </>
                                                    )
                                                }
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