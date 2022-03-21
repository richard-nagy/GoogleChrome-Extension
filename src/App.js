import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
	// Get images from localstorage
	const [obj, setObj] = useState(JSON.parse(localStorage.getItem("images")));

	// Update localStorage on state change
	useEffect(() => {
		localStorage.setItem("images", JSON.stringify(obj));
	}, [obj]);

	// Add image
	function addImage(e) {
		var file = e[0];
		var reader = new FileReader();
		reader.onload = function () {
			var img_ = new Image();
			img_.src = reader.result;
			obj != null ? setObj((obj) => [...obj, reader.result]) : setObj([reader.result]);
		};
		reader.readAsDataURL(file);
	}

	// Delete image
	function deleteButton(id) {
		setObj(obj.filter((e, i) => i !== id));
	}

	// Render elemens
	function renderElements() {
		// Array that contains elements
		let array = [];

		for (let i = 0; obj != null && i < obj.length; i++) {
			// If image is wider than taller give it the borderRadius class
			let borderRadius = "";
			const img = new Image();
			img.src = obj[i];
			if (img.width >= img.height) borderRadius = "borderRadius";

			array.push(
				<div className="imageBox" key={i}>
					<input
						id={"img" + i}
						className="hidden"
						type="file"
						onChange={(e) => addImage(e.target.files)}
					/>
					<div className="imageArea">
						<img src={obj[i]} alt={obj[i]} className={borderRadius} />
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
							✖
						</div>
					</div>
				</div>
			);
		}

		// Add a plus button to the end of the images
		array.push(
			<div>
				<input
					id={"img"}
					className="hidden"
					type="file"
					onChange={(e) => addImage(e.target.files)}
				/>
				<label htmlFor={"img"} className="plusButton" />
			</div>
		);
		return array;
	}

	return <div id="body">{renderElements()}</div>;
}
