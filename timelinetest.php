<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <script src="./waves-ui-master/waves-ui.umd.js"></script>
    <script src="./waves-audio-master/examples/assets/prism.js"></script>
    <script src="./waves-audio-master/examples/assets/waves-loaders.min.js"></script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="./icon.jpg">
    <title>Waveform generation page</title>
    <!-- Bootstrap core CSS -->
    <link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="bootstrap/docs/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="cover.css" rel="stylesheet">
    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="bootstrap/docs/assets/js/ie-emulation-modes-warning.js"></script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
    #infotext1,
    #infobutton1 {
        float: bottom-right;
    }

    #infobutton2 {
        float: bottom-right;
    }
    #player {
        position: fixed;
        left: 0;
        bottom: 0;
    }
    </style>
</head>

<body>
    <script>
    window.jQuery || document.write('<script src="bootstrap/docs/assets/js/vendor/jquery.min.js"><\/script>')
    </script>
    <div class="site-wrapper" id="pageAnchor">
        <div class="site-wrapper-inner">
            <div class="cover-container">
                <div class="masthead clearfix">
                    <div class="inner">
                        <h3 class="masthead-brand"></h3>
                        <nav class="fixed-header">
                            <ul class="nav masthead-nav">
                                <li><a href="index.html">Song selection</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="inner cover">
                    <h1 class="cover-heading"></h1>
                    <br>
                    <div id="player"></div>
                    <div class="track" id="track-1"></div>
                    <div class="lead" id="loading"><img src="loading.gif" alt="loadingGif" height="50" width="50"></div>
                    <div class="waveform-box" id="waveform"></div>
                    <div style="text-align: center">
                        <button class="btn btn-primary" id="playButton" onclick="playOrPause()">
                            <i class="glyphicon glyphicon-play"></i> Play
                        </button>
                        <button class="btn btn-primary" id="clickToggle" onclick="toggleClick()">Click ON</button>
                        <!-- This is the removed zoom functionality:
                        <p class="row">
                            <div class="col-xs-1">
                                <i class="glyphicon glyphicon-zoom-in"></i>
                            </div>
                            <div class="col-xs-10">
                                <input id="slider" type="range" min="1" max="200" value="1" style="width: 100%" />
                            </div>
                            <div class="col-xs-1">
                                <i class="glyphicon glyphicon-zoom-out"></i>
                            </div>
                        </p> -->
                    </div>
                    <p class="lead">Press the 'b' key on the beat to add a beat annotation.
                        <a href="#" id="infotext1" data-toggle="tooltip" data-placement="right" title="Drag a beat marker to move it, or double click to delete it.">
                            <i class="material-icons">help_outline</i>
                        </a>
                    </p>
                    <p class="lead">
                        <a href="#" class="btn btn-lg btn-default" id="reset" onclick="clearMarkers()" data-toggle="tooltip" data-placement="right" title="You can also select a single marker and press delete to remove it!">Clear Markers</a>
                        <a href="#" class="btn btn-lg btn-default" id="toPHP" onclick="writeToFile()">Get Marker Timings</a>
                        <a href="#" id="infotext2" data-toggle="tooltip" data-placement="right" title="The Tracking info is a list which contains the beat annotations you made.">
                            <i class="material-icons">help_outline</i>
                        </a>
                    </p>
                    <p id="showTimeStamps"></p>
                    <textarea rows="4" cols="50" id="markerInfo" style="color:black" hidden>nothing here</textarea>
                </div>
                <div>
                    <div class="inner">
                        <p>Waveform generation by <a href="http://wavesjs.github.io/">WavesJS-UI</a>, Project Members <a href="#">@rockforr</a>, <a href="#">@blane</a>, <a href="#">@nindia</a>, <a href="#">@clarayeah__</a>, <a href="#">@adrivri</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script class="example" rel="track-1">
    var wavesJSReady = false;


    var markerCounter = 5;
    var loader = new wavesLoaders.AudioBufferLoader();
    var ytWav = './mp3files/' + getYoutubeId() +'.wav';
    loader.load(ytWav).then(function(buffer) {
        wavesJSReady = true;
        initialize(buffer);
    });


    var x = document.createElement("AUDIO");
    if (x.canPlayType("audio/mpeg")) {
        x.setAttribute("src", 'mp3files/'+ getYoutubeId() + ".wav");
        x.setAttribute("hidden", "hidden");
    }
    x.setAttribute("controls", "controls");
    document.body.appendChild(x);

    var data;
    var $track;
    var markerLayer;
    var beatMarkers;
    var segmentLayer;
    var cursorLayer;
    var waveformLayer;
    var playSong;
    var timeline;
    var track;
    var timeContext;
    var startTime;
    var currentTime;
    var finalDur;
    var windowWidth = 20;
    var markerQueue = [];

    function initialize(buffer) {
        $track = document.querySelector('#track-1');
        var width = $track.getBoundingClientRect().width;
        var timeAxisHeight = 18; // height of text above waveform
        var layerHeight = 200; // height of waveform

        var duration = buffer.duration;
        var pixelsPerSecond = width / duration;

        data = [{
            x: 0,
            width: duration,
            height: layerHeight,
            top: timeAxisHeight,
            color: 'steelblue',
            opacity: 0.5,
            text: '4/4'
        }, ];

        segmentLayer = new wavesUI.helpers.SegmentLayer(data, {
            height: layerHeight,
            displayHandlers: true,
        });

        beatMarkers = [];

        timeline = new wavesUI.core.Timeline(pixelsPerSecond, width);

        track = timeline.createTrack($track, layerHeight + timeAxisHeight, 'main');

        // marker layer
        markerLayer = new wavesUI.core.Layer('collection', beatMarkers, {
            height: layerHeight
        });

        // time axis
        var timeAxis = new wavesUI.axis.AxisLayer(wavesUI.axis.timeAxisGenerator(), {
            height: timeAxisHeight
        });

        timeContext = new wavesUI.core.LayerTimeContext(timeline.timeContext);

        markerLayer.setTimeContext(timeContext);
        markerLayer.configureShape(wavesUI.shapes.AnnotatedMarker, {
            x: function(d, v) {
                if (v !== undefined) {
                    d.time = v;
                }
                return d.time;
            },
            color: function() {
                return 'red';
            }
        });

        markerLayer.setBehavior(new wavesUI.behaviors.MarkerBehavior());

        // Axis layers use `timeline.TimeContext` directly,
        // they don't have their own timeContext
        timeAxis.setTimeContext(timeline.timeContext);
        timeAxis.configureShape(wavesUI.shapes.Ticks, {}, {
            color: 'CadetBlue'
        });

        // bpm axis
        var grid = new wavesUI.axis.AxisLayer(wavesUI.axis.gridAxisGenerator(10, '4/4'), {
            height: layerHeight,
            top: timeAxisHeight
        });

        grid.setTimeContext(timeline.timeContext);
        grid.configureShape(wavesUI.shapes.Ticks, {}, {
            color: 'green'
        });

        // wavesform layer
        waveformLayer = new wavesUI.helpers.WaveformLayer(buffer, {
            height: layerHeight,
            top: timeAxisHeight,
            color: 'CadetBlue'
        });

        waveformLayer.setTimeContext(new wavesUI.core.LayerTimeContext(timeline.timeContext));

        cursorLayer = new wavesUI.helpers.CursorLayer({
            height: layerHeight
        });

        timeline.state = new wavesUI.states.SimpleEditionState(timeline);


        track.add(timeAxis);
        // track.add(grid);
        track.add(waveformLayer);
        timeline.addLayer(segmentLayer, 'main');
        track.add(markerLayer);

        timeline.addLayer(cursorLayer, 'main');

        track.render();
        track.update();

        timeline.tracks.render();
        timeline.tracks.update();

        finalDur = timeline.timeContext.visibleDuration;

        timeline.timeContext.zoom = finalDur / windowWidth;

        timeline.tracks.render();
        timeline.tracks.update();

        document.getElementById('loading').innerHTML = '';

        // listen for time passing...
        (function loop() {
            if (playSong) {
                var d = new Date();
                currentTime = (d.getTime() / 1000) - startTime;
                updatePlugin();
                setTimeout(requestAnimationFrame(loop), 20);
            } else {
                cleanQueue()
                setTimeout(function() {
                    requestAnimationFrame(loop);
                    timeline.tracks.update();
                }, 200);
            }
        }());

        timeline.on('event', function(e) {
            var segment;
            var eventType = e.type;

            if (eventType !== 'mouseover' && eventType !== 'mouseout') {
                return;
            }

            segment = segmentLayer.getItemFromDOMElement(e.target);

            if (segment !== null) {
                var datum = segmentLayer.getDatumFromItem(segment);
                datum.opacity = eventType === 'mouseover' ? 1 : 0.8;
                segmentLayer.updateShapes();
            }
        });
    }

    function updatePlugin() {
        cursorLayer.currentPosition = currentTime;
        cursorLayer.update();
        timeline.timeContext.offset = -cursorLayer.currentPosition + (finalDur / windowWidth) / 2;
        timeline.tracks.update();
        if(currentTime > markerQueue[0]) {
            console.log("removed beat from Queue");
            clickSound.play();
            markerQueue.shift();
        // for (var i = 0; i < beatMarkers.length - 1; i++) {
        //     // console.log(currentTime.toFixed(3));
        //     distance = currentTime - beatMarkers[i].time;
        //     if (abs(beatMarkers[i].time) < ) {
        //       shortestDistance = beatMarkers[i].time;
        //     }
        //
        //     if (beatMarkers[i].time > currentTime - 0.04 && beatMarkers[i].time < currentTime + 0.04) {
        //         clickSound.play();
        //     }
        // }
    }
    }

    function writeToPage() {
        document.getElementById('markerInfo').hidden = ""
        var objString = "[ ";
        for (i = 0; i < beatMarkers.length; i++) {
            var temp = beatMarkers[i];
            SingleObjString = "{ " + temp.time.toString() + ", " + temp.text.toString() + " },";
            objString = objString + SingleObjString;
        }
        objString = objString.replace(/,$/, "") + " ]";

        document.getElementById('markerInfo').value = objString;
    }

    function writeToFile() {
        var toSend = [];
        for (i = 0; i < beatMarkers.length; i++) {
            toSend.push(beatMarkers[i].time);
        }
        console.log(toSend);
        var xhttp;
        var url = "writefile.php";
        var params = "beat=" + toSend.toString();
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("POST", "writefile.php", true);
        //Send the proper header information along with the request
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send(params);
    window.alert("Beats written to server!");
    }


    function clearMarkers() {
        beatMarkers.length = 0;
        markerLayer.render();
        markerLayer.update();
        markerCounter = 1;
    }

    window.addEventListener("keydown", checkKeyPressed, false);
    window.addEventListener("mousedown", checkMouse, false);
    // window.addEventListener("keydown", pauseCursor, false);
    var clickSound = new Audio('click.mp3');

    var metronome = true;

    function toggleClick() {
        if (metronome) {
            metronome = false;
            document.getElementById('clickToggle').innerHTML = 'Click OFF'
        } else {
            metronome = true;
            document.getElementById('clickToggle').innerHTML = 'Click ON'
        }
    }

    // Gets the Youtube video-ID from the URL
    function getYoutubeId() {
        var query = window.location.search.substring(1);
        var id = query.split("=");
        return id[1];
    }

    // Implementation of the Youtube API, retrieved and modified from: https://developers.google.com/youtube/iframe_api_reference
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // This function creates an <iframe> (and YouTube player)
    // after the API code downloads.
    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '300',
            width: '496.5',
            videoId: getYoutubeId(),
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    // When the yt player's state changes, s   ynchronizes the wavesurfer player
    var done = false;

    // Pauses the YT video when it's playing and starts playback when it's paused.
    function playOrPause() {
        if (player.getPlayerState() == 1) {
            player.pauseVideo();
            document.getElementById('playButton').innerHTML = '<i class="glyphicon glyphicon-play"></i> Play'
        } else {
            cleanQueue();
            player.playVideo();
            document.getElementById('playButton').innerHTML = '<i class="glyphicon glyphicon-pause"></i> Pause';
        }
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            var d = new Date();
            startTime = d.getTime() / 1000;
            currentTime = player.getCurrentTime();
            cleanQueue();
            playSong = true;
            done = true;
        } else if (event.data != YT.PlayerState.PLAYING) {
            currentTime = player.getCurrentTime();
            cleanQueue();
            updatePlugin();
            playSong = false;
        } else if (event.data == YT.PlayerState.PLAYING) {
            var d = new Date();
            currentTime = player.getCurrentTime();
            startTime = (d.getTime() / 1000) - currentTime;
            cleanQueue();
            playSong = true;
        }
    }

    function checkKeyPressed(e) {
        var evtobj = window.event ? event : e
        if (e.keyCode == "32") {
            e.preventDefault();
            playOrPause();
            player.seekTo(currentTime, true);
            return false;
        } else if (e.keyCode == "66") {
            if (metronome) {
                clickSound.play();
            }
            recordTimeStamp();
            markerQueue.sort();
        } else if (e.keyCode == "46") {
            var selectedMarker = document.getElementsByClassName('item annotated-marker selected');
            console.log(selectedMarker[0].childNodes[2].innerHTML);
            var i;
            for (i = 0; i < beatMarkers.length; i++) {
                if (beatMarkers[i].text == selectedMarker[0].childNodes[2].innerHTML) {
                    // put the element to be deleted at the end, and pop it off
                    var temp = beatMarkers[i];
                    beatMarkers[i] = beatMarkers[beatMarkers.length - 1];
                    beatMarkers[beatMarkers.length - 1] = temp;
                    beatMarkers.pop();
                    break;
                }
            }
            markerLayer.render();
            markerLayer.update();
        }
    }

    function cleanQueue() {
        markerQueue = [];
        for (var i = 0; i < beatMarkers.length; i++) {
            if(beatMarkers[i].time > currentTime){
                markerQueue.push(beatMarkers[i].time);
            }
        }
    }

    function checkMouse(e) {
        var time = timeline.timeToPixel.invert(e.x) - timeline.offset;
        console.log(time);
        deltaCurrentTime = time - currentTime;
        startTime = startTime - deltaCurrentTime;
        var d = new Date();
        currentTime = (d.getTime() / 1000) - startTime;
        cleanQueue();
        updatePlugin();
    }

    function recordTimeStamp() {
        var newmarker = {
            time: currentTime,
            text: markerCounter.toString()
        }
        markerCounter++;
        beatMarkers.push(newmarker);
        markerLayer.render();
        markerLayer.update();
    }
    </script>
    <!-- <?php

        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        $ID = $_GET['yt_ID'];
        $yturl = 'https://www.youtube.com/watch?v=' . $ID;
        $cmd = 'youtube-dl --extract-audio --audio-format wav --output "./mp3files/%(id)s.%(ext)s" ' . $yturl;
        exec($cmd) or die("cannot download video using youtube-dl");
        while(!file_exists('./mp3files/' . $ID . '.wav') or file_exists('./mp3files/' . $ID . '.webm') or file_exists('./mp3files/' . $ID . '.webm.part')) {
            sleep(1);
        }
        print ("<script> " . start(); . "</script>");
    ?> -->


</body>

</html>
