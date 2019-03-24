$(document).ready(function () {
    buildHtml();

    function buildHtml(){
        // var newDiv = $("<div>");
        // newDiv.html("Movie Title: ");
        $(".container").append($("<div>").addClass("row"));
        $(".row").append($("<div>").addClass("col-lg-9"));
        $(".col-lg-9").append($("<div>").addClass("display"));

        $(".row").append($("<div>").addClass("col-lg-3"));
        $(".col-lg-3").append($("<form>").attr("id", "text-form"))
        $("#text-form").append($("<label>").attr({for: "newTextInput", id: "serachLabel"}));
        $("#serachLabel").html("Add your search here");
        $("#text-form").append($("<br>"));
        $("#text-form").append($("<input>").attr({id: "addSearch", type: "submit", value:"Submit"}));

        // attr( { title:"Test", alt:"Test2" } )

        // addIntoDiv($("<div>"), $(".container"),true, "", false, "", false, "row", true);
        // addIntoDiv($("<div>"), $("#row"),true, "topics", true, "", false, "", false);
    }

    function addIntoDiv(divElement, elementToAppendTo ,toAppendBool, attrName, addAttrBool, textToAdd, addTextBool, className, classToAddBool) {
        if (addAttrBool) {
            divElement.attr("id", attrName);
        }
        if (addTextBool) {
            divElement.text(textToAdd);
        }
        if(classToAddBool){
            divElement.attr("class", className);
        }
        if (toAppendBool) {
            $("#row").append(divElement);
        }
        
    }
});