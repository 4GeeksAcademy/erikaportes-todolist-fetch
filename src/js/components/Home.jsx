import React, { useState, useEffect } from "react";

const URL = "https://playground.4geeks.com/todo/users/erikaportes";
const USER = "erikaportes";

const ToDoList = () => {

	const [inputTarea, setInputTarea] = useState("")
	const [listaTareas, setListaTareas] = useState([])

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

	const eliminarTodas = async () => {
	try {
		// Ejecuta DELETE para cada tarea
		await Promise.all(
			listaTareas.map(tarea =>
				fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
					method: "DELETE"
				})
			)
		);

		// Refresca la lista
		setListaTareas([]);

	} catch (error) {
		console.error("Error al eliminar todas las tareas:", error);
	}
};

	// // BORRAR TODAS LAS TAREAS
	// const eliminarTodo = async () => {
	// 	try {
	// 		const response = await fetch(API_URL, { method: "DELETE" });
	// 		if (response.ok) {
	// 			setListaTareas([]);
	// 			crearUsuario();
	// 		}
	// 	} catch (error) {
	// 		console.error("Error al eliminar todas las tareas:", error);
	// 	}
	// };

	useEffect(() => {
		traerTarea()
	}, [])

	return (

		<>
			<h1>My Todos</h1>
			<div className="container">

				<input
					type="text"
					placeholder='Agrega alguna tarea'
					value={inputTarea}
					onChange={e => setInputTarea(e.target.value)}
					onKeyUp={evento => crearTarea(evento.key)}
				/>
				<ul className="list-group">
					{listaTareas.length === 0 ? (
						<li className="list-group-item text-muted">
							No hay tareas, agrega alguna tarea.
						</li>
					) : 

					listaTareas.map((tarea, indice) => {
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

				<div className="footer-container d-flex justify-content-between align-items-center mt-3 p-2 border-top">
					<small className="text-muted">{listaTareas.length} items left</small>

					{/* BOTÓN PARA ELIMINAR TODO */}
					{listaTareas.length > 0 && (
						<button
							className="btn btn-danger btn-sm"
							onClick={eliminarTodas}
						>
							Borrar todo
						</button>
					)}
				</div>

				{/* <div>{listaTareas.length} tasks</div> */}

			</div>

		</>

	)
};

export default ToDoList;




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


	// BORRAR TAREA "DELETE"
	// function trash(indice) {
	// 	setListaTareas(listaTareas.filter((item, i) => indice != i))
	// }