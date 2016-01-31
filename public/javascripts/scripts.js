$(document).ready(function(){
	var socket = io.connect('localhost:3000');

	$('#myModal').on('click', '#submit_comment', function(){
		socket.emit('comment added',
		{ comment: $('#comment_content').val(), id: $('#image_id').val() });
	});

	socket.on('refresh comments', function(msg){
		$('#showComments').append('<p>' + msg + '</p><hr>');
	});

	$('#myModal').on('hidden.bs.modal', function(){
	$(this).removeData('bs.modal');
});

});