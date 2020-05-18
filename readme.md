## Import

In the build system, import the `createSeatMap` factory function method and the `VENUES` object which is just a key value pair of venue name.

```js
import { createSeatMap, VENUES } from './seat-map'

window.seatMap = {
    venues: VENUES,
    create: createSeatMap,
}
```

## Render

To initialise a seat map, pass a target and a venue to the `createSetMap` function. It will asynchonously download the seat map and render it.

```html
<script>
    const rodLaver = seatMap.create({
        target: '#seat-map',
        venue: seatMap.venues.rodLaver,
    })
</script>
```

Seat maps are hosted externally on S3 to make sure we aren't shipping all the seat map SVGs to the browser when they aren't needed.

## Highlight


```html
<script>
    const rodLaver = seatMap.create({
        target: '#seat-map',
        venue: seatMap.venues.rodLaver,
    })

    rodLaver.highlight(45)
</script>
```

Although the seat map is rendered asynchronously, you can start highlighting sections right away. Once rendered, the last highlighted section will be active.
