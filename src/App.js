import "./App.css";
import $ from "jquery";

function renderImages() {
	for (let i = 0; i < 5; i++) {
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
		for (let i = 0; i < 5; i++) {
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

function App() {
	return (
		<div id="body">
			<div class="div">
				<input id="img0" class="hidden" type="file" />
				<div id="imagearea0" class="imagearea"></div>
				<span>
					<label for="img0" class="add">
						Add
					</label>
					<button class="remove" id="image0">
						Remove
					</button>
				</span>
			</div>
			<div class="div">
				<input id="img1" class="hidden" type="file" />
				<div id="imagearea1" class="imagearea"></div>
				<span>
					<label for="img1" class="add">
						Add
					</label>
					<button class="remove" id="image1">
						Remove
					</button>
				</span>
			</div>
			<div class="div">
				<input id="img2" class="hidden" type="file" />
				<div id="imagearea2" class="imagearea"></div>
				<span>
					<label for="img2" class="add">
						Add
					</label>
					<button class="remove" id="image2">
						Remove
					</button>
				</span>
			</div>
			<div class="div">
				<input id="img3" class="hidden" type="file" />
				<div id="imagearea3" class="imagearea"></div>
				<span>
					<label for="img3" class="add">
						Add
					</label>
					<button class="remove" id="image3">
						Remove
					</button>
				</span>
			</div>
			<div class="div">
				<input id="img4" class="hidden" type="file" />
				<div id="imagearea4" class="imagearea"></div>
				<span>
					<label for="img4" class="add">
						Add
					</label>
					<button class="remove" id="image4">
						Remove
					</button>
				</span>
			</div>
			<div class="div">
				<input id="img5" class="hidden" type="file" />
				<div id="imagearea5" class="imagearea"></div>
				<span>
					<label for="img5" class="add">
						Add
					</label>
					<button class="remove" id="image5">
						Remove
					</button>
				</span>
			</div>
			<div>
				<script src="query.min.js"></script>
				<script src="popup.js" charset="utf-8"></script>
			</div>
		</div>
	);
}

export default App;
