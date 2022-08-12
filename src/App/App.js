import { Header } from '../components/Header';
import { Modal } from '../components/Modals/Modals';
import React from 'react';
import './App.css';

function App() {
  const [openMic, setOpenMic] = React.useState(false);
  const [nextModal, setNextModal] = React.useState(1);
  const [word, setWord] = React.useState("");
  const [contact, setContact] = React.useState([]);
  const [account, setAccount] = React.useState([]);
  const [comprobante, setComprobante] = React.useState(304003);
  const [hour, setHour] = React.useState("")
  const [date, setDate] = React.useState("")

  const arrayContact = [
    {
      name: "Mamá",
      phone: "320 123 4567"
    },
    {
      name: "Arriendo",
      phone: "321 555 1234"
    },
    {
      name: "Oficina",
      phone: "321 555 1234"
    },
  ]

  const accounts = [
    {
      name: "Cuenta de Ahorros",
      number: "1234 5678 7865 1234",
      amount: "$999.999.999,00"
    },
    {
      name: "Cuenta Corriente",
      number: "3456 7890 2233 4567",
      amount: "$999.999.999,00"
    }
  ]


  return (
    <div className="App">
      <Header
      // openMic = {openMic}
      setOpenMic = {setOpenMic}
      />
      {
        openMic ? (
          <Modal
          setOpenMic = {setOpenMic}
          setModal = {setNextModal}
          nextModal = {nextModal}
          word = {word}
          setWord = {setWord}
          arrayContact = {arrayContact}
          setContact = {setContact}
          contact = {contact}
          accounts = {accounts}
          account = {account}
          setAccount = {setAccount}
          comprobante = {comprobante}
          setComprobante = {setComprobante}
          date = {date}
          setDate = {setDate}
          hour = {hour}
          setHour = {setHour}
          />
        ):(
          ""
        )
      }

    </div>
  );
}

export default App;
