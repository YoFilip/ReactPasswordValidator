import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
	const [password, setPassword] = useState("");
	const [date, setdate] = useState("");
	const [passwords, setPasswords] = useState([]);
	const [message, setMessage] = useState("");
	const [nameLength, setNameLength] = useState(0);

	const calculateNameLength = (name) => {
		return new Set(name.replace(/\s+/g, "").toLowerCase()).size;
	};

	useEffect(() => {
		const fullName = "FilipŚwiątek";
		setNameLength(fullName.length);
	}, []);

	const validateDateFormat = (date) => {
		return /^\d{2}\.\d{2}\.\d{4}$/.test(date);
	};

	const handleAddPassword = () => {
		if (!validateDateFormat(date)) {
			setMessage("Incorrect date format. Required format is DD.MM.YYYY.");
			return;
		}

		if (password.length < nameLength) {
			setMessage(`Password must be at least ${nameLength} characters long.`);
			return;
		}

		const nameCharacters = new Set(
			"FilipŚwiątek".replace(/\s+/g, "").toLowerCase().split("")
		);
		const passwordCharacters = new Set(password.toLowerCase().split(""));
		const validChars = [...passwordCharacters].filter((char) =>
			nameCharacters.has(char)
		);

		if (
			!/\d/.test(password) ||
			validChars.length < Math.ceil(nameCharacters.size / 2)
		) {
			setMessage(
				"Password must contain at least one digit and half of the different letters from the full name."
			);
			return;
		}

		if (passwords.find((p) => p.password === password)) {
			setMessage("This password has already been saved.");
			return;
		}

		setPasswords([...passwords, { password, date }]);
		setMessage("Password added successfully.");
	};

	const handleCheckPasswords = () => {
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		const index = passwords.findIndex(({ password: pwd, date: d }) => {
			const [day, month, year] = d.split(".");
			const expiryDate = new Date(year, month - 1, day);
			expiryDate.setHours(23, 59, 59, 999);
			return pwd === password && d === date && expiryDate >= currentDate;
		});

		if (index !== -1) {
			setMessage(`Password matches with record number: ${index + 1}`);
		} else {
			setMessage("Invalid password or date.");
		}
	};

	return (
		<div className='container'>
			<h1>Data Validation – Filip Świątek - 3F</h1>
			<table>
				<thead>
					<tr>
						<th>No.</th>
						<th>Password</th>
						<th>Expiration Date</th>
					</tr>
				</thead>
				<tbody>
					{passwords.map((p, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{p.password}</td>
							<td>{p.date}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<label>
					Expiration date (format dd.mm.yyyy):{" "}
					<input
						type='text'
						value={date}
						onChange={(e) => setdate(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password (must contain at least {nameLength} characters, including at
					least {Math.ceil(calculateNameLength("Filip Świątek") / 2)} different
					letters from the full name and a digit):{" "}
				</label>
				<input
					type='text'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<button onClick={handleAddPassword}>Add new password</button>
				<button onClick={handleCheckPasswords}>
					Verify password correctness
				</button>
			</div>
			<p id='message'>{message}</p>
		</div>
	);
}

export default App;
