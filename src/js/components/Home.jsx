import React, { useState, useEffect } from "react";

const URL = "https://playground.4geeks.com/todo/users/erikaportes";
const USER = "erikaportes";

const ToDoList = () => {

	const [inputTarea, setInputTarea] = useState("")
	const [listaTareas, setListaTareas] = useState([])

	// AGREGAR TAREA "POST"
	// async function crearTarea(Enter) {
	// 	if (Enter === "Enter" && inputTarea.trim() !== "") {

	// 		const response = await fetch(`https://playground.4geeks.com/todo/todos/${USER}`, {
	// 			method: 'POST',
	// 			body: JSON.stringify({
	// 				"label": inputTarea,
	// 				"is_done": false
	// 			}),
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		});
	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setInputTarea("")
	// 			traerTarea()
	// 			return data;
	// 		} else {
	// 			console.log('error: ', response.status, response.statusText);
	// 			return { error: { status: response.status, statusText: response.statusText } };
	// 		};

	// 	}
	// }

	// AGREGAR TAREA "POST"
	async function crearTarea(Enter) {
		if (Enter === "Enter" && inputTarea.trim() !== "") {

			try {
				const response = await fetch(`https://playground.4geeks.com/todo/todos/${USER}`, {
					method: 'POST',
					body: JSON.stringify({
						label: inputTarea,
						is_done: false
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				if (!response.ok) {
					throw new Error(`HTTP error: ${response.status}`);
				}

				const data = await response.json();

				setInputTarea("");
				traerTarea();

				return data;

			} catch (error) {
				console.error("Error al crear tarea:", error);
			}
		}
	}


	// TRAER TAREA "GET"
	// const traerTarea = async () => {
	// 	const response = await fetch('https://playground.4geeks.com/todo/users/erikaportes');
	// 	if (response.ok) {
	// 		const data = await response.json();
	// 		setListaTareas(data.todos)
	// 		return data;
	// 	} else {
	// 		console.log('error: ', response.status, response.statusText);
	// 		/* Realiza el tratamiento del error que devolvió el request HTTP */
	// 		return { error: { status: response.status, statusText: response.statusText } };
	// 	};
	// };

	// TRAER TAREA "GET"
	const traerTarea = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${USER}`);

			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}

			const data = await response.json();
			setListaTareas(data.todos);

			return data;

		} catch (error) {
			console.error("Error al traer tareas:", error);
		}
	};


	// BORRAR TAREA "DELETE"
	// function trash(indice) {
	// 	setListaTareas(listaTareas.filter((item, i) => indice != i))
	// }

	// BORRAR TAREA "DELETE"
	const eliminarTarea = async (id) => {
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			});
			traerTarea();
		} catch (error) {
			console.error("No se pudo borrar la tarea:", error);
		}
	};


	useEffect(() => {
		traerTarea()
	}, [])

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
								key={tarea.id} >
								{tarea.label}
								<i
									// onClick={() => trash(indice)} o
									onClick={() => eliminarTarea(tarea.id)}
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