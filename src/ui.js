function bindControls(){
	$("#loginBtn").click(function(){
		$("#loginModal").modal("show");
	});

	$("#loginReqBtn").click(function(){
		login();
	});

	$("#loginModal :input").keyup (function(event){
		if (event.keyCode == 13){
			login();
		}
	});
}