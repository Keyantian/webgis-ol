<template>
  <div>
    <a-button
      class="btn-clear-spatialMeasure"
      style="margin-right: 10px"
      @click="Mesure('LineString')"
      >长度测量</a-button
    >
    <a-button
      class="btn-clear-spatialMeasure"
      style="margin-right: 10px"
      @click="Mesure('Polygon')"
      >面积测量</a-button
    >
    <a-button class="btn-color-spatialMeasure" @click="cancel">取消</a-button>
  </div>
</template>

<script>
import "ol/ol.css";
import Draw from "ol/interaction/Draw";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { LineString, Polygon } from "ol/geom";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getArea, getLength } from "ol/sphere";
import { unByKey } from "ol/Observable";
var helpTooltipElement = null;
var feature = null;
var helpTooltip = null;
var draw = null;
var measureTooltipElement = null;
var measureTooltip = null;
var listener = null;
var mapMouseMove = null;
export default {
  name: "index",
  data() {
    return {
      drawLayers: [],
      drawElements: [],
    };
  },
  methods: {
    Mesure(type) {
      this.cancel();
      let source = new VectorSource();

      const layer = new VectorLayer({
        source: source,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 4,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33",
            }),
          }),
        }),
      });

      mapMouseMove = map.on("pointermove", (ev) => {
        let helpMsg = "点击开始测量";
        if (feature) {
          helpMsg = "双击结束测量";
        }
        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(ev.coordinate);
        helpTooltipElement.classList.remove("hidden");
      });

      map.getViewport().addEventListener("mouseout", function () {
        helpTooltipElement.classList.add("hidden");
      });

      draw = new Draw({
        source,
        type,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 4,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
          }),
        }),
      });

      // 开始坚挺绘制
      draw.on("drawstart", (evt) => {
        feature = evt.feature;

        let tooltipCoord = evt.coordinate;

        listener = feature.getGeometry().on("change", (evt) => {
          const geom = evt.target;
          //   let output = formatLength(geom);
          //   tooltipCoord = geom.getLastCoordinate();
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      // 双击绘制完成
      draw.on("drawend", () => {
        measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
        measureTooltip.setOffset([0, -7]);
        feature = null;
        measureTooltipElement = null;
        this.createMeasureTooltip();
        unByKey(listener);
      });

      //格式化面积

      const formatArea = (polygon) => {
        var sourceProj = map.getView().getProjection(); // 获取投影坐标系
        var area = getArea(polygon, {
          projection: sourceProj,
        });
        var output;
        if (area > 10000) {
          output =
            Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
        } else {
          output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
        }
        return output;
      };

      // 格式化长度
      const formatLength = function (line) {
        var sourceProj = map.getView().getProjection();
        const length = getLength(line, {
          projection: sourceProj,
        });
        let output;
        if (length > 100) {
          output = Math.round((length / 1000) * 100) / 100 + " " + "km";
        } else {
          output = Math.round(length * 100) / 100 + " " + "m";
        }
        return output;
      };

      this.createHelpTooltip();
      this.createMeasureTooltip();
      map.addLayer(layer);
      this.drawLayers.push(layer);
      map.addInteraction(draw);
    },
    createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement("div");
      measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
        stopEvent: false,
        insertFirst: false,
      });
      this.drawElements.push(measureTooltip);
      map.addOverlay(measureTooltip);
    },

    createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement("div");
      helpTooltipElement.className = "ol-tooltip hidden";
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left",
      });
      map.addOverlay(helpTooltip);
    },

    cancel() {
      for (let i = 0; i < this.drawLayers.length; i++) {
        map.removeLayer(this.drawLayers[i]);
      }
      for (let i = 0; i < this.drawElements.length; i++) {
        map.removeOverlay(this.drawElements[i]);
      }
      this.drawLayers = [];
      this.drawElements = [];
      if (helpTooltip != null) {
        helpTooltip.setPosition(undefined);
      }
      map.removeInteraction(draw);
      unByKey(mapMouseMove);
    },
  },
};
</script>

<style>
.btn-color-spatialMeasure {
  background-color: rgba(94, 94, 94, 0.7);
  color: white;
}
.btn-clear-spatialMeasure {
  background-color: rgba(243, 166, 22, 0.7);
  color: white;
}
/deep/.hidden {
  display: none;
}

/deep/.ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 12px;
  cursor: default;
  user-select: none;
}

/deep/.ol-tooltip-measure {
  opacity: 1;
  font-weight: bold;
}

/deep/.ol-tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}

/deep/.ol-tooltip-measure:before,
/deep/.ol-tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}

/deep/.ol-tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>