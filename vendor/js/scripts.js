$(function(){
	var socket = io();
	
	$('#myModal').on('click', '#submit_comment', function(){
		socket.emit('comment added',
			{ comment: $('#comment_content').val(), id: $('#image_id').val() });
	});

	socket.on('refresh comments', function(msg){
		$('#comment_content').val('');
		$('#showComments').append('<p>' + msg + '</p><hr>');
	});

	$('#myModal').on('hidden.bs.modal', function(){
		$(this).removeData('bs.modal');
	});

});