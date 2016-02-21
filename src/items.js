function Item(type, description, assignee) {
	this.type = type;
	this.description = description;
	this.assignee = assignee;

	return this;
}

function getItems(){
	$.ajax({
		method: "GET",
		url: "/get-issues"
	})
	.done(function( success ) {
		if(success){
			console.log(success);
		}else{
			alert("Please try again.");
		}
	});
}

function addItem(event){
	var type = ($('#typeList')[0].value);
	var description = ($('#inputDescription')[0].value);
	var assignee = ($('#assigneeList')[0].value);
	var item = new Item(type, description, assignee);
	
	$.ajax({
		method: "POST",
		url: "/add-issue",
	    data: item
	})
	.done(function( success ) {
		if(success){
			getItems();
			$("#addModal").modal("hide");
		} else{
			alert("Please try again.");
		}
	});

	
}


			/*$('#tableList > tbody:last').append('<tr>'+
				'<td><span class="label label-default label-pill pull-xs-right">'+item.type+'</span></td>'+
				'<td>'+item.description+'</td>'+
				'<td>'+item.assignee+'</td>'+
				'</tr>');*/