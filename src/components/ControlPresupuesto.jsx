import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastos, setPresupuesto, setGastos, setIsValid}) => {
  const [disponible,setDisponible] = useState(0);
  const [gastado,setGastado] = useState(0);
  const [porcentaje,setPorcentaje] = useState(0);

  useEffect(()=>{
    const totalGastado = gastos.reduce((total,it)=>+it.cantidad+total , 0);
    const consumido = ((totalGastado*100)/presupuesto).toFixed(2);
    setGastado(totalGastado);
    setDisponible(presupuesto-totalGastado);
    setTimeout(()=>{
      setPorcentaje(consumido);
    },1000);
  },[gastos]);

  const formatearMontos = (monto) => {
    return monto.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
  };

  const resetAppHandler =()=>{
    if(confirm('Esta seguro de resetear la app de presupuestos?')){
      setGastos([]);
      setPresupuesto(0);
      setIsValid(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
          pathColor: porcentaje >100 ? '#DC2626' : '#3B82F6',
          trailColor: '#F5F5F5',
          textColor: porcentaje >100 ? '#DC2626' : '#3B82F6'
        })}/>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" onClick={resetAppHandler}>Resetear App</button>
        <p>
          <span>Presupuesto: </span>
          {formatearMontos(presupuesto)}
        </p>
        <p className={`${disponible<0?'negativo':''}`}>
          <span>Disponible: </span>
          {formatearMontos(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearMontos(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
