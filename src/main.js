$(document).ready(function(){
	bindControls();
});

function login(){
	var user = ($('#inputUsername')[0].value);
	var pw = ($('#inputPassword')[0].value);
	$.ajax({
		method: "GET",
		url: "/login",
		data: { username: user, password: pw }
	})
	.done(function( success ) {
		if(success){
			$("#loginModal").modal("hide");
			$("#loginBtn").css("display", "none");
		}else{
			alert("Please try again.");
		}
	});
};