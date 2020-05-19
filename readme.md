## Import

In the build system, import the `createSeatMap` factory function method and the `venues` object which is just a key value pair of venue name.

```js
import { createSeatMap, venues } from './seat-map'

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

Seat maps are hosted externally on S3 to make sure we aren't shipping all the seat map SVGs to the browser when they aren't needed. All seat map SVGs are located in the `/maps` directory.

## Highlight

A single highlighting...

```html
<script>
    seatMapJS.create({
        target: '#seat-map',
        venue: seatMapJS.venues.rodLaver,
    }).highlight(45)
</script>
```

Multiple highlight commands...
```html
<script>
    var rodLaver = seatMapJS.create({
        target: '#seat-map',
        venue: seatMapJS.venues.rodLaver,
    })

    rodLaver.highlight(45)

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
