import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Tarea = ({ tarea, editarTarea, setListaTareas, listaTareas }) => {
    const [editando, setEditando] = useState(false);
    const [nuevaTarea, setNuevaTarea] = useState(tarea.label);

    const enviarFormulario = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: nuevaTarea,
                    is_done: tarea.is_done
                })
            });
            if (!res.ok) {
                throw new Error("Error al actualizar la tarea");
            }
            const data = await res.json();
            editarTarea(data.id, data.label);
        } catch (error) {
            console.error("Error al actualizar la tarea", error);
        }
        setEditando(false);
    };

    const eliminarTarea = async () => {
        try {
            const res = await fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error("Error al eliminar la tarea");
            }
            setListaTareas(listaTareas.filter((t) => t.id !== tarea.id));
        } catch (error) {
            console.error("Error al eliminar la tarea", error);
        }
    };

    return (
        <li className="lista-tareas_tarea">
            {editando ? (
                <form className="formulario-editar-tarea" onSubmit={enviarFormulario}>
                    <input
                        className="formulario-editar-tarea_input"
                        type="text"
                        value={nuevaTarea}
                        onChange={(e) => setNuevaTarea(e.target.value)}
                    />
                    <button className="formulario-editar-tarea_btn">Actualizar</button>
                </form>
            ) : (
                tarea.label
            )}
            <div className="lista-tareas_contenedor-botones">
                <FontAwesomeIcon
                    icon={faEdit}
                    className="lista-tareas_icono lista-tareas_icono_accion"
                    onClick={() => setEditando(!editando)}
                />
                <button className='deleteButton' onClick={eliminarTarea}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </li>
    );
};

export default Tarea;
