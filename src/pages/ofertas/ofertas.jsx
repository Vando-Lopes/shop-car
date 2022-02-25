import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import { Card, Carousel, Col, Row } from 'antd';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import Modal from 'antd/lib/modal/Modal';
import { useStyles } from "./ofertas.styles.ts"
import NoImg from '../../assets/noImg.png' 

const Ofertas = () => {
  const [offers, setOffers] = useState([])
  const carrosCollectionRef = collection(db, "carros")
  const [showOffer, setShowOffer] = useState(false);
  const [offer, setOffer] = useState({})
  const styles = useStyles

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


  useEffect(() => {
    const getOffers = async () => {
      const data = await getDocs(carrosCollectionRef)
      setOffers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getOffers()
  }, [offer])

  return (
    <>
      <div style={styles.wrapper}>
        <h2>Ofertas</h2>
        <div style={styles.cardWrapper}>
          <Row gutter={16}>
            {offers.map((offer) => {
              return (
                <Col span={8}>
                  <div onClick={() => {
                    setOffer(offer)
                    showOfferModal()
                    updateOffer(offer)
                  }}>
                    <Card
                      title={offer.marca + " - " + offer.modelo}
                      style={{ marginTop: "25px" }}
                      hoverable={true}
                      cover={<img style={{ height: "380px" }} alt="example" src={offer.imgs ? offer.imgs[0] : NoImg} />}
                    >
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
            cancelText={"Cancelar"}
            onCancel={handleCancelOfferModal}
            onOk={handleOkOfferModal}
          >
            {offer.imgs ?
              <Carousel>
                {offer.imgs?.map((img) => {
                  return (
                    <div>
                      <img src={img} alt="Foto" style={styles.contentStyleImg}></img>
                    </div>
                  )
                })}
              </Carousel>
              : <Carousel>
                <div>
                  <h3 style={styles.contentStyle}>Não contém imagem</h3>
                </div>
              </Carousel>}

            <Row gutter={[8, 16]} >
              <Col span={12}>
                <Card style={{ marginTop: "25px" }}>
                  <h4>Preço: {offer.preco}</h4>
                  <h4>Marca: {offer.marca}</h4>
                  <h4>Modelo: {offer.modelo}</h4>
                  <h4>Ano: {offer.ano}</h4>
                  <h4>Cor: {offer.cor}</h4>
                  {/*<h4>Visualizações: {offer.views + 1}</h4>*/}
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ marginTop: "25px", }}>
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
