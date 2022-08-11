import { Header } from '../components/Header';
import { Modal } from '../components/Modal/Modal';
import React from 'react';
import './App.css';

function App() {
  const [openMic, setOpenMic] = React.useState(false);
  const [nextModal, setNextModal] = React.useState(0);
  const [word, setWord] = React.useState("");

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
          />
        ):(
          ""
        )
      }

    </div>
  );
}

export default App;
