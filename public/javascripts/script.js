$('.thumb').click(function(){
	console.log('hello');
	var src = $(this).attr('src');
	$("<img class='view'src="+src+"></img>").appendTo('.modal-header');
	$('.modal-title').text(src);
});

$('#myModal').on('hidden.bs.modal', function(){
	$('.view').remove();
	location.reload();
})