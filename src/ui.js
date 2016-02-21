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

	$('#addBtn').prop('disabled', true);

	$('.add-option').click(function(event){
		$("#addModal").modal("show");
		var types = document.getElementById("typeList");
		types.value = event.currentTarget.text;
	});

	$("#addReqBtn").click(function(){
		addItem();
	});
}