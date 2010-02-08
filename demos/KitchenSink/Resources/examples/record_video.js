var win = Titanium.UI.currentWindow;



Titanium.Media.showCamera({

	success:function(event)
	{
		for (v in event)
		{
			Ti.API.info('v ' + v + ' event[v] ' + event[v]);
		}
		var video = event.media;
		var thumbnail = event.thumbnail;
	
		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
		f.write(video);

		// put in timeout - strange threading issues from doing this in callback
		setTimeout(function()
		{
			var activeMovie = Titanium.Media.createVideoPlayer({
				backgroundColor:'#111',
				movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
				scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
				contentURL:f.nativePath
			});
			activeMovie.play();
		
		},500);
	
	},
	cancel:function()
	{

	},
	error:function(error)
	{
		// create alert
		var a = Titanium.UI.createAlertDialog({title:'Video'});

		// set message
		if (error.code == Titanium.Media.NO_VIDEO)
		{
			a.setMessage('Device does not have video recording capabilities');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}

		// show alert
		a.show();
	},
	mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
	videoMaximumDuration:10000,
	videoQuality:Titanium.Media.QUALITY_HIGH
});
