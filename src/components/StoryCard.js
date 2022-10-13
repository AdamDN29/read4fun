import { useState, useEffect } from "react";
import ImgAsset from '../resources';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/storycard.css';
import Sliderslick from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";

function StoryCard() {
  const [products, setProducts] = useState([]);
  const [infinite, setInfinite] = useState(true);
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
      .get(`https://dummyjson.com/products`)
      .then((response) => {
        setProducts(response.data.products);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (products.length < 6) {
      setInfinite(false);
    } else {
      setInfinite(true);
    }
  }, [products.length]);
  console.log(products);
  console.log(infinite);
  return (
    <div>
      <section id="marketplace-product">
        <div className="container-fluid d-flex justify-content-center">
          <Sliderslick {...settingsSlick} className="slickSlider">
            {products.map((product) => (
              <Link className="link" to={`/storypage/${product.id}`}>
                <div className="d-flex justify-content-center ">
                  <div
                    key={product.id}
                    className="story_card card mx-1"
                    style={{ width: "28rem", height: "400px" }}
                  >
                    {product.thumbnail ? (
                      <div
                        className="thumb-img-product d-flex justify-content-center align-items-center"
                        style={{
                          backgroundImage: `url(${product.thumbnail})`,
                          height: "225px",
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        {/* <div className="button-beli">
                          <button className="btn ">Beli Produk</button>
                        </div> */}
                        {/* <img
                          className="card-img-top"
                          src={`${product.foto}`}
                          alt="Card"
                          height="250px"
                        /> */}
                      </div>
                    ) : (
                      <img
                        height="225px"
                        className="card-img-top"
                        src={ImgAsset.shadowslavecover}
                        alt="Card"
                      />
                    )}
                    <div className="story_card_body card-body">
                      <h5 className="story_card_title card-title">
                        {product.title}
                      </h5>

                      {/* type detail */}
                      <div className="detail_list">
                        <img
                            className="detail_list_icon"
                            src = {ImgAsset.icon_type}
                        />
                        <span className="icon_text">{product.category}</span>
                      </div>

                      {/* update detail */}
                      <div className="detail_list">
                        <img
                            className="detail_list_icon"
                            src = {ImgAsset.icon_update}
                        />
                        <span className="icon_text">{product.category}</span>
                      </div>

                      {/* chapter detail */}
                      <div className="detail_list">
                        <img
                            className="detail_list_icon"
                            src = {ImgAsset.icon_chapter}
                        />
                        <span className="icon_text">{product.category}</span>
                      </div>
  
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Sliderslick>
        </div>
      </section>
    </div>
  );
}

export default StoryCard;
