import Gasto from "./Gasto";

const ListaGastos = ({gastos, setEditarGasto, eliminarGasto}) => {
    return ( <div className="listado-gastos contenedor">
        <h2>{gastos.length ? 'Gastos Realizados' : 'Aun no hay gastos registrados'}</h2>
        {gastos.map(it=><Gasto key={it.id} gasto={it} setEditarGasto={setEditarGasto} eliminarGasto={eliminarGasto}/>)}
    </div> );
}
 
export default ListaGastos;