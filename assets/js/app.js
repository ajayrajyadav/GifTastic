$(document).ready(function () {
    buildHtml();

    function buildHtml(){
        addIntoDiv($("<div>"), $(".container"),true, "", false, "", false, "row", true);
        addIntoDiv($("<div>"), $("#row"),true, "topics", true, "", false, "", false);

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