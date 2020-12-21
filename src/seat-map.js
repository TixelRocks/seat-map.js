
const DYNAMIC_STYLES_SELECTOR = '#seatmap-dynamic-styles'
const ACTIVE_SECTION_IDENTIFIER = 'ACTIVE_SECTION_IDENTIFIER'

const venues = {
    rodLaver: 'rod-laver'
}

const loadText = (url) => fetch(url) 
  .then(response => {
    if (response.ok) {
        return response.text()
    } else {
      throw new Error(response.statusText)
    }
  });

class SeatMap {
  constructor(content, container) {
    this.container = container;
    this.container.innerHTML = content;
    this.styleTag = container.querySelector(DYNAMIC_STYLES_SELECTOR)
    this.styleTemplate = this.styleTag.innerHTML
  }

  highlight(highlightedSection) {
    const tag = document.createElement('style')
    const content = this.styleTemplate.replace(new RegExp(ACTIVE_SECTION_IDENTIFIER, 'g'), highlightedSection)
    tag.appendChild(document.createTextNode(content))
    this.styleTag.replaceWith(tag);
    this.styleTag = tag;
  }
}

const createSeatMap = (options) => {
    const container = document.querySelector(options.target)
    return loadText(`${options.baseUrl || '/images/seat-maps'}/${options.venue}.svg`)
      .then(content => new SeatMap(content, container))
}

export {
    venues,
    createSeatMap as create,
}

