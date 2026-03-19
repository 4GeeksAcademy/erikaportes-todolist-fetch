import React, { useState, useEffect } from "react";

const URL = "https://playground.4geeks.com/todo/users/erikaportes";
const USER = "erikaportes";

const ToDoList = () => {

	const [inputTarea, setInputTarea] = useState("")
	const [listaTareas, setListaTareas] = useState([])

	console.log(listaTareas)
	async function crearTarea(Enter) {
		if (Enter === "Enter" && inputTarea.trim() !== "") {

			const response = await fetch('https://playground.4geeks.com/todo/todos/erikaportes', {
				method: 'POST',
				body: JSON.stringify({
					"label": inputTarea,
					"is_done": false
				}),  // la variable dataToSend puede ser un 'string' o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (response.ok) {
				const data = await response.json();
				setInputTarea("")
				traerTarea()
				return data;
			} else {
				console.log('error: ', response.status, response.statusText);
				/* Realiza el tratamiento del error que devolvió el request HTTP */
				return { error: { status: response.status, statusText: response.statusText } };
			};

		}
	}

	const traerTarea = async () => {
		const response = await fetch('https://playground.4geeks.com/todo/users/erikaportes');
		if (response.ok) {
			const data = await response.json();
			setListaTareas(data.todos)
			return data;
		} else {
			console.log('error: ', response.status, response.statusText);
			/* Realiza el tratamiento del error que devolvió el request HTTP */
			return { error: { status: response.status, statusText: response.statusText } };
		};
	};

	useEffect(() => { traerTarea() }, [])

	function trash(indice) {
		setListaTareas(listaTareas.filter((item, i) => indice != i))
	}

	return (

		<>
			<h1>My Todos</h1>
			<div className="container">

				<input
					type="text"
					placeholder='What do you need to do?'
					value={inputTarea}
					onChange={e => setInputTarea(e.target.value)}
					onKeyUp={evento => crearTarea(evento.key)}
				/>
				<ul className="list-group">
					{listaTareas.map((tarea, indice) => {
						return (
							<li
								className="list-group-item d-flex justify-content-between align-items-center tarea-item"
								key={tarea + indice} >
								{tarea.label}
								<i
									onClick={() => trash(indice)}
									className="fa-solid fa-trash-can trash-icon ms-auto">
								</i>
							</li>
						)
					})
					}
				</ul>
				<div>{listaTareas.length} tasks</div>

			</div>

		</>

	)
};

export default ToDoList;