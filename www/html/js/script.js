/**
 * finds similar matches from orgbook.gov.bc.ca API
 */
function getSimilarMatch() {
    var compName = $('#company').val();
    $.get('https://www.orgbook.gov.bc.ca:443/api/v2/search/autocomplete?q=' + compName +'&inactive=any&latest=true&revoked=false', function(res) {
        // checking if there is a similar match
        if (res['results'].length !== 0) {
            var dupName = res['results'][0]['names'][0]['text'];
            if(compName.toUpperCase() === dupName.toUpperCase()){
                document.getElementById("errorMessage").style.color = "red"; // red
                document.getElementById("errorMessage").innerHTML = compName + " already exists";
            } else{
                if(res['results'].length >= 5){
                    // found similar matches
                    document.getElementById("errorMessage").style.color = "red";
                    document.getElementById("errorMessage").innerHTML = "We found 5 similar matches: " ;
                    for(var i = 0; i <= 4; i++) {
                        var node = document.createElement("LI");                 // Create a <li> node
                        var textnode = document.createTextNode(res['results'][i]['names'][0]['text']);         // Create a text node
                        node.appendChild(textnode);                              // Append the text to <li>
                        document.getElementById("companyList").appendChild(node);     // Append <li> to <ul> with id="myList"
                    }
                } else{
                    document.getElementById("errorMessage").innerHTML = "We found " + res['results'].length + " matches:";
                    for(var results in res['results']){                                
                        var node = document.createElement("LI");                 // Create a <li> node
                        var textnode = document.createTextNode(res['results'][i]['names'][0]['text']);         // Create a text node
                        node.appendChild(textnode);                              // Append the text to <li>
                        document.getElementById("companyList").appendChild(node);     // Append <li> to <ul> with id="myList"
                    }
                }                                             
            }
        } else { 
            // no similar match found
            document.getElementById("errorMessage").style.color = "green"; // green
            document.getElementById("errorMessage").innerHTML = "'" + compName + "'" + " has no similar match - available to use";
        }
    }, "json")
}

$(document).keypress(function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        getSimilarMatch();
        // clear elements
        document.getElementById("companyList").innerHTML = "";
        document.getElementById("errorMessage").innerHTML = "";
    }            
});