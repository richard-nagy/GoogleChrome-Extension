import "./App.css";
import { useEffect, useState } from "react";
import { copyImageToClipboard } from "copy-image-clipboard";

export default function App() {
	// Get images from localstorage
	const [array, setArray] = useState(JSON.parse(localStorage.getItem("images")));

	// Update localStorage on state change
	useEffect(() => {
		localStorage.setItem("images", JSON.stringify(array));
	}, [array]);

	// Add image
	function addImage(e) {
		var file = e[0];
		var reader = new FileReader();
		reader.onload = function () {
			var img_ = new Image();
			img_.src = reader.result;
			array != null ? setArray((obj) => [...obj, reader.result]) : setArray([reader.result]);
		};
		reader.readAsDataURL(file);
	}

	// Delete image
	function deleteImage(id) {
		setArray(array.filter((e, i) => i !== id));
	}

	// Change image
	function changeImage(e, i) {
		var file = e[0];
		var reader = new FileReader();
		reader.onload = function () {
			var img_ = new Image();
			img_.src = reader.result;
			setArray((obj) => [...array.filter((_, j) => j !== i), (obj[i] = reader.result)]);
		};
		reader.readAsDataURL(file);
	}

	// Copy image on clicks
	function copy(file) {
		copyImageToClipboard(file).catch((e) => {
			console.log("Error: ", e.message);
		});
	}

	// Render elemens
	function renderElements() {
		// Array that contains elements
		let elements = [];

		for (let i = 0; array != null && i < array.length; i++) {
			// If image is wider than taller give it the borderRadius class
			let borderRadius = "";
			const img = new Image();
			img.src = array[i];
			if (img.width >= img.height) borderRadius = "borderRadius";

			elements.push(
				<div className="imageBox" key={i}>
					<input
						id={"img" + i}
						className="hidden"
						type="file"
						onChange={(e) => changeImage(e.target.files, i)}
					/>
					<div className="imageArea">
						<img
							id={i}
							src={array[i]}
							alt={array[i]}
							className={borderRadius}
							onClick={() => copy(array[i])}
						/>
					</div>
					<div className="bottom">
						<label htmlFor={"img" + i} className="button add">
							✎
						</label>
						<div
							className="button remove"
							onClick={() => {
								deleteImage(i);
							}}
						>
							✖
						</div>
					</div>
				</div>
			);
		}

		// Add a plus button to the end of the images
		elements.push(
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
		return elements;
	}

	return <div id="body">{renderElements()}</div>;
}
