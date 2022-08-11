import React from "react";
import "./Modal.css";
import { useState } from "react";

function Modal({ setOpenMic, setModal, nextModal, word, setWord, arrayContact}) {
  const [activateMic, setActivateMic] = React.useState(false);



  console.log(arrayContact)

  if (!("webkitSpeechRecognition" in window)) {
  } else {
    let SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    let SpeechGrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList;
    let recognition = new SpeechRecognition();
    let recognitionList = new SpeechGrammarList();
    recognition.grammars = recognitionList;
    recognition.lang = "es-ES";
    recognition.continuous = false;

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const handleMic = (statusMic) => {
      document.getElementsByClassName("fa-microphone")[0].style.color = "green";
      document.getElementsByClassName("fa-microphone")[0].style.transform =
        "scale(1.5)";

      setActivateMic(statusMic);

      if (statusMic) {
        recognition.start();
        recognition.onresult = (event) => {
          setWord(event.results[0][0].transcript);
        };
      } else {
        recognition.stop();
        document.getElementsByClassName("fa-microphone")[0].style.color =
          "#ED1C27";
        document.getElementsByClassName("fa-microphone")[0].style.transform =
          "scale(1)";
      }

      //Para cambiar el color del microfono luego de 5 segundos de hablar
      setTimeout(() => {
        document.getElementsByClassName("fa-microphone")[0].style.color =
          "#ED1C27";
        document.getElementsByClassName("fa-microphone")[0].style.transform =
          "scale(1)";
      }, 5000);
    };

    return (
      <div className="container-modal">
        {nextModal === 0 ? (
          <div className="first-content">
            <div className="content--decoration"></div>
            <div className="content--name">
              <p>Hola Julian,</p>
            </div>
            <div className="content--text">
              <p>
                Tenga en cuenta que para realizar una transferencia por voz a
                Daviplata, sus cuentas deben estar activas y con saldo
                <br></br>
                <br></br>
                Si quieres continuar, activa el microfono y di "Continuar", o si
                quieres salir, di "Cerrar"
              </p>
            </div>
            <div className="content--micro">
              <i
                class="fa-solid fa-microphone"
                onClick={() => handleMic(!activateMic)}
              ></i>

              {/* Se hace uso del timeout para que el proceso se ejecute en el
              event loop, así se evita que haya interferencia con el render de
              react, por lo que no ocasionará problemas, y se le asigna un valor
              de 1 milisegundo para que sea lo más rápido posible. */}

              {/* Este timeout se usará en los demás modales para el mismo fin */}

              {word.toLowerCase().includes("continuar") ? (
                <>
                  <p>
                    {" "}
                    {setTimeout(() => {
                      setWord("");
                      setModal(1);
                    }, 1)}
                  </p>
                </>
              ) : word.toLowerCase().includes("salir") ? (
                <>
                  {setTimeout(() => {
                    setWord("");
                    setModal(0);
                    setOpenMic(false);
                  }, 1)}
                </>
              ) : word !== "" ? (
                <>
                  <p>Por favor repite otra vez</p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : nextModal === 1 ? (
          <div className="second-content">
            <div className="content--decoration"></div>
            <div className="content--name">
              <p>Hola Julian,</p>
            </div>
            <div className="content--text">
              <p>
                Por lo general, usted realiza transferencias a los siguientes destinos Daviplata
              </p>
              <div className="content--contacts">

                {
                  setTimeout(() => {
                    arrayContact.map((element) => {
                      return (
                        <div class="contact">
                        <p>{console.log(element.name)}</p>
                      <div className="info-contact">
                        <h2 id="hola">{element.name}</h2>
                        <p>{element.phone}</p>
                      </div>
                      <i class="fa-solid fa-arrow-right"></i>
                    </div>
                      )
                    })
                  }, 1)
                

                }


                <div class="contact">
                  <div className="info-contact">
                    <h2>{arrayContact[0].name}</h2>
                    <p>320 123 4567</p>
                  </div>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <div class="contact">
                  <div className="info-contact">
                    <h2>Arriendo</h2>
                    <p>321 555 1234</p>
                  </div>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <div class="contact">
                  <div className="info-contact">
                    <h2>Oficina</h2>
                    <p>321 555 1234</p>
                  </div>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <p> Si desea transferir a algunos de estos destinos diga el destino o nueva transferencia </p>
              </div>


            </div>
            <div className="content--micro">
              <i
                class="fa-solid fa-microphone"
                onClick={() => handleMic(!activateMic)}
              ></i>

              {word.toLowerCase().includes("continuar") ? (
                <>
                  <p>{setModal(2)}</p>
                </>
              ) : word.toLowerCase().includes("salir") ? (
                <>
                  <p>{setModal(0)}</p>
                  <p>{setOpenMic(false)}</p>
                </>
              ) : word !== "" ? (
                <>
                  <p>Por favor repite otra vez</p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : nextModal === 2 ? (
          ""
        ) : nextModal === 3 ? (
          ""
        ) : (
          nextModal === 4
        )}
      </div>
    );
  }
}

export { Modal };
