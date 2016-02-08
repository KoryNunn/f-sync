var test = require('tape'),
    crel = require('crel'),
    kgo = require('kgo'),
    fSync = require('../');

var itterations = 20000;


var status, UI, responsiveCheckOutput;

crel(document.body,
    status = crel('div'),
    UI = crel('div'),
    responsiveCheckOutput = crel('div')
);

function checkResponsiveness(){
    responsiveCheckOutput.textContent = Date.now() + ' <- Will not increment while UI is locked.';

    requestAnimationFrame(checkResponsiveness);
}

checkResponsiveness();

function modifyUI(){
    var rando = Math.random() * 2;

    UI.className = rando < 1 ?  'something' : 'anything';
    UI.innerHTML = '';
    crel(UI,
        crel('h1', 'Some Title'),
        crel('p',
            'A paragraph that contains text and that',
            'Random number :D ', rando
        ),
        crel('img', {title: 'This image wont load..'})
    );
}

function nonFSynced(callback){

    var done = 0;

    function updateUi(i){
        requestAnimationFrame(function(){
            modifyUI();
            done++;
            if(done === itterations){
                callback();
            }
        });
    }

    for(var i = 0; i < itterations; i++){
        updateUi(i);
    }

}

function fsynced(callback){

    var queue = fSync();
    var done = 0;

    function updateUi(i){
        queue(function(){
            modifyUI();
            done++;
            if(done === itterations){
                callback();
            }
        });
    }

    for(var i = 0; i < itterations; i++){
        updateUi(i);
    }

}

function updateStatus(newStatus){
    return function(done){
        status.textContent += ' ' + newStatus;
        setTimeout(done, 50);
    }
}

kgo
('nonFSyncLabel', updateStatus('non f-sync ...'))
('nonFSync', ['!nonFSyncLabel'], nonFSynced)
('fSyncLabel', ['!nonFSync'], updateStatus('Done. f-sync\'d ...'))
('fSync', ['!fSyncLabel'], fsynced)
(['!fSync'], updateStatus('Done'));