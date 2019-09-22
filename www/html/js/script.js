/**
 * finds similar matches from orgbook.gov.bc.ca API
 */
function checkAvailability() {    
    // clear fields
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("companyList").innerHTML = "";    
    // check if textfield is blank
    if(document.getElementById("company").value === ""){
        document.getElementById("errorMessage").style.color = "red"; // red
        document.getElementById("errorMessage").innerHTML = "Please enter your desired Corporate name.";
    } else{
        var compName = $('#company').val();
        // api call for checking the company name in BC
        $.get('https://www.orgbook.gov.bc.ca:443/api/v2/search/autocomplete?q=' + compName +'&inactive=any&latest=true&revoked=false', function(res) {
            // checking if there is a similar match
            if (res['results'].length !== 0) {
                var dupName = res['results'][0]['names'][0]['text'];
                if(compName.toUpperCase() === dupName.toUpperCase()){
                    // found the exact match
                    document.getElementById("errorMessage").style.color = "red"; // red
                    document.getElementById("errorMessage").innerHTML = "Corporate name '" + compName + "' already exists.";
                } else{
                    if(res['results'].length >= 5){
                        // found similar matches with more than 5 results
                        document.getElementById("errorMessage").style.color = "red";
                        document.getElementById("errorMessage").innerHTML = "'" + compName + "' doesn't exist, but we found 5 similar matches: " ;
                        for(var i = 0; i <= 4; i++) {
                            var node = document.createElement("LI");                 // Create a <li> node
                            var textnode = document.createTextNode(res['results'][i]['names'][0]['text']);         // Create a text node
                            node.appendChild(textnode);                              // Append the text to <li>
                            document.getElementById("companyList").appendChild(node);     // Append <li> to <ul> with id="myList"
                        }
                    } else{
                        // found similar matches with less than 5 results
                        document.getElementById("errorMessage").style.color = "red";
                        document.getElementById("errorMessage").innerHTML = "'" + compName + "' doesn't exist, but we found " + res['results'].length + " similar matches: ";
                        for(var results in res['results']){              
                            var node = document.createElement("LI");                 // Create a <li> node
                            var textnode = document.createTextNode(res['results'][results]['names'][0]['text']);         // Create a text node
                            node.appendChild(textnode);                              // Append the text to <li>
                            document.getElementById("companyList").appendChild(node);     // Append <li> to <ul> with id="myList"
                        }
                    }                                             
                }
            } else { 
                // no similar match found
                document.getElementById("errorMessage").style.color = "green"; // green
                document.getElementById("errorMessage").innerHTML = "'" + compName + "' has no match - available to use.";
            }
        }, "json")
    }
}

function disableCheck() {
    // clear fields
    document.getElementById("company").value = "";
    document.getElementById("errorMessage").innerHTML = "";
    document.getElementById("companyList").innerHTML = "";   
    // JQuery:
    // $('#checkAvailability').prop("disabled", true);
    document.getElementById("checkAvailability").disabled = true;    
    
    
}

function enableCheck() {
    // JQuery:
    // $('#checkAvailability').prop("disabled", false);
    document.getElementById("checkAvailability").disabled = false;    
}