$(document).ready(function() {

    /* setup editor */
    var languageTools = ace.require( "ace/ext/language_tools" );
    var editor = ace.edit("editor");
    editor.setOptions( { enableBasicAutocompletion: true } );

    /* (200x-) auto completion */
    var words =  [ "field", "field+", "field-float", "field-offset" ];
    var forth200xCompleter = {
        getCompletions: function( editor, session, pos, prefix, callback ) {
            callback( null, words.map( function( word ) {
                return { name: word, value: word, score: 100, meta: "200x" };
            }) );
        }
    };

    languageTools.addCompleter( forth200xCompleter );

    /* console behaviour */
    editor.on("change", function(e) {
        /* newline! */
        if( e.data.action === "insertText" ) {
            var text = e.data.text;
            if( text === "\n" || text === "\r" || text === "\r\n" ) {
                var lineNumber =  e.data.range.start.row;
                var lineContent = editor.getSession().getDocument().getLine( lineNumber );
                console.log( "LINE:", lineContent );
            }
        }
    });
});