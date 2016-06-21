import BaseState from './base-state';
import ns from '../core/namespace';


/**
 * A state to select shapes.
 */
export default class BeatState extends BaseState {
  constructor(timeline /*, options = {} */) {
    super(timeline /*, options */);

    this.currentLayer = null;
    // need a cached
    this.selectedItems = null;
    this.mouseDown = false;
    this.shiftKey = false;

    this._layerSelectedItemsMap = new Map();
  }

  enter() {

  }

  exit() {

  }

  handleEvent(e) {
    switch (e.type) {
      case 'mousedown':
        this.onMouseDown(e);
        break;
      case 'click':
        this.onClick(e);
        break;
      case 'keydown':
        this.onKey(e);
        break;
      case 'keyup':
        this.onKey(e);
        break;
    }
  }

  onKey(e) {
    this.shiftKey = e.shiftKey;
  }

  onMouseDown(e) {
    this._currentTrack = this.timeline.getTrackFromDOMElement(e.target);
    if (!this._currentTrack) { return; }

    // recreate the map
    this._layerSelectedItemsMap = new Map();
    this._currentTrack.layers.forEach((layer) => {
      this._layerSelectedItemsMap.set(layer, layer.selectedItems.slice(0));
    });
  }

  onClick(e) {
    if (!this._currentTrack) { return; }

    this._currentTrack.layers.forEach((layer) => {
      let item = layer.getItemFromDOMElement(e.target);

      if (!e.originalEvent.shiftKey) {
        layer.unselect();
      }

      if (item) {
        layer.toggleSelection(item);
      }
    });
  }
}
