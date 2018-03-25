$(document).ready(function () {
    $(".divider").hide();
    var displayStyle = document.createElement('style');
    $('iframe').contents().find("head").append($("<style type='text/css'> </style>"));
    var numShown = 4;
    $(".nav-element").on("click", function() {
        $(this).toggleClass( "selected", 500 );
        var divID = "#" + $(this).attr("id") + "-text";
        $(divID).toggle();
    });

    //change behavior of tab in a text area to add a tab to the string instead of changing text boxes
    //This functionality is heavily based on a stack overflow answer written by kasdega on 7/9/11
    $("textarea").on( "keydown" , function(e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == $.ui.keyCode.TAB) {
            e.preventDefault();
            var start = this.selectionStart;
            var end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

            // put caret at right position again
            this.selectionStart =
                this.selectionEnd = start + 1;
        }
    });
    //dynamically update display panel based on code in three panels
    //Using an iframe makes this much easier for us, because it is treated as a different
    //page and therefore our other stylings will be unaffected
    $("textarea.divider").on( "focusout" , function () {
        $( "#display-text" ).contents().find("html")
            .html("<html><head><style type='text/css'>"
                + $("#css-text").val()
                + "</style>"
                + "</head>"
                + $("#html-text").val() + "</html>");
        var jsCom = $("#javascript-text").val();
        document.getElementById("display-text").contentWindow.eval( jsCom );    });

});