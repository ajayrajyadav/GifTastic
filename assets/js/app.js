$(document).ready(function () {

    var gifData = {
        superHeroNames: [
            { queryName: "Superman", timesSearched: 0 }, 
            { queryName: "Wonderwoman", timesSearched: 0 }, 
            { queryName: "Batman", timesSearched: 0 }, 
            { queryName: "Iron man", timesSearched: 0 }, 
            { queryName: "Black Widow", timesSearched: 0 }, 
            { queryName: "Captain America", timesSearched: 0 }, 
            { queryName: "Hulk", timesSearched: 0 }, 
            { queryName: "Spider Man", timesSearched: 0 }, 
            { queryName: "Antman", timesSearched: 0 }, 
            { queryName: "Wasp", timesSearched: 0 }, 
            { queryName: "Captain Marvel", timesSearched: 0 }, 
            { queryName: "Black Panther", timesSearched: 0 }, 
            { queryName: "Deadpool", timesSearched: 0 }, 
            { queryName: "Gamora", timesSearched: 0 }, 
            { queryName: "Thanos", timesSearched: 0 }, 
            { queryName: "Drax", timesSearched: 0 }, 
            { queryName: "Groot", timesSearched: 0 }, 
            { queryName: "Thor", timesSearched: 0 }, 
            { queryName: "Doctor Strange", timesSearched: 0 }, 
            { queryName: "Vision", timesSearched: 0 }, 
            { queryName: "Scrlet Witch", timesSearched: 0 }, 
            { queryName: "Winter Soldier", timesSearched: 0 }, 
            { queryName: "Loki", timesSearched: 0 }, 
            { queryName: "Hela", timesSearched: 0 }, 
            { queryName: "Pepper Potts", timesSearched: 0 }, 
            { queryName: "Star Lord", timesSearched: 0 }
        ],
        giphyUrl: "",
        apiKey: "94M9cLs6k7xsmOK2hQTdr8sgBtA7cWkQ",
        currentGif: "",
        pausedGif: "",
        animatedGif: "",
        stillGif: ""
    }

    main();

    function main() {
        buildHtml();
        populateButtons();
    }

    function buildHtml() {
        // var newDiv = $("<div>");
        // newDiv.html("Movie Title: ");
        $(".container").append($("<div>").addClass("row").attr("id", "forButtons"));
        $("#forButtons").append($("<div>").attr("id", "superHeroButtons"));

        $(".container").append($("<div>").addClass("row").attr("id", "forImgDisplay"));
        $("#forImgDisplay").append($("<div>").addClass("col-lg-9"));
        $(".col-lg-9").append($("<div>").addClass("display"));

        $("#forImgDisplay").append($("<div>").addClass("col-lg-3").attr("id", "forInput"));
        $("#forInput").append($("<form>").attr("id", "text-form"))
        $("#text-form").append($("<label>").attr({ for: "newTextInput", id: "serachLabel" }));
        $("#serachLabel").html("Add your search here");
        $("#text-form").append($("<input>").attr({ type: "text", id: "newSearchTerm" }))
        $("#text-form").append($("<br>"));
        $("#text-form").append($("<input>").attr({ id: "addSearchInput", type: "submit", value: "Submit" }));

    }

    function populateButtons() {
        $("#superHeroButtons").empty();
        for (let i = 0; i < gifData.superHeroNames.length; i++) {
            $("#superHeroButtons").append($("<button>").text(gifData.superHeroNames[i].queryName).addClass("theBtn button-primary").attr("data-name", gifData.superHeroNames[i].queryName).attr("data-number", gifData.superHeroNames[i].timesSearched));
        }
    }
    $(document).on("click", ".theBtn", function () {
        // $(".display").empty();
        let i = $(this).data("number");
        // console.log(i);
        createUrl($(this).data("name"), $(this).data("number"));
        searchAndUpdateQueryTimes($(this).data("name"));

        makeAPICall();
    });

    function searchAndUpdateQueryTimes(clickedQuery){
        for (let i = 0; i < gifData.superHeroNames.length; i++) {
            if(gifData.superHeroNames[i].queryName === clickedQuery){
                gifData.superHeroNames[i].timesSearched++;
                populateButtons();
            }
        }
    }

    function createUrl(queryString, timesSearched) {
        offsetValue = timesSearched*10;
        // gifData.giphyUrl = "http://api.giphy.com/v1/gifs/search?q=super+hero+" + queryString + "&limit=10&api_key=" + gifData.apiKey;
        gifData.giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + queryString + "&limit=10&offset="+ offsetValue +"&api_key=" + gifData.apiKey;
        console.log(gifData.giphyUrl);
    }

    function makeAPICall() {
        // createUrl(queryString);
        $.ajax({
            url: gifData.giphyUrl,
            method: "GET"
        }).then(function (response) {
            displayGiphys(response);
        });
    }

    function displayGiphys(response) {
        console.log(response);
        $.each(response.data, function (index, value) {
            // console.log(value.images.original_still.url);
            gifData.animatedGif = value.images.original.url;

            gifData.pausedGif = value.images.original_still.url;
            var thisRating = value.rating;
            if (thisRating === "") {
                thisRating = "Unrated";
            }

            var rating = $("<h5>").html("rated: " + thisRating).addClass("ratingStyle");
            gifData.stillGif = $("<img>").attr("data-animated", gifData.animatedGif).attr("data-paused", gifData.pausedGif).attr("src", gifData.pausedGif).addClass("hoverEffect");
            var fullGifDisplay = $("<button>").append(rating, gifData.stillGif);
            $(".display").prepend(fullGifDisplay);

        });

    }

    $(document).on("mouseover", ".hoverEffect", function () {
        $(this).attr("src", $(this).data("animated"));
    })

    $(document).on("mouseleave", ".hoverEffect", function () {
        $(this).attr("src", $(this).data("paused"));
    })

    $('#addSearchInput').on('click', function () {
        var newQuery = $('#newSearchTerm').val().trim();
        gifData.superHeroNames.push({queryName: newQuery, timesSearched: 0});
        // buildHtml();
        populateButtons();
        return false;
    });






});