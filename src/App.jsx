import { useEffect, useState } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListaGastos from "./components/ListaGastos";
import { generarId } from "./util";
import Filtro from "./components/Filtro";

function App() {
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValid, setIsValid] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [editarGasto, setEditarGasto] = useState({});
  const [filtro,setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (presupuesto > 0) {
      setIsValid(true);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      handleNuevoGasto();
    }
  }, [editarGasto]);

  useEffect(() => {
    if(filtro){
      const gastosFiltrados=gastos.filter(it=>it.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto);
  }, [presupuesto]);

  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const saveGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((it) =>
        it.id === gasto.id ? gasto : it
      );
      setGastos((prevState) => {
        return [...gastosActualizados];
      });
    } else {
      const newGasto = {
        ...gasto,
        cantidad: +gasto.cantidad,
        id: generarId(),
        fecha: Date.now(),
      };
      setGastos((prevState) => {
        return [...prevState, newGasto];
      });
    }

    setAnimarModal(false);
    setEditarGasto({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = (id) => {
    if (confirm("Esta seguro de eliminar el gasto?")) {
      setGastos((prevState) => prevState.filter((it) => it.id !== id));
      setGastosFiltrados([]);
    }
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValid={isValid}
        setIsValid={setIsValid}
        setGastos={setGastos}
      />
      {isValid && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro}/>
            <ListaGastos
              gastos={filtro ? gastosFiltrados : gastos}
              setEditarGasto={setEditarGasto}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          saveGasto={saveGasto}
          editarGasto={editarGasto}
          setEditarGasto={setEditarGasto}
        />
      )}
    </div>
  );
}

export default App;
