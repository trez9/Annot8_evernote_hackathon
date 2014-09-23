var startOfRecording = theTime();

function theTime() {
	var date = new Date();
	return date.getTime();
}

function resetTime() {
	startOfRecording = theTime();
}

function getTimeStamp() {
	var milliTime = theTime() - startOfRecording;
	var min = ((milliTime/1000/60) << 0).toString();
	var sec = Math.floor((milliTime/1000)%60).toString();
	if (sec.length < 2) {
		sec = "0" + sec;
	}
	return "<br>" + "[" + min + ":" + sec + "]";  
}

// This function was taken from Stack Overflow
function insertAtCaret(content) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = content;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

$(document).keypress(function(e) {
	if (e.charCode==13) {
        console.log("charCode is " + e.charCode);
		insertAtCaret(getTimeStamp());
        updateSynced();
	}
})

function updateSynced() {
    var time = new Date();
    $("#synced").html("Last synced " + time)
}