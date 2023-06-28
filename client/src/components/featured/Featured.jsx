import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { Link } from "react-router-dom";

const Featured = () => {

  const {data,loading,error} = useFetch("https://hotel-booking-ikjh.onrender.com/hotels/countByCity?cities=berlin,madrid,london")
  const dates=[
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]
  const options={
    adult: 1,
    children: 0,
    room: 1,
  }
  return (
    <div className="featured">
      {loading ? "Loading Please Wait" :
      <>
      <Link to='/hotels' state={{destination:"berlin",dates,options}} className="featuredItem">
        <img
          src="https://w.forfun.com/fetch/94/946b89bc8114a9ad0a256815546e47bc.jpeg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </Link>
      
      <Link to='/hotels' state={{destination:"madrid",dates,options}} className="featuredItem">
        <img
          src="https://www.travelandleisure.com/thmb/bm51vTBcyGJ840aDyLWaIOLqrgQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/madrid-spain-MADRIDTG0621-b2347a98186a4281a0874992b213ade0.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Madrid</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </Link>
      <Link to='/hotels' state={{destination:"london",dates,options}} className="featuredItem">
        <img
          src="https://www.excel.london/cdn/w_512/new-london-pic.jpg"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </Link></>}
    </div>
  );
};

export default Featured;
