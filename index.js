
module.exports = function(options){
    var queue = [];

    options = options || {};
    options.executionWindow = options.executionWindow || 8;

    function run(){
        var start = Date.now();

        while(Date.now() - start < options.executionWindow && queue.length){
            queue.shift()();
        }

        if(queue.length){
            requestAnimationFrame(run);
        }
    }

    function pushTask(task){
        if(typeof task !== 'function'){
            throw 'task must be a function';
        }

        queue.push(task);

        if(queue.length === 1){
            requestAnimationFrame(run);
        }
    }

    pushTask.cancel = function(){
        queue = [];
    };

    return pushTask;
}