# f-sync

queue work to happen within frames to allow the UI some time to update.

## Install

```
npm install f-sync
```

## Usage

```javascript

var fSync = require('f-sync');

var queue = fSync(options);

queue(function(){
    // Some work to be done
});

// cancel queue mid-flight
queue.cancel(); // no more work will happen.

```

## [Example](https://rawgithub.com/KoryNunn/f-sync/master/example/index.html)

```
npm run watch-example
```

then open example/index.html in a browser.