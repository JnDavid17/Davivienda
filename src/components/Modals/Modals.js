import React from "react";
import "./Modals.css";
import { useEffect } from "react";

function Modal({
  setOpenMic,
  setModal,
  nextModal,
  word,
  setWord,
  arrayContact,
  contact,
  setContact,
  accounts,
  account,
  setAccount,
  comprobante,
  setComprobante,
  date,
  setDate,
  hour,
  setHour
}) {
  const [activateMic, setActivateMic] = React.useState(false);



  const random =  Math.floor(Math.random() * (50000 - 4000 + 1)) + 4000
  // Solo sucede cuando el modal 5 aparezca
  useEffect(()=>{
    const current = new Date();


    setDate(`${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`)

    setHour(`${current.getHours()}:${
      current.getMinutes()
    }:${current.getSeconds()} ${current.getHours > 12 ? "pm" : "am"}`)

  }, [nextModal === 5]);

  // Se hace la validacion de que navegador web está usando el usuario
  if (navigator.userAgent.indexOf("Chrome") === -1) {
    alert("La funcionalidad del reconocimiento de voz sólo está disponible en Google Chrome ")
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
        recognition.stop();
        setActivateMic(false);
      }, 5000);
    };

    const handleArray = (name, number, id) => {
      if (id === 1) {
        if (contact.length <= 2) {
          setContact([name, number]);
        }

        if (!contact[0].includes(name)) {
          setContact([name, number]);
        }
        console.log(contact);
      } else {
        if (account.length <= 2) {
          setAccount([name, number]);
        }

        if (!contact[0].includes(name)) {
          setAccount([name, number]);
        }

        console.log(account);
      }
    };

    const handleTime = (id, modal) => {
      setTimeout(() => {
        setWord("");
        setModal(modal);
        if (id === 1) {
          setOpenMic(false);
        }
      }, 1);
    };



    return (
      <div className="container-modal">
        {nextModal === 1 ? (
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
                quieres salir, di "Salir"
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
                <>{handleTime(2, 2)}</>
              ) : word.toLowerCase().includes("salir") ? (
                <>{handleTime(1, 1)}</>
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
          <div className="second-content">
            <div className="content--decoration"></div>
            <div className="content--name">
              <p>Hola Julian,</p>
            </div>
            <div className="content--text">
              <p>
                Por lo general, usted realiza transferencias a los siguientes
                destinos Daviplata
              </p>
              <div className="content--contacts">
                <div class="contact">
                  <div className="info-contact">
                    <h2>{arrayContact[0].name}</h2>
                    <p>{arrayContact[0].phone}</p>
                  </div>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <div class="contact">
                  <div className="info-contact">
                    <h2>{arrayContact[1].name}</h2>
                    <p>{arrayContact[1].phone}</p>
                  </div>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>

                <div class="contact">
                  <div className="info-contact">
                    <h2>{arrayContact[2].name}</h2>
                    <p>{arrayContact[2].phone}</p>
                  </div>
                  <i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
              <p>
                {" "}
                Si desea transferir a algunos de estos destinos diga el destino
                o nueva transferencia{" "}
              </p>

              <p className="indicative-text">
                <b>Transferir a mamá</b>
              </p>

            </div>
            <div className="content--micro">
              <i
                class="fa-solid fa-microphone"
                onClick={() => handleMic(!activateMic)}
              ></i>

              {word
                .toLowerCase()
                .includes(arrayContact[0].name.toLowerCase()) ? (
                <>
                  {handleArray(arrayContact[0].name, arrayContact[0].phone, 1)}
                  {handleTime(2, 3)}
                </>
              ) : word.toLowerCase().includes("salir") ? (
                <>{handleTime(1, 1)}</>
              ) : word
                  .toLowerCase()
                  .includes(arrayContact[1].name.toLowerCase()) ? (
                <>
                  {handleArray(arrayContact[1].name, arrayContact[1].phone, 1)}
                  {handleTime(2, 3)}
                </>
              ) : word
                  .toLowerCase()
                  .includes(arrayContact[2].name.toLowerCase()) ? (
                <>
                  {handleArray(arrayContact[2].name, arrayContact[2].phone, 1)}
                  {handleTime(2, 3)}
                </>
              ) : word !== "" ? (
                <>Por favor repite otra vez</>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : nextModal === 3 ? (
          <div className="third-content">
            <div className="content--decoration"></div>
            <div className="content--text">
              <p className="third-content-text">
                Indique alias o los cuatro últimos dígitos de la cuenta desde la
                cual realizará la transferencia
              </p>
              <div className="content--accounts">
                <p className="indicative-text">
                  {" "}
                  <b>Cuenta terminada en 1234</b>
                </p>
                <div class="account">
                  <div className="info-account">
                    <h2>{accounts[0].name}</h2>
                    <p>{accounts[0].number}</p>
                  </div>

                  <div className="right-account">
                    <div className="amount-account">
                      <h2>{accounts[0].amount}</h2>
                      <p>Saldo disponible</p>
                    </div>
                    <i class="fa-solid fa-arrow-right"></i>
                  </div>
                </div>

                <div class="account">
                  <div className="info-account">
                    <h2>{accounts[1].name}</h2>
                    <p>{accounts[1].number}</p>
                  </div>

                  <div className="right-account">
                    <div className="amount-account">
                      <h2>{accounts[1].amount}</h2>
                      <p>Saldo disponible</p>
                    </div>
                    <i class="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="content--micro">
              <i
                class="fa-solid fa-microphone"
                onClick={() => handleMic(!activateMic)}
              ></i>

              {word.toLowerCase().includes(accounts[0].number.substr(15, 9)) ||
              word.toLowerCase().includes(accounts[0].name.toLowerCase()) ? (
                <>
                  {handleArray(accounts[0].name, accounts[0].number, 2)}
                  {handleTime(2, 4)}
                </>
              ) : word.toLowerCase().includes("salir") ? (
                <>{handleTime(1, 1)}</>
              ) : word
                  .toLowerCase()
                  .includes(accounts[1].number.substr(15, 9)) ||
                word.toLowerCase().includes(accounts[1].name.toLowerCase()) ? (
                <>
                  {handleArray(accounts[1].name, accounts[1].number, 2)}
                  {handleTime(2, 4)}
                </>
              ) : word !== "" ? (
                <>Por favor repite otra vez</>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : nextModal === 4 ? (
          <div className="fourth-content">
            <div className="content--decoration"></div>
            <div className="content--text">
              <p className="fourth-content-text">
                Para continuar su transacción diga <b>Transferir</b>, de lo
                contrario indique el campo que desea modificar
              </p>
              <div className="content--description">
                <p className="indicative-text">
                  <b>Modificar destino</b>
                </p>
                <p className="indicative-text">
                  <b>Modificar origen</b>
                </p>
                <div className="card-description">
                  <div className="card-data">
                    <div className="card-data--origin">
                      <p>Origen</p>
                      <h3>{account[0]}</h3>
                      <p className="number">{account[1]}</p>
                    </div>
                    <i class="fa-solid fa-arrow-right narrow-color"></i>

                    <div className="card-data--destiny">
                      <p>Destino</p>
                      <h3>{contact[0]}</h3>
                      <p className="number">{contact[1]}</p>
                    </div>
                  </div>

                  <div className="card-transaction">
                    <div className="card-transaction--value">
                      <p>Valor</p>
                      <h1>$100.000,00</h1>
                    </div>

                    <div className="card-transaction--cost">
                      <p>Costo de la transaccion</p>
                      <h1>
                        <b>$0</b>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content--micro">
                <i
                  class="fa-solid fa-microphone"
                  onClick={() => handleMic(!activateMic)}
                ></i>

                {word.toLowerCase().includes("destino") ? (
                  <>{handleTime(2, 2)}</>
                ) : word.toLowerCase().includes("salir") ? (
                  <>{handleTime(1, 1)}</>
                ) : word.toLowerCase().includes("origen") ? (
                  <>
                    {handleTime(2, 3)}

                    <p>{word}</p>
                  </>
                ) : word.toLowerCase().includes("transferir") ? (
                  <>
                    {handleTime(2, 5)}

                    <p>{word}</p>
                  </>
                ) : word !== "" ? (
                  <>Por favor repite otra vez</>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : nextModal === 5 ? (
          <div className="fifth-content">
            <div className="content--decoration"></div>
            <div className="content--text">
              <p className="fifth-content-text">
                Julian, ha realizado la transferencia exitosa a Daviplata.
                <br/>
                <br/>
                ¿Desea realizar otra transferencia a Daviplata?, si es asi, por
                favor diga:
                <br/>
                <br/>
                
                <b>"Realizar otra transferencia"</b>o en su defecto,{" "}
                <b>"Salir del modulo"</b>
              </p>
              <div className="content--description">

                <div className="card-description">
                  <div className="card-top">
                    <div className="card-comprobante">
                      <p>Numero de comprobante</p>
                      <h3>{random}</h3>
                    </div>

                    <div className="card-date">
                      <p>Dia: {date}</p>
                      <p>Hora: {hour}</p>
                    </div>
                  </div>
                  <div className="card-data">
                    <div className="card-data--origin">
                      <p>Origen</p>
                      <h3>{account[0]}</h3>
                      <p className="number">{account[1]}</p>
                    </div>
                    <i class="fa-solid fa-arrow-right narrow-color"></i>

                    <div className="card-data--destiny">
                      <p className="text-destiny">Destino</p>
                      <h3>{contact[0]}</h3>
                      <p className="number">{contact[1]}</p>
                    </div>
                  </div>

                  <div className="card-transaction">
                    <div className="card-transaction--value">
                      <p>Valor</p>
                      <h1>$100.000,00</h1>
                    </div>

                    <div className="card-transaction--cost">
                      <p>Costo de la transaccion</p>
                      <h1>
                        <b>$0</b>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content--micro">
                <i
                  class="fa-solid fa-microphone"
                  onClick={() => handleMic(!activateMic)}
                ></i>

                {word.toLowerCase().includes("transferencia") ? (
                  <>{handleTime(2, 1)}</>
                ) : word.toLowerCase().includes("salir") ? (
                  <>{handleTime(1, 1)}</>
                ) : word !== "" ? (
                  <>Por favor repite otra vez</>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export { Modal };
