# ElementGenerator.js
dependency free element generator(mootools style).

## Usage
```js
var myElement = new Element('div');
// <div></div>

var myElement = new Element('div.myclass');
//<div class="myclass"></div>

var myElement = new Element('div.myclass', {'class': 'foo bar'})
//<div class="myclass foo bar"></div>

var myElement = new Element('div.myclass', {'class': 'foo bar', id: 'lorem'})
//<div class="myclass foo bar" id="lorem"></div>

var myElement = new Element('div.myclass', {id: 'hey', html: '<h1>Headline</h1>', css: {'background': 'green', 'margin-top': '10px'}});
//<div class="myclass" id="hey" style="margin-top: 10px; background: green;">
//<h1>Headline</h1>
//</div>
```
###Create element with class "myclass" and append to body
```js
var myElement = new Element('div.myclass', {'class': 'foo bar'}, document.body);
```

###now lest create anoter element and append it to .myclass
```js
var myElement = new Element('div.myclass', {'class': 'foo bar'}, '.myclass');
```
