
import '../css/imgcarousel.css'
import ImgAsset from '../resources'
import Carousel from 'react-bootstrap/Carousel';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'

function ImgCarousel(props) {
  const link_btn = props.link_btn;

  return (
    <Carousel fade classname="carousel_place">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src = {ImgAsset.img_bg1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className='title_caption'>Looking for a <a className='text_theme'>Great Place</a> to Read Novel and Short Story ?</h3>
          <p className='title_caption'>Explore a <a className='text_theme'>Great Story</a> with <i>Read</i><a className='text_theme'>4</a><i>Fun</i></p>
          <p><center><Button variant="primary" href="/browse/Story" className='btn_explore'>Explore</Button></center></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src = {ImgAsset.img_bg2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className='title_caption2'>Want to be <a className='text_theme2'>Author</a> and Share Your Story in Great Place  ?</h3>
          <p className='title_caption2'>Write a <a className='text_theme3'>Great Story</a> with <i>Read</i><a className='text_theme'>4</a><i>Fun</i></p>
          <p><center><Button variant="primary" href={link_btn}className='btn_write'>Write</Button></center></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src = {ImgAsset.img_bg3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3 className='title_caption2'>Find a <a className='text_theme'>Great Place</a> to Read and Write a Story  ?</h3>
          <p className='text_theme3'>Search a <a className='text_theme'>Great Story</a> with <i>Read</i><a className='text_theme'>4</a><i>Fun</i></p>
          <p><center><Button variant="primary" href="/browse/Story" className='btn_search'>Search</Button></center></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ImgCarousel;