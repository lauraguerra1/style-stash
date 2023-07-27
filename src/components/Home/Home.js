import './Home.css';
import logo from '../../images/homepage.png';
import { useEffect, useState } from 'react';
import { getData } from '../../apiCalls';
import { Link } from 'react-router-dom';

const Home = ({user, setAppError}) => {

  const [featuredImage, setFeaturedImage] = useState({})
  const [featuredItems, setFeaturedItems] = useState([])

  const getRandIndex = (num) => {
    return Math.floor(Math.random() * num)
  }

  useEffect(() => {
    const apiCall = async (type, userID) => {
      try {
        const data = await getData(type, userID)
        setFeaturedImage(data.allData[getRandIndex(data.allData.length)].outfit)
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCall('outfits', user.userID)
      }
  },[])

  useEffect(() => {
    const apiCall = async (type, userID) => {
      try {
        const data = await getData(type, userID)
        console.log(data)
        const items = [data.pieces[getRandIndex(data.pieces.length)]]
        // , data.pieces[getRandIndex(data.pieces.length)], data.pieces[getRandIndex(data.pieces.length)], data.pieces[getRandIndex(data.pieces.length)]
        setFeaturedItems(items)
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCall('closet', user.userID)
      }
  },[])

  const featuredPieces = () => {
    console.log(featuredItems)
    return featuredItems.map(item => <img key={item.id} className='featured-piece' src={item.image}/>
  )}

  return (
    <div className='homepage-container'>
      <main className='homepage'> 
        <img className='home-logo' src={logo} />
        {user?
          <div className='featured-container'>
            <div className='featured-img-container'>
              <img className='featured-img' src={featuredImage.fullOutfitImage} />
              <Link className='view-outfit-link' to={`/outfitdetails/${featuredImage.id}`}><div className='view-outfit-btn-home'>View my outfit</div></Link>
              <p className='featured-img-text'>♡ Today's Featured Outfit ♡</p>
            </div>
            <div className='featured-pieces-container'>
              {featuredPieces()}
              <p className='featured-img-text'>♡ Today's Featured Piece ♡</p>
            </div>
          </div>
        : <p>Please Login to Style Stash!</p>}
      </main>
    </div>
  )
}

export default Home