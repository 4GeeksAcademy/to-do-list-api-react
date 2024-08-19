import React from "react";

const Footer = ({ listaTareas, setListaTareas }) => {

    const eliminarYRecrearUsuario = async () => {
        try {
            const resDelete = await fetch("https://playground.4geeks.com/todo/users/amanda", {
                method: "DELETE"
            });

            if (!resDelete.ok) {
                throw new Error("Error al eliminar el usuario");
            }

            const resCreate = await fetch("https://playground.4geeks.com/todo/users/amanda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            });

            if (resCreate.ok) {
                setListaTareas([]);
            } else {
                throw new Error("Error al recrear el usuario");
            }
        } catch (error) {
            console.error("Error en el proceso de eliminar y recrear el usuario", error);
        }
    };

    const taskText = listaTareas.length === 1 ? 'tarea' : 'tareas';

    return (
        <footer>
            <button onClick={eliminarYRecrearUsuario}>Eliminar y recrear usuario</button>
            <p className='contador'>Tienes {listaTareas.length} {taskText}</p>
        </footer>
    );
}

export default Footer;
