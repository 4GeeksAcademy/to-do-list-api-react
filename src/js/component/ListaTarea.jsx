import React from 'react';
import Tarea from './Tarea';

const ListaTarea = ({ listaTareas, setListaTareas }) => {

    const editandoTarea = (id, nuevoTexto) => {
        setListaTareas(listaTareas.map((tarea) => {
            if (tarea.id === id) {
                return { ...tarea, label: nuevoTexto };
            }
            return tarea;
        }));
    };

    return (
        <ul className='lista-tareas'>
            {listaTareas.length > 0
                ? listaTareas.map((tarea) => {
                    return (
                        <Tarea
                            key={tarea.id}
                            tarea={tarea}
                            editarTarea={editandoTarea}
                            setListaTareas={setListaTareas}
                            listaTareas={listaTareas}
                        />
                    );
                })
                : <div className='lista-tareas_mensaje'>No hay tareas</div>
            }
        </ul>
    );
};

export default ListaTarea;
