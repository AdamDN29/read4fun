import { useState, useEffect } from "react";
import ImgAsset from '../resources';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/storycard.css';
import Sliderslick from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import arrayShuffle from 'array-shuffle';

function StoryCard(props) {
  const typeStory = props.type_story;
  console.log(typeStory);
  const [storys, setStory] = useState([]);
  const [infinite, setInfinite] = useState(true);
  var temp = process.env.REACT_APP_BACKEND_URL;
  console.log(temp);
  const settingsSlick = {
    infinite: infinite,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
        dots: false,
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
        dots: false,
      },
    ],
  };

  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/story/type/${typeStory}`)
      .then((response) => {
        const shuffled = arrayShuffle(response.data);
        setStory(shuffled);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (storys.length < 6) {
      setInfinite(false);
    } else {
      setInfinite(true);
    }
  }, [storys.length]);
  console.log(storys);
  console.log(infinite);
  return (
    <div>
      <section id="marketplace-product">
        <div className="container-fluid d-flex justify-content-center">
          <Sliderslick {...settingsSlick} className="slickSlider">
            {storys.map((story) => {

              return (
              <div>
           
              {/* { 
                story.type == props.type ? ( */}
                    <Link className="link" 
                      to={`/story/${story.title}`}
                      state={{story_id: story.id}}>
                    {/* <Link  to={`/story/${story.id}`}> */}
                      <div className="d-flex justify-content-center ">
                        <div
                          key={story.id}
                          className="story_card card mx-1"
                          style={{ width: "28rem", height: "400px" }}
                        >
                          {story.link !== null ? (
                            <div className="thumb-img-product d-flex justify-content-center align-items-center">             
                              <img className="card-img-top" src={story.link} alt="Cover" height="225px" width="150px"/>
                            </div>
                          ) : (
                            <img width="150px" height="225px" className="card-img-top" src={ImgAsset.image_placeholder} alt="Cover"/>
                          )}
                          <div className="story_card_body card-body">
                            <h5 className="story_card_title card-title">
                              {story.title}
                            </h5>

                            {/* status detail */}
                            <div className="detail_list">
                              <img
                                  width="16px"
                                  height="15px"
                                  className="detail_list_icon"
                                  src = {ImgAsset.icon_status}
                              />
                              <span className="icon_text">{story.status}</span>
                            </div>

                            {/* type detail */}
                            {/* <div className="detail_list">
                              <img
                                  className="detail_list_icon"
                                  src = {ImgAsset.icon_type}
                              />
                              <span className="icon_text">{story.type}</span>
                            </div> */}

                            {/* update detail */}
                            {/* <div className="detail_list">
                              <img
                                  className="detail_list_icon"
                                  src = {ImgAsset.icon_update}
                              />
                              <span className="icon_text">{story.updated_at}</span>
                            </div> */}

                            {/* chapter detail */}

                            {
                              story.type == "Novel" ? (
                                <div className="detail_list">
                              <img
                                  className="detail_list_icon"
                                  src = {ImgAsset.icon_chapter}
                              />
                              <span className="icon_text">{story.chapter} Chapters</span>
                            </div>
                              ):(<></>)
                            }
                            
                          </div>
                        </div>
                      </div>
                    </Link>
                {/* ) : (<></>)
              
              } */}
        
              </div>
            )})}
          </Sliderslick>
        </div>
      </section>
    </div>
  );
}

export default StoryCard;
