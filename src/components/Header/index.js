import React from "react";
import { useSpring, animated } from "react-spring";
import "./index.css";

function Header({setOpenMic}) {
  const [toggleDiv, setToggleDiv] = React.useState(false);
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const styleMenu = useSpring({
    to: {
      opacity: toggleMenu ? 1 : 0,
      y: toggleMenu ? 0 : 200,
    },
    config: { duration: "300" },
  });

  const styleDiv = useSpring({
    to: {
      opacity: toggleDiv ? 1 : 0,
      x: toggleDiv ? 0 : 200,
    },
    config: { duration: "300" },
  });

  // const [isDesktop, setIsDesktop] = React.useState(false);

  //   const handleResize = () => {
  //     if(window.innerWidth > 768){
  //         setIsDesktop(true)
  //     }else{
  //         setIsDesktop(false)
  //     }
  //   };

  //   useEffect(() => {
  //     window.addEventListener("resize", handleResize)
  //   })

  return (
    <div className="container-header">
      <header>
        <div className="div-image">
          {/* <img src="src/assets/davivienda.png" alt="nose"></img> */}
        </div>

        {toggleDiv ? (
          <i
            className={`fa-solid fa-xmark`}
            onClick={() => setToggleDiv(!toggleDiv)}
          ></i>
        ) : (
          <i
            className={`fa-solid fa-bars`}
            onClick={() => setToggleDiv(!toggleDiv)}
          ></i>
        )}


        <div className="dropdown">
          <h2> Transferencias y avances </h2>
          <div className="dropdown-menu">
            <div className="dropdown--item">Entre mis productos Davivienda</div>
            <div className="dropdown--item">A otras cuentas Davivienda</div>
            <div className="dropdown--item">A Daviplata</div>
            <div className="dropdown--item">A cuentas de otros bancos</div>
            <div className="dropdown--item">Desde y hacia mis bolsillos</div>
            <div className="dropdown--item">Giros internacionales</div>
            <div className="dropdown--item">Avances</div>
            <div className="dropdown--item" id="focus" onClick={() => setOpenMic(true) }>
              Transferencia a DaviPlata por comando de voz
            </div>
          </div>
        </div>
      </header>

      {toggleDiv ? (
        <animated.div className="div-dropdown" style={styleDiv}>
          <div className="div-dropdown--header">
            <h3 className="name">Julian David Suarez Martinez</h3>
            <div className="div-dropdown--title">
              {toggleMenu ? (
              <i
              className="fa-solid fa-circle-chevron-up"
              onClick={() => setToggleMenu(!toggleMenu)}
              ></i>
              ) : (
                <i
                className="fa-solid fa-circle-chevron-down"
                onClick={() => setToggleMenu(!toggleMenu)}
              ></i>
              )}

              <p> Transferencias y avances </p>
            </div>
          </div>
          {toggleMenu ? (
            <animated.div className="dropdown-menu2" style={styleMenu}>
              <div className="dropdown--item2">
                <p>Entre mis productos Davivienda</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div className="dropdown--item2">
                <p>A otras cuentas Davivienda</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div className="dropdown--item2">
                <p>A Daviplata</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div className="dropdown--item2">
                <p>A cuentas de otros bancos</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div className="dropdown--item2">
                <p>Desde y hacia mis bolsillos</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div className="dropdown--item2">
                <p>Giros internacionales</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div className="dropdown--item2">
                <p>Avances</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
              <div className="dropdown--item2" id="focus" onClick={() => setOpenMic(true)}>
                <p>Transferencia a DaviPlata por comando de voz</p>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </animated.div>
          ) : (
            ""
          )}
        </animated.div>
      ) : (
        ""
      )}
    </div>
  );
}

export { Header };
