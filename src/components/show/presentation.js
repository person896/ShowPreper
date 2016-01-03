'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import 'impress.js'
import './presentation.less'
import DeckStore from 'stores/deck'
var DisplayableComponent = require('components/widgets/displayableComponent')

let Presentation = React.createClass({
  getInitialState: () => ({
    deck: DeckStore.getDefaultDeck()
  }),
  componentDidMount: function () {
    if ("ontouchstart" in document.documentElement) {
      document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>"
    }
    window.impress().init()
  },
  render: function () {
    let deckView = this.state.deck.components.map((component, index) => {
      if (component.type === 'Slide') {
        let bb = this.state.deck.getSlideBoundingBox(component)
        component.y = bb.top
        component.x = bb.left
        component.width = bb.right - bb.left
        component.height = bb.bottom - bb.top
      }
      return (
        <DisplayableComponent
          ownClassName="step slide"
          data-x={component.x+component.width/2}
          data-y={component.y+component.height/2}
          component={component}
          container={this.props.deck}
          key={index}
          idx={index}
          ref={index}
        />
      )
    })
    return <div>
      <div className="fallback-message">
        <p>Your browser <b>doesn't support the features required</b> by impress.js, so you are presented with a
          simplified version of this presentation.</p>
        <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>
      </div>
      <div id="impress" data-width={this.state.deck.slideWidth} data-height={this.state.deck.slideHeight}>
        {deckView}
      </div>
      <div className="hint">
        <p>Use a spacebar or arrow keys to navigate</p>
      </div>
    </div>
  }
})
// Render the main component into the dom
ReactDOM.render(<Presentation />, document.getElementById('app'))
