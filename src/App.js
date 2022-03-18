import "./App.css";
import $ from "jquery";

function renderImages() {
	for (let i = 0; i < 6; i++) {
		let img = new Image();
		img.src = localStorage["image" + i];
		$("#imagearea" + i).html(img);
		$("body").on("change", "#img" + i, function () {
			var fileInput = $(this)[0];
			var file = fileInput.files[0];
			var reader = new FileReader();
			reader.onload = function (e) {
				var img_ = new Image();
				img_.src = reader.result;
				localStorage["image" + i] = reader.result;
				$("#imagearea" + i).html(img_);
			};
			reader.readAsDataURL(file);
		});
	}
}

document.addEventListener(
	"DOMContentLoaded",
	function () {
		for (let i = 0; i < 6; i++) {
			document.querySelector("#image" + i).addEventListener("click", onclick, false);
			function onclick() {
				localStorage.removeItem("image" + i);
				$("#imagearea" + i).html(null);
				renderImages();
			}
		}
	},
	false
);

$(document).ready(function () {
	renderImages();
});

function renderElements() {
	let array = [];
	for (let i = 0; i < 6; i++) {
		array.push(
			<div className="div">
				<input id={"img" + i} className="hidden" type="file" />
				<div id={"imagearea" + i} className="imagearea"></div>
				<span>
					<label htmlFor={"img" + i} className="add">
						Add
					</label>
					<label className="remove" id={"image" + i}>
						Remove
					</label>
				</span>
			</div>
		);
	}
	return array;
}

function App() {
	return <div id="body">{renderElements()}</div>;
}

export default App;
