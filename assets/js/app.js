$(document).ready(function () {

    var gifData = {
        superHeroNames: ["Superman", "Wonderwoman", "Batman", "Iron man", "Black Widow", "Captain America", "Hulk", "Spider Man", "Antman", "Wasp", "Captain Marvel", "Black Panther", "Deadpool", "Gamora", "Thanos", "Drax", "Groot", "Thor", "Doctor Strange", "Vision", "Scrlet Witch", "Winter Soldier", "Loki", "Hela", "Pepper Potts", "Star Lord"],
        giphyUrl: "",
        apiKey: "94M9cLs6k7xsmOK2hQTdr8sgBtA7cWkQ",
        currentGif: "", 
        pausedGif: "", 
        animatedGif: "", 
        stillGif: ""
    }

    main();

    function main(){
        buildHtml();
        populateButtons();
    }

    function buildHtml(){
        // var newDiv = $("<div>");
        // newDiv.html("Movie Title: ");
        $(".container").append($("<div>").addClass("row").attr("id", "forButtons"));
        $("#forButtons").append($("<div>").attr("id", "superHeroButtons"));

        $(".container").append($("<div>").addClass("row").attr("id", "forImgDisplay"));
        $("#forImgDisplay").append($("<div>").addClass("col-lg-9"));
        $(".col-lg-9").append($("<div>").addClass("display"));

        $("#forImgDisplay").append($("<div>").addClass("col-lg-3").attr("id","forInput"));
        $("#forInput").append($("<form>").attr("id", "text-form"))
        $("#text-form").append($("<label>").attr({for: "newTextInput", id: "serachLabel"}));
        $("#serachLabel").html("Add your search here");
        $("#text-form").append($("<input>").attr({type: "text", id:"newSearchTerm"}))
        $("#text-form").append($("<br>"));
        $("#text-form").append($("<input>").attr({id: "addSearchInput", type: "submit", value:"Submit"}));
        buildPagination();

    }

    function populateButtons(){
        $("#superHeroButtons").empty();
        for (let i = 0; i < gifData.superHeroNames.length; i++) {
            $("#superHeroButtons").append($("<button>").text(gifData.superHeroNames[i]).addClass("theBtn button-primary").attr("data-name", gifData.superHeroNames[i]));
        }
    }
    $(document).on("click", ".theBtn", function(){
        $(".display").empty();
        createUrl($(this).data("name"));

        makeAPICall();
    });

    // $(".theBtn").on("click", function(){
    //     $(".display").empty();
    //     createUrl($(this).data("name"));

    //     makeAPICall();
    // })

    function createUrl(queryString){
        // gifData.giphyUrl = "http://api.giphy.com/v1/gifs/search?q=super+hero+" + queryString + "&limit=10&api_key=" + gifData.apiKey;
        gifData.giphyUrl = "http://api.giphy.com/v1/gifs/search?q=" + queryString + "&limit=10&api_key=" + gifData.apiKey;
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
        $.each(response.data, function(index, value){
            // console.log(value.images.original_still.url);
            gifData.animatedGif = value.images.original.url;

            gifData.pausedGif = value.images.original_still.url;
            var thisRating = value.rating;
            if(thisRating === ""){
                thisRating = "Unrated";
            }

            var rating = $("<h5>").html("rated: " + thisRating).addClass("ratingStyle");
            gifData.stillGif = $("<img>").attr("data-animated", gifData.animatedGif).attr("data-paused", gifData.pausedGif).attr("src", gifData.pausedGif).addClass("hoverEffect");
            var fullGifDisplay = $("<button>").append( rating, gifData.stillGif);
            $(".display").append(fullGifDisplay);

            //tried card display
            // $(".display").append($("<div>").addClass("card").attr("style", "width: 18rem").attr("id", "gifCard"));
            // $("#gifCard").append($("<img>").attr("data-animated", gifData.animatedGif).attr("data-paused", gifData.pausedGif).attr("src", gifData.pausedGif).addClass("hoverEffect card-img-top"));
            // $("#gifCard").append("<div>").addClass("card-body");
            // var $divCardText = $('<p>', { class: 'card-text' }).append(rating);
            // // $("#gifCard").append("<p>").addClass("card-text").html(rating);
            // $("#gifCard").append($divCardText);


        });

    }

    $(document).on("mouseover", ".hoverEffect", function(){
        $(this).attr("src", $(this).data("animated"));
    })

    $(document).on("mouseleave", ".hoverEffect", function(){
        $(this).attr("src", $(this).data("paused"));
    })

    $('#addSearchInput').on('click', function(){
        var newShow = $('#newSearchTerm').val().trim();
        gifData.superHeroNames.push(newShow);
        // buildHtml();
        populateButtons();
        return false;
    });
    //build navigation
   function buildPagination(){
        $(".container").append($("<nav>").attr("id", "pageNav"));
        $("#pageNav").append($("<ul>").addClass("pagination justify-content-end").attr("id", "firstUL"));
        $("firstUL").append($("<li>").attr({class: "page-item-disabled", id: "firstLi"}));
        $("#firstLi").append($("a").addClass("page-link").attr({href: "#", tabindex: "-1", text: "Previous", id: "previousBtn"}));
        $("#firstUL").append($("<li>").addClass("page-item").append("<a>").attr({class: "page-link", href: "#", html: "1", id: "number1"}));
        $("#firstUL").append($("<li>").addClass("page-item").append("<a>").attr({class: "page-link", href: "#", text: "1", id: "number2"}));
        $("#firstUL").append($("<li>").addClass("page-item").append("<a>").attr({class: "page-link", href: "#", text: "1", id: "number3"}));
        $("#firstUL").append($("<li>").addClass("page-item").append("<a>").attr({class: "page-link", href: "#", text: "1", id: "Next"}));

   }






});