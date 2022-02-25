import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { Button, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useStyles } from "./admin.styles.ts"
import { EditOfferModal } from "../../components/EditOfferModal/EditOfferModal"
import { NewOfferModal } from "../../components/NewOfferModal/NewOfferModal"

const Admin = () => {
  const styles = useStyles
  const [offers, setOffers] = useState([])
  const [newOffer, setNewOffer] = useState({
    marca: "",
    modelo: "",
    ano: "",
    preco: "",
    cor: "",
    km: "",
    placa: "",
    cidade: "",
    data: "",
    views: 0
  })
  const [editOffer, setEditOffer] = useState({})
  const [editOfferModalVisible, setEditOfferModalVisible] = useState(false);
  const [newOfferModalVisible, setNewOfferModalVisible] = useState(false);

  const carrosCollectionRef = collection(db, "carros")

  const deleteOffer = async (id) => {
    const offerDoc = doc(db, "carros", id)
    await deleteDoc(offerDoc)
    getOffers()
  }

  useEffect(() => {

    const getOffers = async () => {
      const data = await getDocs(carrosCollectionRef)
      setOffers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getOffers()
  }, [])

  const getOffers = async () => {
    const data = await getDocs(carrosCollectionRef)
    setOffers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const showEditOfferModal = () => {
    setEditOfferModalVisible(true);
  };

  const showNewOfferModal = () => {
    setNewOfferModalVisible(true);
  };

  const setEditOfferModal = (id) => {
    let obj = offers.find((offer) => offer.id === id)
    setEditOffer(obj)
  }

  const handleOkEditModal = () => {
    getOffers()
    setEditOfferModalVisible(false);
  };

  const handleCancelEditModal = () => {
    setEditOfferModalVisible(false);
  };

  const handleOkNewModal = () => {
    getOffers()
    setNewOfferModalVisible(false);
  };

  const handleCancelNewModal = () => {
    setNewOfferModalVisible(false);
  };


  return (
    <>
      <div style={styles.wrapper}>
        <h2>Carros Ofertados</h2>
        <Button
          onClick={showNewOfferModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Nova Oferta
        </Button>
        <Table dataSource={offers} bordered>
          <Column title="Marca" dataIndex="marca" key="marca" />
          <Column title="Modelo" dataIndex="modelo" key="modelo" />
          <Column title="Ano" dataIndex="ano" key="ano" />
          <Column title="Preço" dataIndex="preco" key="preco" type="number" />
          <Column title="Cor" dataIndex="cor" key="cor" />
          <Column title="Quilometragem" dataIndex="km" key="km" />
          <Column title="Placa" dataIndex="placa" key="placa" />
          <Column title="Cidade" dataIndex="cidade" key="cidade" />
          <Column title="Data De Cadastro" dataIndex="data" key="data" />
          <Column title="Ações" key="acoes" render={(text, record) => (
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => {
                setEditOfferModal(record.id)
                showEditOfferModal()
              }} />
              <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => {
                deleteOffer(record.id)
              }} />
            </Space>
          )} />
        </Table>


        <EditOfferModal visible={editOfferModalVisible} onOk={handleOkEditModal} offer={editOffer} onCancel={handleCancelEditModal}></EditOfferModal>

        <NewOfferModal visible={newOfferModalVisible} onOk={handleOkNewModal} offer={newOffer} onCancel={handleCancelNewModal}></NewOfferModal>

      </div>

    </>
  )
}

export default Admin
