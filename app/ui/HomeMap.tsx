'use client'

import React from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import polyline from '@mapbox/polyline'
import L, { LatLngExpression } from 'leaflet'

// Your encoded polyline
const encodedPolyline = 'qv}nErj~qU}@e@qDV_Db@kDlAuA@{DxEp@dBvIrLZbB]fEPrAjEtGn@`BNfBI`Bi@|AgC~DQtAVfBtJrUjAlAzEtCrCfA|O~CjBFpFk@zB|@|d@rm@|@fClBlKt@dMdAvHF~EtA~HjAnK?zDg@lDm@dAaEtBeDxFcG\cClBqSoCuNk@_Cx@wDnC_D~EsBpAgIpAkAOoD{AwBN_BzAeAxCiC~E}AnF{DzDyP|HgB@eFoAmBH{BjBsAhD{@hAsJzC{GO}HfAmC_@aIZwBk@oFYaEyAcC[{C`@sJtB}G{@aD@qCuAcCUeJbAiFrAyGVkNwE}F}A{BQaE_BmA}@{B_D}HwCkAKyFx@{BpAuG`AiBpDk@f@{Gx@}DnBwFX{@~@e@rCo@hBkDjFaBt@aBjByDfAaCP{K|Es@|@_AnCjAsCdAcAjJ}D|HaBvEkDfD{EfBsGj@s@lA[zDApDkBzG{@n@e@bBmD`Em@pFqBbFm@nAPbHpCbCbDzA`A~CjA|JtBxNxE`HWbFqAjJaAvBVnCjAzDHhGx@nBMfHwBvBUrBRtE`BfETfDp@|G[hDThIcApGVpJcD|@gAtAoDlBcBdBMnFrAhB@dPmHnEiEnBkGhEmJfB{AlBErCxAvATtIqAdBaArDyF~DsCpBi@nOt@nOzBb@IuQkC{Ni@yBv@eD|BaA`AqBnD{BtA}HhAuAQgDyAwBLcBbBkEvJcBtFsElEePfHgBC}EkAkBFuB`B}AzD_AdAwJxCsFSwIjAuC_@yHViCk@}EUsEcByBS}NxC{Cg@gHUqCsAcCSqJdAaFpAwGTsOeF}EoAuBQoEcBy@m@eCmDeI}CmACuFz@{BpAmGbAmBlDo@d@}Gz@uDlBuFRcAjAg@zCo@`BeDjF_Br@eBhBsDfAeCT{KvEm@v@cArCpAwClAeAxIuDzH{AlFwD`DeFtAuFv@eAzFYpDeB|Gy@|@u@`BiDpFy@rD}A|Ek@nAFzHzCnClDbCnAvM`DpO`FzG[`FqAtJeA`BTdDtAhDD~Gz@dJyB~Cc@fBP~EbBnET|Cl@hHW`DXbIgAtGTlJcDfAsArAoD`BsAfBQrFvAjB@vOiHzEyEjB_GjEsJxAwAtBEpCtAzAXtIqA`B_A|DaGvDkCjBo@zOt@lS`CzBaBtF]t@w@rBgEhEuBl@wAf@}DKaHqCqQIuFiAiIs@eLyCmOwe@}n@gCaAwIj@yOyCqCeA{GkF_KgVMeANiA`CqDh@eBJgBQoBm@aBqEkHEiA^kD]yB}HkKoAcCpDgEjADjEuApI}@'

// Decode the polyline into an array of lat/lng coordinates
const routeCoordinates = polyline.decode(encodedPolyline)

const defaults = {
  latlong: [34.07238006591797, -118.45283509232104] as LatLngExpression, // Default center
  zoom: 12 as number, // Default zoom level
}

export default function StaticMap() {
  return (
    <div className="w-full h-[60vh] bg-gray-900 p-4">
      <MapContainer center={defaults.latlong} zoom={defaults.zoom} style={{ height: '100%', width: '100%' }}>
        {/* Dark-themed map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {/* Display the decoded route */}
        <Polyline positions={routeCoordinates} color="#EA580C" weight={4} opacity={0.9} />
      </MapContainer>
    </div>
  )
}
