import { useState } from 'react';
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje';

const initValue={nombre:'',cantidad:'',categoria:''}

const Modal = ({setModal, animarModal, setAnimarModal, saveGasto, editarGasto, setEditarGasto}) => {
    const [gasto,setGasto] = useState(editarGasto ? editarGasto : initValue);
    const [mensaje,setMensaje] = useState('');

    const handleCloseModal=()=>{
        setEditarGasto({});
        setAnimarModal(false);
        setTimeout(()=>{
            setModal(false);
        },500);
    };

    const changeHandler =(nombre,e)=>{
        setGasto((prevState)=>{
            return {...prevState, [nombre]:e.target.value};
        });
    };

    const handleSubmit=e=>{
        e.preventDefault();
        if(Object.values(gasto).some((it) => it === "")){
            setMensaje("Algun campo esta vacio, completa los campos.");
            setTimeout(()=>{
                setMensaje("");
            },3000);
            return;
        }
        saveGasto(gasto);
    };

    return ( <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarModal} alt="Cerrar Ventana" onClick={handleCloseModal}/>
        </div>
        <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} onSubmit={handleSubmit}>
            <legend>{editarGasto.nombre ? 'Editar Gasto':'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor='nombre'>Nombre Gasto</label>
                <input id='nombre' type='text' placeholder='Añade nombre al gasto' value={gasto.nombre} onChange={changeHandler.bind(this,'nombre')}/>
            </div>
            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>
                <input id='cantidad' type='number' placeholder='Añade la cantidad del gasto, Ej: 300' value={gasto.cantidad} onChange={changeHandler.bind(this,'cantidad')}/>
            </div>
            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>
                <select id='categoria' value={gasto.categoria} onChange={changeHandler.bind(this,'categoria')}>
                    <option value=''>--Seleccione--</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>
            </div>
            <input type='submit' value={Object.keys(editarGasto).length>0 ? "Editar":"Añadir Gasto"}/>
        </form>
    </div> );
}
 
export default Modal;