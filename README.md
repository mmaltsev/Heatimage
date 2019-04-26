# Heatimage

**A library for overlaying heat on static images.** Draw heat over static images or simply visualize existing datasets.


[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## [Demo]() | [Docs]()

## Installation

The easiest way to get started is to install it via npm:

```
npm install heatimage
```

Or to add manually a link to the library into your html file:

```html
<script src="https://unpkg.com/heatimage@latest/dist/bundle.js"></script>
```

## Usage
Create an `img` element and give it an id, e.g.:

```html
<img src="world_map.png" id="heatimage" />
```

Then, use specified id in order to select an `img` element, specify options and trigger Heatimage library in your js / ts file or `<script> </script>` tags in html file:

```javascript
let element = document.querySelector('#heatimage')

let heatOptions = {
  heatValue: 0.05,
  heatRadius: 15,
  heatBlur: 25,
  colorGradient: 'Visible Spectrum',
  exporting: true,
  edit: true,
  keys: true
}

Heatimage.heatimage(element, heatOptions)
```

## Results:
<img src="examples/demo/world_map_heat.png" width="550" />
[source image](https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Map_of_the_world_by_the_US_Gov_as_of_2016.svg/1024px-Map_of_the_world_by_the_US_Gov_as_of_2016.svg.png)

## Contributing
Build the library with `npm run build`. For a production version with console warnings, execute `npm run build:prod_warn`. This will fetch all dependencies and then compile the `dist` files. To see the examples locally you can start a web server with `npm run dev` and go to `localhost:8080` (`localhost:8081` if port `8080` is busy).

## License
MIT License. Copyright (c) 2017-2019 Maxim Maltsev.

## Authors
[Maxim Maltsev](https://github.com/mmaltsev).
