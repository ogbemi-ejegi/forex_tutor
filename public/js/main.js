const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const API_KEY = 'AIzaSyCfU-Y4NpZeJxkcA4-veqKQhaLaCMg-XZI';
const forex_videos = document.getElementById('forex-videos');

function googleApiClientReady(){
    gapi.client.setApiKey('AIzaSyCfU-Y4NpZeJxkcA4-veqKQhaLaCMg-XZI');
    gapi.client.load('youtube', 'v3', function() {
            searchA();
    });
}
function searchA() {
    //var q = 'Node.js';
    var request = gapi.client.youtube.channels.list({
            part: 'snippet, contentDetails, statistics',
            forUsername : 'techguyweb'
    });
    request.execute(function(response) {
            console.log(response);
            const channel = response.result.items[0];
            //displays channel found
            const output = `
            <div class="col-md-12 col-sm-12"><br><h4 class="text-center">Our Instructor</h4><br></div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Name: ${channel.snippet.title}</li>
                    <li class="list-group-item">Subscribers: ${numberWithCommas(
                        channel.statistics.subscriberCount
                    )}</li>
                    <li class="list-group-item">Views: ${numberWithCommas(
                        channel.statistics.viewCount
                    )}</li>
                    <li class="list-group-item">Videos: ${numberWithCommas(
                        channel.statistics.videoCount
                    )}</li>
                </ul>
                  <p>${channel.snippet.description}</p>
                  <hr>
                  <a class="btn btn-dark" target="_blank" href="/user/login">View courses</a>
                </ul>
            `;
            showChannel(output);

            //get playlist
            const playlistId = channel.contentDetails.relatedPlaylists.uploads;
            requestVideoPlaylist(playlistId);
    });

    // Add commas to number
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function requestVideoPlaylist(playlistId) {
        const requestOptions = {
            playlistId: playlistId,
            part: 'snippet',
            maxResults: 10
        };

        const req_playlist = gapi.client.youtube.playlistItems.list(requestOptions);

        req_playlist.execute(response => {
            console.log(response);
            const playlist_items = response.result.items;
            if(playlist_items) {
                console.log(playlist_items);
                let output = '<div class="col-md-12 col-sm-12"><br><h4 class="text-center">Latest Tutorials</h4><br></div>';

                // Loop through videos and append output
                playlist_items.map(item => {
                    const videoId = item.snippet.resourceId.videoId;
                    output +=`
                        <div class="col-md-3"> 
                            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                    `;
                });
                forex_videos.innerHTML = output; 
            }
            else {
                forex_videos.innerHTML = 'No videos found';
            }
        });
    }
    //function to show channel
    function showChannel(output){
        const channelData = document.getElementById('forex-channel');
        channelData.innerHTML = output;
    }

    //
}
