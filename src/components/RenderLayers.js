import { HexagonLayer, TileLayer, BitmapLayer } from "deck.gl";

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

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

  const layes = [
    new HexagonLayer({
      id: "hexagon-layer",
      data,
      colorRange,
      radius: 50000,
      extruded: true,
      elevationScale: 40,
      elevationRange: [0, 3000],
      getPosition: (d) => d.position
    })
  ];

  return [layes, tileLayer];
}
