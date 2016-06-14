<!DOCTYPE html>
<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

<script>
    // Gets the Youtube video-ID from the URL
    function getYoutubeId() {
        var query = window.location.search.substring(1);
        var id = query.split("=");
        return id[1];
    }

    // downloads wav file to server
    function loadytID(ytID) {
        // console.log(beatMarkers);
        console.log(ytID);
        var xhttp;
        var url = "downloadytwav.php";
        var params = "ID=" + ytID;
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("POST", "downloadytwav.php", true);
        //Send the proper header information along with the request
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send(params);
    }

    function file_exists(url)
    {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    }

</script>
</head>
<body>

<script>
    ID = getYoutubeId();
    loadytID(ID);
    window.alert("Downloading. Click OK to check whether the download is finished");
    var bool1 = !file_exists('https://minor.chordify.net/projectbeat/mp3files/' + ID + '.wav');
    var bool2 = file_exists('https://minor.chordify.net/projectbeat/mp3files/' + ID + '.webm');
    var bool3 = file_exists('https://minor.chordify.net/projectbeat/mp3files/' + ID + '.webm.part');
    while( bool1 || bool2 || bool3) {
        console.log(bool1, bool2, bool3);
        console.log(2);
        window.alert("The download is not yet finished, click here to try again.");
        console.log(3);

        bool1 = !file_exists('https://minor.chordify.net/projectbeat/mp3files/' + ID + '.wav');
        bool2 = file_exists('https://minor.chordify.net/projectbeat/mp3files/' + ID + '.webm');
        bool3 = file_exists('https://minor.chordify.net/projectbeat/mp3files/' + ID + '.webm.part');
    }
    window.location.assign('timelinetest.html?yt_ID='+ID);

</script>



</body>
</html>
