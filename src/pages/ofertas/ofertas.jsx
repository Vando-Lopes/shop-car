import React, { useEffect, useState } from 'react'
import './styles.css'
import { db } from '../../firebase-config'
import { collection, getDocs } from 'firebase/firestore'

const Ofertas = () => {
  const [offers, setOffers] = useState([])
  const carrosCollectionRef = collection(db, "carros")



  useEffect(() => {


    const getOffers = async () => {
      const data = await getDocs(carrosCollectionRef)
      setOffers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      console.log(data)
    }
    getOffers()
  }, [])
  /*
    async function handleAddViews(id) {
      const ref = firebase.firestore().collection('offers').doc(id)
  
      const offer = await ref.get()
      if (offer.data() !== undefined && offer.data() !== null) {
        const viewNumber = offer?.data()?.views + 1
        offer.ref.update({
          views: viewNumber,
        })
      }
    }
  */
  return (
    <>
      <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', }}>
        <h2>Ofertas</h2>
        {offers.map((offer)=>{
          return(
            <div>
              <h1>Ano: {offer.ano}</h1>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Ofertas
