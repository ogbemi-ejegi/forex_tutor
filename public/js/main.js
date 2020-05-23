const defaultChannel = 'Adam Khoo';
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const API_KEY = 'AIzaSyCfU-Y4NpZeJxkcA4-veqKQhaLaCMg-XZI'

function googleApiClientReady(){
    gapi.client.setApiKey(API_KEY);
    gapi.client.load('youtube', 'v3', function() {
            searchA();
    });
}
function searchA() {
    var request = gapi.client.youtube.channels.list({
            part: 'snippet, contentDetails, statistics',
            forUsername : ''
    });
    request.execute(function(response) {
            //var str = JSON.stringify(response.result);
            //alert(str);
            console.log(response);
    });
}


/* function getChannel() {
     gapi.client.youtube.channels.list({
         part: 'snippet, contentDetails, statistics',
         forUsername: 'Adam Khoo'
     })
     .then(response => {
         console.log(response);
     })
     .catch(err => alert('No channel by that name'));
 }*/