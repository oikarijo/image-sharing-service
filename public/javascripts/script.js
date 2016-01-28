// $('.thumb').click(function(){
// 	console.log('hello');
// 	var src = $(this).attr('src');
// 	console.log(src);
// 	$("<img class='view'src="+src+"></img>").appendTo('.modal-header');
// 	$('.modal-title').text(src);
// });

$('#myModal').on('hidden.bs.modal', function(){
	// $('.view').remove();
	//location.reload();
	$(this).removeData('bs.modal');
})