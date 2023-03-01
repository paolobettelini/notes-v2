"use strict";

// TODO make dynamic using window.location
const API_URL = 'http://localhost:8080';

async function postData(url = '', data = {}) {
    url = API_URL + url;

    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}

let container = document.getElementById('inner-content');
renderPage('differentiation');

function renderPage(pageName) {
    postData(`/page/${pageName}`)
        .then(page => {
            page.notes.forEach(note => {
                renderPiece(note);
            });
        });
}

var counter = 0;
function renderPiece(note) {
    // <h1 id="page"><a href="#page">Title</a></h1>
    // l'<a> non va perché lo genera dopo
    let title = document.createElement(`h${note.level}`);
    title.id = note.file;
    let titleText = document.createTextNode(note.title);
    title.appendChild(titleText);

    container.appendChild(title);

    if (note.file != undefined) {
        let canvas = document.createElement('canvas');
        
        let textLayer = document.createElement('div');
        //textLayer.classList.add('text-layer');

        let wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.style.position = 'relative';

        ++counter;
        let canvasId = `pdf${counter}`;
        let textLayerId = `tl${counter}`;
        canvas.id = canvasId;
        textLayer.id = textLayerId;
    
        wrapper.appendChild(canvas);
        wrapper.appendChild(textLayer);
        container.appendChild(wrapper);
        loadPDF(`/note/${note.file}`, canvasId, textLayerId);
    }
}