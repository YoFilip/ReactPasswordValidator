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
			setMessage("Zły format daty. Wymagany format to DD.MM.YYYY.");
			return;
		}

		if (password.length < nameLength) {
			setMessage(`Hasło musi zawierać co najmniej ${nameLength} znaków.`);
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
				"Hasło musi zawierać przynajmniej jedną cyfrę i połowę różnych liter z imienia i nazwiska."
			);
			return;
		}

		if (passwords.find((p) => p.password === password)) {
			setMessage("Hasło już było zapisane");
			return;
		}

		setPasswords([...passwords, { password, date }]);
		setMessage("Hasło dodane");
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
			setMessage(`Hasło zgodne z hasłem numer: ${index + 1}`);
		} else {
			setMessage("Nieprawidłowe hasło lub data");
		}
	};

	return (
		<div className='container'>
			<h1>Walidacja danych – Filip Świątek - 3F</h1>
			<table>
				<thead>
					<tr>
						<th>lp.</th>
						<th>Hasło</th>
						<th>Data ważności</th>
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
			<h1>FilipŚwiątek3F</h1>
			<div>
				<label>
					Data ważności (format dd.mm.yyyy):{" "}
					<input
						type='text'
						value={date}
						onChange={(e) => setdate(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Hasło (musi zawierać co najmniej {nameLength} znaków, w tym
					przynajmniej {Math.ceil(calculateNameLength("FilipŚwiątek") / 2)}{" "}
					różnych liter z imienia i nazwiska oraz cyfrę):{" "}
				</label>
				<input
					type='text'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<button onClick={handleAddPassword}>Dodaj nowe hasło</button>
				<button onClick={handleCheckPasswords}>
					Sprawdź poprawność zapisania hasła
				</button>
			</div>
			<p id='message'>{message}</p>
		</div>
	);
}

export default App;
