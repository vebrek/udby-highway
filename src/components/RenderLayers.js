import { HexagonLayer, TileLayer, BitmapLayer } from "deck.gl";
import {IconLayer} from '@deck.gl/layers';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';



const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

export function renderLayers(props) {
  const { data } = props;

  const tileLayer = new TileLayer({
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",

    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north }
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north]
      });
    }
  });
  const alpha = 150;
  const layes = [
    new HeatmapLayer({
      id: 'heatmapLayer',
      data,
      getPosition: d => d.geometry.coordinates,
      getWeight: d => d.weight,
      aggregation: 'mean',
      colorRange: [[254,240,217,alpha], [253,212,158,alpha], [253,187,132,alpha], [252,141,89,alpha], [227,74,51,alpha], [179,0,0,alpha]]
    }),
    /*
    // This layer will show points with pin
    new IconLayer({
      id: "pin-layer",
      data,
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 10,
      getPosition: d => d.geometry.coordinates,
      getSize: d => 2,
      getColor: d => [d.geometry.coordinates[0] + 90, 140, d.geometry.coordinates[1] + 90]
    })
    */
  ];

  return [tileLayer, layes];
}
