import React, { useEffect, useState } from 'react'
import './styles.css'
import { db } from '../../firebase-config'
import { Card, Carousel, Col, Input, Row } from 'antd';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import Modal from 'antd/lib/modal/Modal';

const Ofertas = () => {
  const [offers, setOffers] = useState([])
  const carrosCollectionRef = collection(db, "carros")
  const [showOffer, setShowOffer] = useState(false);
  const [offer, setOffer] = useState({})


  const showOfferModal = (index) => {
    setShowOffer(true);
  };

  const handleOkOfferModal = () => {
    setShowOffer(false);
    setOffer({})
  };

  const handleCancelOfferModal = () => {
    setShowOffer(false);
    setOffer({})
  };

  const updateOffer = async (offer) => {
    const offerDoc = doc(db, "carros", offer.id)
    const edit = { ...offer, views: offer.views + 1 }
    updateDoc(offerDoc, edit)
  }

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  useEffect(() => {
    const getOffers = async () => {
      const data = await getDocs(carrosCollectionRef)
      setOffers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getOffers()
  }, [offer])

  return (
    <>
      <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', marginLeft: 200 }}>
        <h2>Ofertas</h2>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {offers.map((offer) => {
              return (
                <Col span={8}>
                  <div onClick={() => {
                    setOffer(offer)
                    showOfferModal()
                    updateOffer(offer)
                  }}>
                    <Card title={offer.marca + " - " + offer.modelo} style={{ marginTop: "25px" }} hoverable={true}>
                      <h2>Preço: {offer.preco}</h2>
                      <h4>Marca: {offer.marca}</h4>
                      <h4>Modelo: {offer.modelo}</h4>
                      <h4>Ano: {offer.ano}</h4>
                      <h4>Visualizações: {offer.views}</h4>
                    </Card>
                  </div>
                </Col>
              )
            })}
          </Row>

          <Modal title="Ver Oferta"
            visible={showOffer}
            okText={"Ok"}
            onCancel={handleCancelOfferModal}>
            <Carousel afterChange={onChange}>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
            <Row>
              <Col>
                <Card style={{ marginTop: "25px" }}>
                  <h4>Preço: {offer.preco}</h4>
                  <h4>Marca: {offer.marca}</h4>
                  <h4>Modelo: {offer.modelo}</h4>
                  <h4>Ano: {offer.ano}</h4>
                  <h4>Cor: {offer.cor}</h4>
                  {/*<h4>Visualizações: {offer.views + 1}</h4>*/}
                </Card>
              </Col>
              <Col>
                <Card style={{ marginTop: "25px", marginLeft: "100px" }}>
                  <h4>Placa: {offer.placa}</h4>
                  <h4>Cidade: {offer.cidade}</h4>
                  <h4>Quilometragem: {offer.km}</h4>
                  <h4>Data: {offer.data}</h4>
                </Card>
              </Col>
            </Row>

          </Modal>






        </div>
      </div>
    </>
  )
}

export default Ofertas
