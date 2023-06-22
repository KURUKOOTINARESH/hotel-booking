import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`http://localhost:3001/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const hotelImages = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/468965080.jpg?k=8d656145d6341bb181bc3eafd8aad906f5e7c6a5117a632a80e183d1019fa58e&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/469003338.jpg?k=5f1facb80400f296aa27419a3de7cbdce8f48bd12a6c5996edfce96781df591f&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/469003340.jpg?k=8f2183c11ee9ce4b8d8c2bcf2f7b8405af3992a00b282c664d8ee9bbd6c8e3bb&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1280x900/469003348.jpg?k=a85b97f13fe7d1198a3266c4fda538f825815fe2e7e0dc0ee8bc87050bec6469&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/469003342.jpg?k=d72f436ab6fca61fa96f66ba04adb39412ce58221a681cf2ae04478009107ece&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/469003358.jpg?k=cdb6a16d2b8f4df26020f4ca50d892b00d8c925e6ac0cc8f3c00933a692cb27a&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/469003363.jpg?k=55494701c5ea8c7e63fd3b17011f6ca5a38cda55199ce11c29da9ecd176fded1&o=&hp=1',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/469003367.jpg?k=60fabff49c231b01ebea1a12a7e6a00c91c4d1ae2756ce80eb47be44156de861&o=&hp=1'
  ]

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    
      setOpenModal(true);
    
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                  <ul className="hotel-sub-img-wrapper">
                  {
                    hotelImages.map((eachImage,index)=><li key={index}><img src={eachImage} alt={`image ${index}`} className="hotel-details-img"/></li>)
                  }
                  </ul>
                  
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
};

export default Hotel;