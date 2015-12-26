'use strict'
import ReactDOM from 'react-dom'
import lang from 'i18n/lang'

exports.componentWillUnmount = function () {
  document.removeEventListener('mousemove', this.onScaleMouseMove)
  document.removeEventListener('mouseup', this.onScaleMouseUp)
}

exports.onScaleMouseDown = function (ev, idx) {
  // only left mouse button
  if (ev.button !== 0) return
  document.addEventListener('mousemove', this.onScaleMouseMove)
  document.addEventListener('mouseup', this.onScaleMouseUp)
  document.body.style.WebkitUserSelect = "none"
  document.body.style.MozUserSelect = "none"
  document.body.style.MsUserSelect = "none"

  this._scalable = {}
  this._scalable.scales = []
  this._scalable.selectedIdx = idx
  let slide = this.props.deck.getSelectedSlide()
  this.state.selectedWidgets.forEach(e => {
    let computedStyle = window.getComputedStyle(ReactDOM.findDOMNode(this.refs[e]))
    let scalable = {}
    scalable.oWidth = parseInt(computedStyle.width) || 1
    scalable.oHeight = parseInt(computedStyle.height) || 1
    scalable.osx = (slide.components[e].scale && slide.components[e].scale.x) || 1
    scalable.osy = (slide.components[e].scale && slide.components[e].scale.y) || 1
    console.log('(osx,osy)=' + scalable.osx + ',' + scalable.osy)
    scalable.ox = ev.pageX
    scalable.oy = ev.pageY
    this._scalable.scales[e] = scalable
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onScaleMouseUp = function (ev) {
  document.body.style.WebkitUserSelect = ""
  document.body.style.MozUserSelect = ""
  document.body.style.MsUserSelect = ""
  document.removeEventListener('mousemove', this.onScaleMouseMove)
  document.removeEventListener('mouseup', this.onScaleMouseUp)
  let deltaScale = this.computeDeltaScale(ev)
  this.state.selectedWidgets.forEach(e=> {
    console.log("(sx,sy)=" + (this._scalable.scales[e].osx * deltaScale) + ',' + (this._scalable.scales[e].osy * deltaScale))
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(e, {
        scale: {
          x: this._scalable.scales[e].osx * deltaScale,
          y: this._scalable.scales[e].osy * deltaScale
        }
      },
      lang.scaleComponents
    )
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.onScaleMouseMove = function (ev) {
  let deltaScale = this.computeDeltaScale(ev)
  this.state.selectedWidgets.forEach(e=> {
    console.log("(sx,sy)=" + (this._scalable.scales[e].osx * deltaScale) + ',' + (this._scalable.scales[e].osy * deltaScale))
    this.props.onSelectedWidgetUpdated && this.props.onSelectedWidgetUpdated(e, {
      scale: {
        x: this._scalable.scales[e].osx * deltaScale,
        y: this._scalable.scales[e].osy * deltaScale
      }
    })
  })
  ev.stopPropagation && ev.stopPropagation()
}

exports.computeDeltaScale = function (ev) {
  let scale = this.state.scale || 1
  let widgetOriginalScale = this._scalable.scales[this._scalable.selectedIdx]
  console.log('(dx,dy)=' + (ev.pageX - widgetOriginalScale.ox) + ',' + (ev.pageY - widgetOriginalScale.oy))
  let deltaScaleX = (widgetOriginalScale.oWidth + (ev.pageX - widgetOriginalScale.ox) / scale) / widgetOriginalScale.oWidth
  let deltaScaleY = (widgetOriginalScale.oHeight + (ev.pageY - widgetOriginalScale.oy) / scale) / widgetOriginalScale.oHeight
  console.log('(dsx,dsy)=' + deltaScaleX + ',' + deltaScaleY)
  return Math.max(deltaScaleX, deltaScaleY)
}
