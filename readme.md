## Installation

```
$ npm install @tixel/seat-map
```

## Import

In the build system, import the `createSeatMap` factory function method and the `venues` object which is just a key value pair of venue name.

```js
import { createSeatMap, venues } from '@tixel/seat-map'

window.seatMapJS = {
    venues: venues,
    create: createSeatMap,
}
```

## Render

To initialise a seat map, pass a target and a venue to the `createSetMap` function. It will asynchonously download the seat map and render it.

```html
<script>
    seatMapJS.create({
        target: '#seat-map',
        venue: seatMapJS.venues.rodLaver,
    })
</script>
```


## Highlight

A single highlighting...

```html
<script>
    seatMapJS.create({
        target: '#seat-map',
        venue: seatMapJS.venues.rodLaver,
    }).then(seatMap => seatMap.highlight(45))
</script>
```

Multiple highlight commands...
```html
<script>
    let rodLaver
    seatMapJS.create({
        target: '#seat-map',
        venue: seatMapJS.venues.rodLaver,
    }).then(seatMap => {
        rodLaver = seatMap;
        rodLaver.highlight(45);
    })
    
    button.addEventListener('click', function () {
        rodLaver.highlight(12)
    })
</script>
```

Although the seat map is rendered asynchronously, you can start highlighting sections right away. Once rendered, the last highlighted section will be active.

## Clear highlighting

You can clear active highlighting by calling `reset()` on the seat map.

```html
<script>
    var rodLaver = seatMapJS.create({
        target: '#seat-map',
        venue: seatMapJS.venues.rodLaver,
    })

    rodLaver.highlight(45)

    button.addEventListener('click', function () {
        rodLaver.reset()
    })
</script>
```

## SVGs

Seat maps can be hosted hosted anywhere - but note that you will need to configure CORS if they are on a different domain. All seat map SVGs are located in the `/maps` directory. You can publish the SVGs with Laravel Mix...

```js
mix.copy('node_modules/@tixel/seat-map/maps/*', 'public/images/seat-maps')
```

Then pass the base URL when initialising the seat map.

```blade
<script>
seatMapJS.create({
    target: '#seat-map',
    venue: seatMapJS.venues.rodLaver,
    baseUrl: '{{ config('static_url') }}/images/seat-maps',
})
</script>
```
