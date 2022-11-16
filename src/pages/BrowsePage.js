import React from 'react';
import ImgAsset from '../resources';
import '../css/browsepage.css';
import '../css/storybrowse.css'
import { scroller } from "react-scroll";
import ReactTimeAgo from 'react-time-ago'

import Navbars from '../components/Navbars'
import Footer from '../components/Footer'
import StoryBrowse from '../components/StoryBrowse'
import Pagination from "../components/Pagination";

//import component Bootstrap React
import { Spinner, Container, Row, Col , Button, Form, Badge, InputGroup, ButtonGroup, ToggleButton  } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GoTopButton from '../components/GoTopButton';
import { useScroll } from "../helper/scroll";

// Scroll to Section
const scrollToSection = (flag) => {
    scroller.scrollTo(flag, {
      duration: 100,
      offset:-25,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

const allGenres = [
    {id: 1, label: 'Action'},
    {id: 2, label: 'Adventure'},
    {id: 3, label: 'Comedy'},
    {id: 4, label: 'Drama'},
    {id: 5, label: 'Fantasy'},
    {id: 6, label: 'Historical'},
    {id: 7, label: 'Horror'},
    {id: 8, label: 'Magical Realism'},
    {id: 9, label: 'Martial Arts'},
    {id: 10, label: 'Mature'},
    {id: 11, label: 'Mystery'},
    {id: 12, label: 'Psychological'},
    {id: 13, label: 'Romance'},
    {id: 14, label: 'Real Experience'},
    {id: 15, label: 'Sci-Fi'},
    {id: 16, label: 'School Life'},
    {id: 17, label: 'Slice of Life'},
    {id: 18, label: 'Sports'},
    {id: 19, label: 'Supernatural'},
    {id: 20, label: 'Tragedy'},
    {id: 21, label: 'Video Games'},
];

const allTypes = [
    { name: 'All', value: '1' },
    { name: 'Short Story', value: '2' },
    { name: 'Novel', value: '3' },
];

const allStatus = [
    { name: 'All', value: '1' },
    { name: 'On Going', value: '2' },
    { name: 'Complete', value: '3' },
];

const allSort = [
    { name: 'Most View', value: '1' },
    { name: 'Most Like', value: '2' },
    { name: 'Most Bookmark', value: '3' },
    { name: 'Update', value: '4' },
];


function BrowsePage() {
    // const location = useLocation();
    // const { link_query } = location.state;
    const { link_query } = useParams();
    console.log(link_query);

    const navigate = useNavigate();

    const [query, setQuery] = useState("");    
    console.log(query);

    const [storys, setStory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Pagination Settings
    const [allSessionsCount, setallSessionsCount] = useState(1);
    const [sessionsPerPage, setSessionsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const scrollPosition = useScroll();
    console.log("Current Page : ", currentPage)

    const lastSessionNumber = currentPage * sessionsPerPage;
    const firstSessionIndex = lastSessionNumber - sessionsPerPage;

    //Filter Type
    const [typeValue, setTypeValue] = useState('All');

    //Filter Status
    const [statusValue, setStatusValue] = useState('All');

    //Sort Status
    const [sortValue, setSortValue] = useState('1');

    // Link Flag
    const [checkedLink, setCheckedLink] = useState(link_query);

    //Genre Filter Checked
    const [myGenre, setMyGenre] = useState([]);

    // Get Data Story
    useEffect(() => {
        if (link_query === "Novel" || link_query === "Short Story"){
            console.log("Type Filterrr")
            console.log("Query : ", link_query)
            setTypeValue(link_query);
            getTypeStory();
        }
        // else if(link_query / 1 === link_query){
            // console.log("Genre Filter");
            // setMyGenre(link_query);
            // getGenreStory();
        // }
        else if(link_query === "Story" || link_query === "Ranking"){
            axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/unbanned`)
            .then((response) => {
                console.log(response.data)
                const sortedStory = [...response.data].sort((a, b) =>
                    a.title > b.title ? 1 : -1,
                );
                setStory(sortedStory);
                console.log("Total Data: ", response.data.length);
                setallSessionsCount(response.data.length);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
        }
        else{
            console.log("Genre Filter");
            allGenres.map((genre) => {
                if(genre.label === link_query){
                    console.log("Found Label : ", genre.label);
                    console.log("Found ID : ", genre.id);
                    setMyGenre(genre.id);
                    axios
                    .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getStory/${genre.id}`)
                    .then((response) => {
                        const sortedStory = [...response.data].sort((a, b) =>
                            a.title > b.title ? 1 : -1,
                        );
                        setStory(sortedStory);
                        console.log("Total Data: ", response.data.length);
                        setallSessionsCount(response.data.length);
                        setIsLoading(false);
                        console.log("Link Genre : ", response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                        setIsLoading(false);
                    });
                }
            })
        }

        
    }, []);

    // Get Story with Link Type
    const getTypeStory = () => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/type/${link_query}`)
          .then((response) => {
            const sortedStory = [...response.data].sort((a, b) =>
                a.title > b.title ? 1 : -1,
            );
            setStory(sortedStory);
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length);
            setIsLoading(false);
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    }

    // Get Story with Link Genre
    const getGenreStory = () => {
        // axios
        // .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/getStory/${filterGenre}`)
        //   .then((response) => {
        //     const sortedStory = [...response.data].sort((a, b) =>
        //         a.title > b.title ? 1 : -1,
        //     );
        //     setStory(sortedStory);
        //     console.log("Total Data: ", response.data.length);
        //     setallSessionsCount(response.data.length);
        //     setIsLoading(false);
        //     console.log("Link Genre : ", response.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setIsLoading(false);
        // });
    } 

	// Search Handler
    const onSearchHandler = (e) => {
		e.preventDefault();
        console.log(query);
        setIsLoading(true);
        if( e !== null || e !== ""){
            setMyGenre([]);
            setQuery(query);
            console.log("apply :", query);
            searchStory(query);
        }else{
            return;
        }
	};

    // Get data when Search
    function searchStory (query){
        navigate('/browse/Story');
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/search?query=${query}`)
          .then((response) => {
            const sortedStory = [...response.data].sort((a, b) =>
                a.title > b.title ? 1 : -1,
            );
            setStory(sortedStory);
            console.log("Total Data: ", response.data.length);
            setallSessionsCount(response.data.length);
            setIsLoading(false);
            temp();
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
        setCurrentPage(1);
    }

    // Get data when Filter
    function filterStory (){
        let filterQuery = "";
        navigate('/browse/Story');
        setIsLoading(true);
        console.log("My Genre : ", myGenre)
        if(myGenre.length === 1){
            filterQuery="/getStory/" + myGenre[0];
        }
        else if(myGenre.length === 2){
            filterQuery="/getMultiple/" + myGenre[0] + "/" + myGenre[1];
        }
        console.log("Filter Query : ", filterQuery)
        axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/story${filterQuery}`)
          .then((response) => {
            
            let sortedStory;
            let filtered1;
            let filtered2;

            if (typeValue !== 'All'){
                console.log("Filter by Type")
                filtered1 = response.data.filter(story => {
                    return story.type === typeValue;
                });
            }else{
                filtered1 = response.data;
            }

            if (statusValue !== 'All'){
                filtered2 = filtered1.filter(story => {
                    return story.status === statusValue;
                });
            }else{
                filtered2 = filtered1;
            }
           

            if (sortValue === "1"){
                sortedStory = [...filtered2].sort((a, b) => b.view - a.view);
                console.log("Sort by View")
                
            }
            else if(sortValue === "2"){
                sortedStory = [...filtered2].sort((a, b) => b.like - a.like);
                console.log("Sort by Like")
                
            }
            else if(sortValue === "3"){
                sortedStory = [...filtered2].sort((a, b) => b.bookmark - a.bookmark);
                console.log("Sort by Bookmark")
                
            }
            else if(sortValue === "4"){
                sortedStory = filtered2.sort((a, b) => new Date(...b.updated_at.split('/').reverse()) - new Date(...a.updated_at.split('/').reverse()));
                console.log("Sort by Update")
                
            }
            setStory(sortedStory);
            temp();
            console.log("Submit Filter: ", sortedStory.length);
            setallSessionsCount(sortedStory.length);
            console.log(response);
            setCurrentPage(1);
            setIsLoading(false);

            if (sortedStory.length === 0){
                console.log("Not Found");
            }

          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
        setCurrentPage(1);
    }

    // Check Checked Genre from link
    const genreChecker  = (genre_label)  => {
        let temps = false;
        if (genre_label === checkedLink) {
            temps = true;
        }
        return temps;
    }

    const changeMyGenre =  (e) => {
        var num = Number(e.target.value)
        // if (myGenre === num){
        //     setMyGenre(null);
        // }else{
        //     setMyGenre(num);
        // }
        var array = [...myGenre]; 
        var index = array.indexOf(num)
        if (index !== -1) {
            array.splice(index, 1);
            setMyGenre(array);
        }else{
            setMyGenre(current => [...current, num]);
        }       
    }

    // Scroll to Section
    const temp = () => {
        scrollToSection("result");
    }

    return (
        <div>
        <Navbars />   
        <Container className="mt-3">
            {/* Search Section */}
            <div className='info_section2'> 
                <h1 className='section_title3'>Search</h1>

                <Form onSubmit={onSearchHandler}>
                    <Row>
                        <Col >
                            <InputGroup size="lg" className="search_form mb-3">
                                <InputGroup.Text id="basic-addon1">
                                    <img
                                        src = {ImgAsset.icon_search}
                                    />
                                </InputGroup.Text>
                                <Form.Control
                                placeholder="Search any Story"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                />
                                {/* <InputGroup.Text id="basic-addon2"><Button className='btn_search2'>Search</Button></InputGroup.Text> */}
                            </InputGroup>
                        </Col>
                        <Col md='auto'> <Button type="submit" className='btn_search2' onClick={temp} >Search</Button> </Col>
                    </Row>
                </Form>
            </div>

             {/* Filter Section */}
            <div className='info_section2'> 
                
                <Row>
                    <Col >
                        <Row >
                            <div className='row_detail'>
                                <h4 className='section_title4'>Type</h4>
                                <ButtonGroup className='btn_group_filter'>
                                    {allTypes.map((type, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`type-${idx}`}
                                        type="radio"
                                        className={`filter_btn ${typeValue === type.name ? "active_btn" : ""}`}
                                        name="type"
                                        value={type.name}
                                        checked={typeValue === type.name}
                                        onChange={(e) => setTypeValue(e.currentTarget.value)}
                                    >
                                        {type.name}
                                    </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className='row_detail'>
                                <h4 className='section_title4'>Status</h4>
                                <ButtonGroup className='btn_group_filter'>
                                    {allStatus.map((status, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`status-${idx}`}
                                        type="radio"
                                        className={`filter_btn ${statusValue === status.name ? "active_btn" : ""}`}
                                        name="status"
                                        value={status.name}
                                        checked={statusValue === status.name}
                                        onChange={(e) => setStatusValue(e.currentTarget.value)}
                                    >
                                        {status.name}
                                    </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className='row_detail'>
                                <h4 className='section_title4'>Sort By</h4>
                                <ButtonGroup className='btn_group_filter'>
                                    {allSort.map((sort, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`sort-${idx}`}
                                        type="radio"
                                        className={`filter_btn ${sortValue === sort.value ? "active_btn" : ""}`}
                                        name="sort"
                                        value={sort.value}
                                        checked={sortValue === sort.value}
                                        onChange={(e) => setSortValue(e.currentTarget.value)}
                                    >
                                        {sort.name}
                                    </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                        </Row>
                        
                    </Col>

                    {/* Genre Section */}
                    <Col > 
                        <h4 className='section_title4'>Genre</h4>
                        <Row>
                            <Col> 
                                {allGenres.slice(0,7).map((genre) => {
                                    const checked_status = genreChecker(genre.label);
                                    return(               
                                        <Form.Check 
                                        type="checkbox"
                                        id={`${genre.id}`}
                                        label={`${genre.label}`}
                                        defaultChecked={checked_status}
                                        value={genre.id}
                                        onChange={changeMyGenre}
                                        className='form_check'
                                        />
                                    )}
                                )}
                            </Col>
                            <Col> 
                                {allGenres.slice(7,14).map((genre) => {
                                    const checked_status = genreChecker(genre.label);
                                    return( 
                                        <Form.Check 
                                        type="checkbox"
                                        id={`${genre.id}`}
                                        label={`${genre.label}`}
                                        defaultChecked={checked_status}
                                        value={genre.id}
                                        onChange={changeMyGenre}
                                        className='form_check'
                                        />
                                    )}
                                )}   
                            </Col>
                            <Col> 
                                {allGenres.slice(14,21).map((genre) => {
                                    const checked_status = genreChecker(genre.label);
                                    return(
                                        <Form.Check 
                                        type="checkbox"
                                        id={`${genre.id}`}
                                        label={`${genre.label}`}
                                        defaultChecked={checked_status}
                                        value={genre.id}
                                        onChange={changeMyGenre}
                                        className='form_check'
                                        />
                                    )}
                                )}   
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
                <Row>
                <div align="right">
                    <Button className='btn_apply' onClick={filterStory}>Apply Filter</Button>
                </div>
                </Row>          
            </div>

            {/* Story Result Section */}
            <div className='info_section2' id="result"> 
                {/* <h1 className='section_title3'>Result</h1> */}
                {/* <StoryBrowse querys={apply}/> */}

                <div>
                {
                    isLoading === true ? (
                        <center>
                            <Spinner size="lg" animation="border" width="500px" height="500px"/> 
                            <p className='loadingtext'>Loading ...</p>
                        </center>
                    ):
                    (
                    <>
                        {
                            storys.length === 0 ? (     
                                <div className="notFoundField">
                                    <center>
                                    <img width="500px" height="500px" src={ImgAsset.not_found}  alt="Not Found"/>
                                    <p className='notFoundText'>Story Not Found !</p>
                                    </center>
                                </div>
                            ):(
                            <Row xs={1} md={2} >
                            {storys
                            .slice(firstSessionIndex,lastSessionNumber)
                            .map((story) => {
                            // const date = story.updated_at					
                            // const dt = new Date(date)

                                return(
                                // <Link className="link" 
                                // to={`/story/${story.title}`}
                                // state={{story_id: story.id}}>
                                <>
                                {
                                    myGenre.length !== 0 ?  (
                                        <Link className="link" 
                                        to={`/story/${story.id}`}
                                        // state={{story_id: story.story_id}}
                                        >
                                            <StoryBrowse key={story.id} story_id={story.story_id} storys={story}/>
                                        </Link>
                                    ):(
                                        <Link className="link" 
                                        to={`/story/${story.id}`}
                                        // state={{story_id: story.id}}
                                        >
                                            <StoryBrowse key={story.id} story_id={story.id} storys={story}/>
                                        </Link>
                                    )
                                }
                                </>
                               
                            )})}
                                
                            </Row>
                            )
                        }
                        <div className='pagination'>
                            <Pagination
                                itemsCount={allSessionsCount}
                                itemsPerPage={sessionsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                alwaysShown={false}
                                flagScroll = "2"
                            />
                        </div>
                        <GoTopButton visible={scrollPosition > 400} />
                    </>
                    )
                }               
                
            </div>
                
            </div>
       
        </Container>
        <Footer />   
        </div>
    );
}

export default BrowsePage;