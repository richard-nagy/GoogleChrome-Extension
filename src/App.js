import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [obj, setObj] = useState(JSON.parse(localStorage.getItem("myArray")));

	// Update localStorage on state change
	useEffect(() => {
		localStorage.setItem("myArray", JSON.stringify(obj));
	}, [obj]);

	// Add image
	function addImage(e) {
		var file = e[0];
		var reader = new FileReader();
		reader.onload = function () {
			var img_ = new Image();
			img_.src = reader.result;
			setObj((obj) => [...obj, reader.result]);
		};
		reader.readAsDataURL(file);
	}

	// Delete image
	function deleteButton(id) {
		setObj(obj.filter((e, i) => i !== id));
	}

	// Render elemens
	function renderElements() {
		let array = [];

		for (let i = 0; i < obj.length + 1; i++) {
			array.push(
				<div className="image" key={i}>
					<input
						id={"img" + i}
						className="hidden"
						type="file"
						onChange={(e) => addImage(e.target.files)}
					/>
					<div id={"imagearea" + i} className="imagearea">
						<img src={obj[i]} alt={obj[i]} />
					</div>
					<div className="bottom">
						<label htmlFor={"img" + i} className="button add">
							✎
						</label>
						<div
							className="button remove"
							onClick={() => {
								deleteButton(i);
							}}
						>
							🗑
						</div>
					</div>
				</div>
			);
		}
		return array;
	}

	return <div id="body">{renderElements()}</div>;
}

export default App;
