// The MIT License (MIT)

// Copyright (c) 2018 ADDISON WILLIAM SCHUHARDT

//  Permission is hereby granted, free of charge, to any person obtaining a 
//  copy of this software and associated documentation files (the "Software"), 
//  to deal in the Software without restriction, including without limitation 
//  the rights to use, copy, modify, merge, publish, distribute, sublicense, 
//  and/or sell copies of the Software, and to permit persons to whom the 
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in 
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
//  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
//  DEALINGS IN THE SOFTWARE.


function getBlockedMessageClasses() {
    let output = [];

    // search each <div> tag in the DOM
    let elements = document.querySelectorAll("div");
    for (var i = elements.length - 1; i >= 0; i--) {

        // look through each element's class list for something
        // that matches what we're looking for
        let elementClasses = elements[i].classList;
        for (var j = elementClasses.length - 1; j >= 0; j--) {
            let elementClass = elementClasses[j];
            if (elementClass.startsWith("messageGroupBlocked")
                && !output.includes(elementClass)) {

                // if we've found a new candidate class name,
                // add it to the list
                output.push(elementClass)
            }
        }
    }

    return output;
}

let blockedMessageClasses = [];
function hideOffendingMessageElements() {

    // ensure that we have an in-memory cache of offending element class names
    if (!Array.isArray(blockedMessageClasses) || !blockedMessageClasses.length) {
        blockedMessageClasses = getBlockedMessageClasses();
    }

    // find and hide every element which has any of the offending classes
    for (var i = blockedMessageClasses.length - 1; i >= 0; i--) {
        let classToHide = blockedMessageClasses[i];
        let elements = document.getElementsByClassName(classToHide);
        for (var j = elements.length - 1; j >= 0; j--) {
            elements[j].setAttribute("style", "display: none;");
        }
    }
}

setInterval(hideOffendingMessageElements, 500);
