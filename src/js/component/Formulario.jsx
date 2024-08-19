import React, { useState } from 'react';

const Formulario = ({ listaTareas, setListaTareas }) => {
    const [inputTarea, setInputTarea] = useState("");

    const inserir = (e) => setInputTarea(e.target.value);
    
    const enviarDatos = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("https://playground.4geeks.com/todo/todos/amanda", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: inputTarea,
                    is_done: false
                })
            });
            const data = await res.json();
            setListaTareas([...listaTareas, data]);
        } catch (error) {
            console.log("Error al cargar la lista", error);
        }
    };

    return (
        <form className='formulario-tareas' onSubmit={enviarDatos}>
            <input className='formulario-tareas_input' 
                type="text"
                placeholder='Añadir tarea'
                value={inputTarea}
                onChange={(e) => inserir(e)}
            />
        </form>
    );
};

export default Formulario;
