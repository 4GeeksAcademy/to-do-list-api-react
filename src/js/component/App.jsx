import React, { useEffect, useState } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import ListaTarea from './ListaTarea';
import Footer from './Footer';

const App = () => {
    const [listaTareas, setListaTareas] = useState([]);
    
    useEffect(() => {
        const cargarTareas = async () => {
            try {
                const res = await fetch("https://playground.4geeks.com/todo/users/amanda");
                if (!res.ok) {
                    throw new Error("Usuario no encontrado");
                }
                const data = await res.json();
                setListaTareas(data.todos);
            } catch (error) {
                console.log("Error al cargar la lista:", error);
                crearUsuario();
            }
        };

        const crearUsuario = async () => {
            try {
                const res = await fetch("https://playground.4geeks.com/todo/users/amanda", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify([])
                });
                if (res.ok) {
                    cargarTareas();
                }
            } catch (error) {
                console.log("Error al crear usuario", error);
            }
        };
        cargarTareas();
    }, []);

    console.log(listaTareas);

    return (
        <div className='contenedor'>
            <Header />
            <Formulario listaTareas={listaTareas} setListaTareas={setListaTareas} />
            <ListaTarea listaTareas={listaTareas} setListaTareas={setListaTareas} />
            <Footer listaTareas={listaTareas} setListaTareas={setListaTareas} />
        </div>
    );
};

export default App;
