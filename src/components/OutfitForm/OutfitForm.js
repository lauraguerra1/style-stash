import '../Closet/Closet.css'
import CategoryContainer from "../CategoryContainer/CategoryContainer"
import hanger from '../../images/hanger.png'
import add from '../../images/add.png'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'

const OutfitForm = ({closeMenu}) => {
  const [cart, setCart] = useState([])

  const checkCartForItem = (id) => cart.find(itemID => itemID === id) ? true : false

  const addToCart = (id) => {
    setCart(prevCart => [...prevCart, id])
  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(itemID => itemID !== id))
  }

  const ChooseCategory = () => {
    return (
      <>
        <h2 style={{textAlign: "center", fontWeight: "lighter"}}>Choose a category to add an item</h2>
        <CategoryContainer closeMenu={closeMenu} parentRoute={'outfitform'}/>
      </>
    )
  }


  return (
    <section className='closet-page'>
      <Link to='/cart'><img src={hanger}/></Link>
      {useParams().category ? <CategoryPage checkCartForItem={checkCartForItem} addToCart={addToCart} removeFromCart={removeFromCart}/> : <ChooseCategory />}
    </section>
  )
}

export default OutfitForm