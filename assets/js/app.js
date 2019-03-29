$(document).ready(function () {
    //the object that hold all relevent information
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
            { queryName: "Winter Soldier", timesSearched: 0 }, 
            { queryName: "Loki", timesSearched: 0 },
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
    //this does everything
    function main() {
        buildHtml();
        populateButtons();
    }


    //builds my html with jQuery
    function buildHtml() {
        //building the jumbotron
        $(".container").append($("<div>").addClass("jumbotron").attr("id", "mybanner"));
        $("#mybanner").append($("<h1>").addClass("display-3").html("Giftastic"));
        $("#mybanner").append($("<p>").addClass("lead").html("Click any button below to see some awesome Gifs! Or add your own button!"))
        //building the buttons
        $(".container").append($("<div>").addClass("row").attr("id", "forButtons"));
        $("#forButtons").append($("<div>").attr("id", "superHeroButtons"));
        //buildign the display for the images
        $(".container").append($("<div>").addClass("row").attr("id", "forImgDisplay"));
        $("#forImgDisplay").append($("<div>").addClass("col-lg-9"));
        $(".col-lg-9").append($("<div>").addClass("display"));
        //building the form for new query input
        $("#forImgDisplay").append($("<div>").addClass("col-lg-3").attr("id", "forInput"));
        $("#forInput").append($("<form>").attr("id", "text-form"))
        $("#text-form").append($("<label>").attr({ for: "newTextInput", id: "serachLabel" }));
        $("#serachLabel").html("Add your search here");
        $("#text-form").append($("<input>").attr({ type: "text", id: "newSearchTerm" }))
        $("#text-form").append($("<br>"));
        $("#text-form").append($("<input>").attr({ id: "addSearchInput", type: "submit", value: "Submit" }));
        buildFooter();
    }

    function buildFooter(){
        let logoImage = $("<img>").attr("src", "./assets/images/dev-logo-lg.gif").attr({width: "241px", height: "27px", href: "https://developers.giphy.com/"});
        $("body").append($("<footer>").addClass("footer navbar-fixed-bottom").attr("id", "giphyFooter"));
        $("#giphyFooter").append($("<div>").addClass("text-center footer-copyright").attr("id","logoDiv"));
        $("#logoDiv").append($("<a>").attr("href", "https://developers.giphy.com/").html("Powered By "));
        $("#logoDiv").append(logoImage);

    }
    //populate the buttons from gifdata array
    function populateButtons() {
        $("#superHeroButtons").empty();
        for (let i = 0; i < gifData.superHeroNames.length; i++) {
            $("#superHeroButtons").append($("<button>").text(gifData.superHeroNames[i].queryName).addClass("theBtn").attr("data-name", gifData.superHeroNames[i].queryName).attr("data-number", gifData.superHeroNames[i].timesSearched));
        }
    }
    //when you click the button 
    $(document).on("click", ".theBtn", function () {
        // let i = $(this).data("number");
        createUrl($(this).data("name"), $(this).data("number"));
        searchAndUpdateQueryTimes($(this).data("name"));
        makeAPICall();
    });
    //THis is where we capture and update if the query has been searched
    //if it is then update the button object and search number so we can 
    //request correct query next time
    function searchAndUpdateQueryTimes(clickedQuery){
        for (let i = 0; i < gifData.superHeroNames.length; i++) {
            if(gifData.superHeroNames[i].queryName === clickedQuery){
                gifData.superHeroNames[i].timesSearched++;
                populateButtons();
            }
        }
    }
    //function to create our URL for the api call
    function createUrl(queryString, timesSearched) {
        offsetValue = timesSearched*10;
        gifData.giphyUrl = "https://api.giphy.com/v1/gifs/search?q=" + queryString + "&limit=10&offset="+ offsetValue +"&api_key=" + gifData.apiKey;
    }
    //function to call the API
    function makeAPICall() {
        // createUrl(queryString);
        $.ajax({
            url: gifData.giphyUrl,
            method: "GET"
        }).then(function (response) {
            displayGiphys(response);
        });
    }
    // this is where we display all the Gifs
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
    //hover effects from pause -> animated
    $(document).on("mouseover", ".hoverEffect", function () {
        $(this).attr("src", $(this).data("animated"));
    })
    //hover effects from animated -> pause
    $(document).on("mouseleave", ".hoverEffect", function () {
        $(this).attr("src", $(this).data("paused"));
    })
    //form logic. this is where we implement our input
    $('#addSearchInput').on('click', function () {
        var newQuery = $('#newSearchTerm').val().trim();
        gifData.superHeroNames.push({queryName: newQuery, timesSearched: 0});
        populateButtons();
        return false;
    });
});