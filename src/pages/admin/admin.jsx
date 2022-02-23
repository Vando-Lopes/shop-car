import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import './styles.css'
import { Button, Input, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal'

const Admin = () => {
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

  const createOffer = async () => {
    await addDoc(carrosCollectionRef, newOffer)
  }

  const deleteOffer = async (id) => {
    const offerDoc = doc(db, "carros", id)
    await deleteDoc(offerDoc)
  }

  const updateOffer = async (id, offer) => {
    const offerDoc = doc(db, "carros", id)
    const edit = { ...offer }
    updateDoc(offerDoc, edit)
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
      <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', marginLeft: 200 }}>
        <h2>Carros Ofertados</h2>
        <Button
          onClick={showNewOfferModal}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table dataSource={offers} bordered>
          <Column title="Marca" dataIndex="marca" key="marca" />
          <Column title="Modelo" dataIndex="modelo" key="modelo" />
          <Column title="Ano" dataIndex="ano" key="ano" />
          <Column title="Preço" dataIndex="preco" key="preco" />
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

        <Modal title="Editar Oferta"
          visible={editOfferModalVisible}
          onOk={() => {
            updateOffer(editOffer.id, editOffer)
            handleOkEditModal()
          }}
          okText={"Editar"}
          onCancel={handleCancelEditModal}>
          <Input placeholder="Marca" onChange={(e) => { setEditOffer({ ...editOffer, marca: e.target.value }) }} value={editOffer.marca} />
          <Input placeholder="Modelo" onChange={(e) => { setEditOffer({ ...editOffer, modelo: e.target.value }) }} value={editOffer.modelo} />
          <Input placeholder="Ano" onChange={(e) => { setEditOffer({ ...editOffer, ano: e.target.value }) }} value={editOffer.ano} />
          <Input placeholder="Preço" onChange={(e) => { setEditOffer({ ...editOffer, preco: e.target.value }) }} value={editOffer.preco} />
          <Input placeholder="Cor" onChange={(e) => { setEditOffer({ ...editOffer, cor: e.target.value }) }} value={editOffer.cor} />
          <Input placeholder="KM" onChange={(e) => { setEditOffer({ ...editOffer, km: e.target.value }) }} value={editOffer.km} />
          <Input placeholder="Placa" onChange={(e) => { setEditOffer({ ...editOffer, placa: e.target.value }) }} value={editOffer.placa} />
          <Input placeholder="Cidade" onChange={(e) => { setEditOffer({ ...editOffer, cidade: e.target.value }) }} value={editOffer.cidade} />
          <Input placeholder="Data" type="date" onChange={(e) => { setEditOffer({ ...editOffer, data: e.target.value }) }} value={editOffer.data} />
        </Modal>


        <Modal
          title="Criar Nova Oferta"
          visible={newOfferModalVisible}
          onOk={() => {
            createOffer()
            handleOkNewModal()
          }}
          okText={"Criar"}
          onCancel={handleCancelNewModal}>
          <Input placeholder="Marca" onChange={(e) => { setNewOffer({ ...newOffer, marca: e.target.value }) }} value={newOffer.marca} />
          <Input placeholder="Modelo" onChange={(e) => { setNewOffer({ ...newOffer, modelo: e.target.value }) }} value={newOffer.modelo} />
          <Input placeholder="Ano" onChange={(e) => { setNewOffer({ ...newOffer, ano: e.target.value }) }} value={newOffer.ano} />
          <Input placeholder="Preço" onChange={(e) => { setNewOffer({ ...newOffer, preco: e.target.value }) }} value={newOffer.preco} />
          <Input placeholder="Cor" onChange={(e) => { setNewOffer({ ...newOffer, cor: e.target.value }) }} value={newOffer.cor} />
          <Input placeholder="KM" onChange={(e) => { setNewOffer({ ...newOffer, km: e.target.value }) }} value={newOffer.km} />
          <Input placeholder="Placa" onChange={(e) => { setNewOffer({ ...newOffer, placa: e.target.value }) }} value={newOffer.placa} />
          <Input placeholder="Cidade" onChange={(e) => { setNewOffer({ ...newOffer, cidade: e.target.value }) }} value={newOffer.cidade} />
          <Input placeholder="Data" type="date" onChange={(e) => { setNewOffer({ ...newOffer, data: e.target.value }) }} value={newOffer.data} />
        </Modal>
      </div>

    </>
  )
}

export default Admin
