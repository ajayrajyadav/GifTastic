$(document).ready(function () {

    var gifData = {
        superHeroNames: ["Superman", "Wonderwoman", "Batman", "Ironman", "Black Widow", "Captain America", "Hulk", "Spider Man", "Antman", "Wasp", "Captain Marvel", "Black Panther", "Deadpool", "Gamora", "Thanos", "Drax", "Groot", "Thor", "Doctor Strange", "Vision", "Scrlet Witch", "Winter Soldier", "Loki", "Hela", "Pepper Potts", "Star Lord"],
        giphyUrl: "",
        apiKey: "94M9cLs6k7xsmOK2hQTdr8sgBtA7cWkQ",
        currentGif: "", 
        pausedGif: "", 
        animatedGif: "", 
        stillGif: ""
    }


    buildHtml();
    populateButtons();

    function buildHtml(){
        // var newDiv = $("<div>");
        // newDiv.html("Movie Title: ");
        $(".container").append($("<div>").addClass("row"));
        $(".row").append($("<div>").attr("id", "superHeroButtons"));

        $(".container").append($("<div>").addClass("row"));
        $(".row").append($("<div>").addClass("col-lg-9"));
        $(".col-lg-9").append($("<div>").addClass("display"));

        $(".row").append($("<div>").addClass("col-lg-3"));
        $(".col-lg-3").append($("<form>").attr("id", "text-form"))
        $("#text-form").append($("<label>").attr({for: "newTextInput", id: "serachLabel"}));
        $("#serachLabel").html("Add your search here");
        $("#text-form").append($("<br>"));
        $("#text-form").append($("<input>").attr({id: "addSearchInput", type: "submit", value:"Submit"}));

    }

    function populateButtons(){
        $("#superHeroButtons").empty();
        for (let i = 0; i < gifData.superHeroNames.length; i++) {
            $("#superHeroButtons").append($("<button>").text(gifData.superHeroNames[i]).addClass("theBtn button-primary").attr("data-name", gifData.superHeroNames[i]));
        }
    }

    $(".theBtn").on("click", function(){
        $(".display").empty();
        createUrl($(this).data("name"));

        makeAPICall();
    })

    function createUrl(queryString){
        gifData.giphyUrl = "http://api.giphy.com/v1/gifs/search?q=super+hero+" + queryString + "&limit=10&api_key=" + gifData.apiKey;
    }

    function makeAPICall(){
        // createUrl(queryString);
        $.ajax({
            url: gifData.giphyUrl, 
            method: "GET"
        }).then(function (response){
            displayGiphys(response);
        });
    }

    function displayGiphys(response){
        console.log(response);
    }





});