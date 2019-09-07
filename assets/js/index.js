clearOrder = function(clear){
	var clear = JSON.parse(clear);

	$.ajax({
	type: 'POST',
	url: '/clear',
	data: clear,
	success: function(data){
		
	}
});
		location.reload();
}

recallOrder = function(recall){
	var rec = JSON.parse(recall);
	$.ajax({
		type: 'POST',
		url: '/recall',
		data: rec,
		success: function(data){
			
		}
	})

	//location.reload();
}