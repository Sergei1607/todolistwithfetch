import React, { useState, useEffect } from "react";

export function List() {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const [notodo, setNotodo] = useState();
	let numero = 0;
	let activeIcon = { display: "block" };
	let deactiveIcon = { display: "none" };

	const handleover = e => {
		setActiveIndex(e);
	};

	useEffect(() => {
		getApiData();
	});

	function putApiData() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([...todos, { label: todo, done: false }]);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Sergei1607",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	function getApiData() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Sergei1607",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setTodos(result))
			.catch(error => console.log("error", error));
	}

	function deleteall() {
		var requestOptions = {
			method: "DELETE",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Sergei1607",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	function createpost() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([]);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Sergei1607",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	return (
		<div id="main">
			<div className="container d-flex justify-content-center">
				<div className="row">
					<div className="col">
						<input
							className="p-1"
							value={todo}
							onChange={e => setTodo(e.target.value)}
							placeholder="What's need to be done?"
						/>
						<button
							id="addtodo"
							className="btn p-1"
							onClick={putApiData}>
							<i className="fas fa-check-circle fa-2x"></i>
						</button>
					</div>
				</div>
			</div>
			<div className="container d-flex justify-content-center ">
				<div className="row">
					<div className="col-12">
						<ul className="list-group list-group-flush">
							{notodo}
							{todos.map((item, index) => {
								numero++;
								return (
									<li
										key={index}
										className="list-group-item"
										onMouseEnter={() => handleover(index)}
										onMouseLeave={() => setActiveIndex("")}
										name={index}>
										{item.label}
										<i
											style={
												activeIndex === index
													? activeIcon
													: deactiveIcon
											}
											id="delete"
											className="fas fa-times-circle fa-sm"
											onClick={function() {
												todos.splice(index, 1);
												if (numero === 1) {
													setNotodo(
														<li className="list-group-item">
															No tasks, add a task
														</li>
													);
												}
											}}></i>
									</li>
								);
							})}
							<li id="counter" className="list-group-item">
								{" "}
								{numero} Items left.
							</li>
						</ul>
					</div>
				</div>
			</div>
			<button id="deleteall" type="button" onClick={deleteall}>
				Delete all
			</button>
		</div>
	);
}
