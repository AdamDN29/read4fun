import React from "react";
import { useState, useEffect, Text } from "react";
import ImgAsset from "../resources";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import "../css/chapterPage.css";
import { scrollToTop, useScroll } from "../helper/scroll";
import GoTopButton from "../components/GoTopButton";


//import component Bootstrap React
import { Container, Row, Col, Button, Form} from "react-bootstrap";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Link from '@ckeditor/ckeditor5-link/src/link';
// import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
// import ClassicEditor from "ckeditor5-build-classic-dna";

function ChapterPage(props) {
  // const location = useLocation();
  // const { chapter_content, list_chapter } = location.state;
  // console.log(chapter_content);
  // console.log(list_chapter);

  const { story_id, chapter_number } = useParams();
  console.log("Story Id : ", story_id);
  console.log("Chapter Number : ",chapter_number);

  const navigate = useNavigate();

  const [thisChapter, setThisChapter] = useState(
    {id : 1, title: "Title", number: "1", content:"Please Wait ...", story:{id:1, title:"Story"}}
  );
  const [listChapters, setListChapters] = useState();
  console.log(thisChapter);
  const scrollPosition = useScroll();

  const [prevChapter, setPrevChapter] = useState([]);
  const [nextChapter, setNextChapter] = useState([]);
  const [btnStatusPrev, setbtnStatusPrev] = useState(true);
  const [btnStatusNext, setbtnStatusNext] = useState(true);

  useEffect(() => {
    // setButton()  
      console.log("Get Data Chapter")
      axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/chapter/story/${story_id}`)
      .then((response) => {
        console.log(response.data);
        const chapterAsc = [...response.data].sort((a, b) => a.number - b.number);
        setListChapters(chapterAsc);  
        console.log("Total Data: ", response.data.length);
        var array = [...chapterAsc]; 
        var myIndex = array.findIndex(item => item.number === chapter_number)
        console.log("Index : ", myIndex)
        setThisChapter(response.data[myIndex]);

        response.data.map((chapter, index) => {
          if (chapter.id === response.data[myIndex].id) {
            console.log("Finded with Index : ", index);
            if (index - 1 >= 0) {
              console.log("Prev Chapter : True");
              setPrevChapter(response.data[index - 1]);
              setbtnStatusPrev(false);
              console.log("Prev Chapter : ", response.data[index - 1]);
            } else {
              setbtnStatusPrev(true);
              console.log("Prev Chapter : False");
            }
            if (index + 1 !== response.data.length) {
              console.log("Next Chapter : True");
              setNextChapter(response.data[index + 1]);
              setbtnStatusNext(false);
              console.log("Next Chapter : ",response.data[index + 1]);
            } else {
              setbtnStatusNext(true);
              console.log("Next Chapter : False");
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);

  function setButton(findChapter) {
    scrollToTop();
    listChapters.map((chapter, index) => {
      if (chapter.id === findChapter) {
        console.log("Finded with Index : ", index);
        if (index - 1 >= 0) {
          console.log("Prev Chapter : True");
          setPrevChapter(listChapters[index - 1]);
          setbtnStatusPrev(false);
          console.log(prevChapter);
        } else {
          setbtnStatusPrev(true);
          console.log("Prev Chapter : False");
        }
        if (index + 1 !== listChapters.length) {
          console.log("Next Chapter : True");
          setNextChapter(listChapters[index + 1]);
          setbtnStatusNext(false);
          console.log(nextChapter);
        } else {
          setbtnStatusNext(true);
          console.log("Next Chapter : False");
        }
      }
    });
  }

  function prevChapterClick() {
    // window.location.href = '/story/' + thisChapter.story.title + '/chapter'
    // window.location.reload(false);
    setThisChapter(prevChapter);
    console.log(thisChapter);
    setButton(prevChapter.id);
    // navigate('/story/' + thisChapter.story.id + '/chapter/' + prevChapter.number, { state: {chapter_content: prevChapter, list_chapter: list_chapter} })
    navigate('/story/' + thisChapter.story.id + '/chapter/' + prevChapter.number)
  }

  function nextChapterClick() {
    setThisChapter(nextChapter);
    console.log(thisChapter);
    setButton(nextChapter.id);
    // navigate('/story/' + thisChapter.story.id + '/chapter/' + nextChapter.number, { state: {chapter_content: nextChapter, list_chapter: list_chapter} })
    navigate('/story/' + thisChapter.story.id + '/chapter/' + nextChapter.number)
    // window.location.reload(true);
  }

  // Select Chapter
  const selectChapter = (e) => {
    const temp = e.target.value;
    console.log(temp);

    listChapters.map((chapter, index) => {
      if (chapter.number === e.target.value) {
        console.log("Found the Chapter");
        setThisChapter(chapter);
        console.log(thisChapter);
        setButton(chapter.id);
        // navigate('/story/' + thisChapter.story.id + '/chapter/' + chapter.number, { state: {chapter_content: chapter, list_chapter: list_chapter} })
        navigate('/story/' + thisChapter.story.id + '/chapter/' + chapter.number)
      } else {
        console.log("Not Found the Chapter : ", chapter.number);
      }
    });
  };

  const downloadHandle = () => {
    const nameFile = thisChapter.story.title + ' - Chapter ' + thisChapter.number + '.pdf';
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/chapter/download/${thisChapter.id}`,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/pdf",
          },
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", nameFile); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbars />
      <Container className="mt-3">
        <div className="title_chapter_box">
          <Row className="title_row">
            <Col md={10}>
              <div>
                <h1 className="">
                  <Link
                    className="titleSection"
                    to={`/story/${thisChapter.story.id}`}
                    // state={{ story_id: thisChapter.story_id }}
                  >
                    {thisChapter.story.title}  
                  </Link>
                </h1>
              </div>
            </Col>
            <Col md={2}>
              <Button className="downloadSection" onClick={downloadHandle}>
                <span>Download</span>
              </Button>
            </Col>
          </Row>

          {thisChapter.story.type === "Novel" ? (
            <>
              <Row>
                <Col md={12}>
                  <div className="chapterSection">
                    <p>
                      Chapter {thisChapter.number} : {thisChapter.title}
                    </p>
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* Select Chapter & Top Button */}
        {thisChapter.story.type === "Novel" ? (
          <Row className="upSection">
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="chapterDropdown"
                onChange={selectChapter}
              >
                <option> Chapter {thisChapter.number}</option>
                {listChapters.map((chapter, index) => {
                  return (
                    <>
                      {chapter.number !== thisChapter.number ? (
                        <option key={index} value={chapter.number}>
                          Chapter {chapter.number}
                        </option>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </Form.Select>
            </Col>

            <Col className="buttonSection2">
              <Button
                className="btn_chapter2"
                disabled={btnStatusPrev}
                onClick={prevChapterClick}
              >
                {/* <Link className="link_to" 
                                to={`/story/${chapter_content.story.title}/chapter/${prevChapter.number}`}
                                state={{chapter_content: prevChapter, list_chapter: list_chapter}}
                                onClick={location.forceUpdate}> */}
                <img
                  src={ImgAsset.icon_prev_chapter}
                  className="img_btn_prev_chapter2"
                  alt="prev chapter"
                />
                {/* </Link> */}
              </Button>

              <Button
                className="btn_chapter2"
                disabled={btnStatusNext}
                onClick={nextChapterClick}
              >
                {/* <Link className='link_to'
                                to={`/story/${chapter_content.story.title}/chapter/${nextChapter.number}`}
                                state={{chapter_content: nextChapter, list_chapter: list_chapter}}> */}
                <img
                  src={ImgAsset.icon_next_chapter}
                  className="img_btn_next_chapter2"
                  alt="next chapter"
                />
                {/* </Link> */}
              </Button>
            </Col>
          </Row>
        ) : (
          <></>
        )}

        {/* Chapter Content */}
        <div className='content_field'>
                <span className='contents' dangerouslySetInnerHTML={{ __html: thisChapter.content }}/>
        </div>

        {/* <div className="editor_field">
          <CKEditor
            id="editor1"
            disabled
            config={{
              toolbar: "none",
              padding: "10px",
            }}
            className="content_field"
            editor={ClassicEditor}
            data={thisChapter.content}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
          />
        </div> */}

        {/* Bottom Button */}
        {thisChapter.story.type === "Novel" ? (
          <div className="buttonSection">
            <Button
              className="btn_chapter"
              disabled={btnStatusPrev}
              onClick={prevChapterClick}
            >
              {/* <Link className="link_to" 
                        to={`/story/${chapter_content.story.title}/chapter/${prevChapter.number}`}
                        state={{chapter_content: prevChapter, list_chapter: list_chapter}}
                        onClick={location.forceUpdate}> */}
              <img
                src={ImgAsset.icon_prev_chapter}
                className="img_btn_prev_chapter"
                alt="prev chapter"
              />{" "}
              Prev Chapter
              {/* </Link> */}
            </Button>

            <Button className="btn_chapter">
              <Link
                className="link"
                to={`/story/${thisChapter.story.id}`}
                // state={{ story_id: chapter_content.story.id }}
              >
                <img
                  src={ImgAsset.icon_story_chapter}
                  // className="img_btn_prev_chapter"
                  alt="story chapter"
                />
              </Link>
            </Button>

            <Button
              className="btn_chapter"
              disabled={btnStatusNext}
              onClick={nextChapterClick}
            >
              {/* <Link className='link_to'
                        to={`/story/${chapter_content.story.title}/chapter/${nextChapter.number}`}
                        state={{chapter_content: nextChapter, list_chapter: list_chapter}}> */}
              Next Chapter
              <img
                src={ImgAsset.icon_next_chapter}
                className="img_btn_next_chapter"
                alt="next chapter"
              />
              {/* </Link> */}
            </Button>
          </div>
        ) : (
          <></>
        )}
        <GoTopButton visible={scrollPosition > 400} />
      </Container>
      <Footer />
    </div>
  );
}

export default ChapterPage;
