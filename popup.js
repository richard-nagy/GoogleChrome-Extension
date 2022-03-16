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
