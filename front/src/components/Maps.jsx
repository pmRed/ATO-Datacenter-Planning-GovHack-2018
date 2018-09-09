
import React, {Component} from 'react'
import 'leaflet/dist/leaflet.css'
import {Select} from 'semantic-ui-react'
import { observer, inject } from 'mobx-react'

let L,E,chroma
L = require('leaflet')
E = require('esri-leaflet')
chroma = require('chroma-js')

var config = {}
config.params = {
    // maxBounds: new L.LatLngBounds(
    //     new L.LatLng(-35.309-0.2, 149.13-0.2), 
    //     new L.LatLng(-35.309+0.2, 149.13+0.2)
    // ),
    center: [-35.309,149.13],
    zoomControl: false,
    zoom: 11,
    scrollwheel: false,
    legends: true,
    infoControl: false,
    attributionControl: true
}
config.tileLayer = {
    uri: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    params: {
        zoom: 5,
        minZoom: 8, //Limited for performance reasons
        id: '',
        accessToken: ''
    }
}

// var colorScale = chroma.scale()
var colorScale = chroma.scale(['red', 'white','blue']).domain([-10,10])

@inject('UIState')
@observer
class Map extends Component {
    state = {
        map: null,
        tileLayer: null,
    }

    init(id) {
        if (this.state.map) return
        let _this = this
        let map = L.map(id, config.params)
        L.control.zoom({ position: 'bottomleft'}).addTo(map)
        L.control.scale({ position: 'bottomright'}).addTo(map)
        L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map)

        var SA3Zones = E.featureLayer({
            url: 'https://geo.abs.gov.au/arcgis/rest/services/ASGS2016/POA/MapServer/0',
            style: function (e) {
                try {
                    var value=_this.props.data[e.properties.POA_CODE_2016]['deltaPeoplePC']
                }
                catch(err){
                    value = 0
                }
                return {color: colorScale(value)}
            }
        }).addTo(map)

        var popupTemplate = '<h3>{POA}</h3><b>Change in Filed Returns: </b>{deltaPeople}<br/><b>% Impact: </b>{deltaPeoplePC}'

        SA3Zones.bindPopup(function(e){
            _this.props.UIState.regionSelected = e.feature.properties.POA_NAME_2016
            var value = e.feature.properties.POA_NAME_2016
            return L.Util.template(popupTemplate,
                {POA : value,
                    deltaPeople: _this.props.data[value]['deltaPeople'],
                    deltaPeoplePC: Math.floor(_this.props.data[value]['deltaPeoplePC'])}
            )
        })
        this.setState({map: map})
    }

    componentDidMount() {
        if (!this.state.map) this.init(this._mapNode)
    }

    render() {
        return (
            <div ref={(node) => this._mapNode = node} id="map"/>
        )
    }
}

export default Map
