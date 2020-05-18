
const DYNAMIC_STYLES_SELECTOR = '#seatmap-dynamic-styles'
const ACTIVE_SECTION_IDENTIFIER = 'ACTIVE_SECTION_IDENTIFIER'
const BASE_URL = 'https://public-uploads-production.tix.fm/seat-maps+'

const VENUES = {
    rodLaver: 'rod-laver'
}

const createSeatMap = (options) => {
    let styleTemplate = ''
    const queue = createQueue()
    let styleTag = document.createElement('style')
    const container = document.querySelector(options.target)

    fetch(`${BASE_URL}/${options.venue}`)
        .then(response => {
            if (response.ok) {
                return response.text()
            }

            throw new Error(response.statusText)
        })
        .then(svg => {
            container.innerHTML = svg
            styleTag = container.querySelector(DYNAMIC_STYLES_SELECTOR)
            styleTemplate = styleTag.innerHTML
            queue.start()
        })

    const highlight = section => {
        queue.push(() => {
            const oldStyleTag = styleTag

            styleTag = createStyleTag(styleTemplate, section)

            oldStyleTag.replaceWith(styleTag)
        })
    }

    const reset = () => {
        highlight(null)
    }

    return {
        highlight,
        reset,
    }
}

const createStyleTag = (template, highlightedSection) => {
    const tag = document.createElement('style')

    const content = template.replace(new RegExp(ACTIVE_SECTION_IDENTIFIER, 'g'), highlightedSection)

    tag.appendChild(document.createTextNode(content))

    return tag
}

const createQueue = () => {
    let jobs = []
    let started = false

    const run = () => {
        if (started === false) {
            return
        }

        const job = jobs.pop()

        if (job === undefined) {
            return
        }

        job()
    }

    const enqueue = job => {
        jobs = [job]
    }

    const start = () => {
        started = true

        run()
    }

    const push = job => {
        enqueue(job)

        run()
    }

    return {
        push,
        start,
    }
}

module.export = {
    VENUES,
    createSeatMap,
}

