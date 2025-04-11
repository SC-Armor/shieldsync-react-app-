return (
  <MapContainer
    center={center}
    zoom={zoomLevel}
    minZoom={4}
    maxZoom={12}
    style={{ height: "600px", width: "100%", borderRadius: "12px" }}
    whenCreated={(mapInstance) => {
      mapRef.current = mapInstance;
    }}
  >
    <TileLayer
      url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    />

    {/* PULSE GLOW */}
    <Marker
      position={center}
      icon={L.icon({
        iconUrl: pulseGlow,
        iconSize: [zoomLevel * 10, zoomLevel * 10],
        iconAnchor: [zoomLevel * 5, zoomLevel * 5],
      })}
      interactive={false}
    />

    {/* FORECAST TEXT LABEL */}
    <Marker
      position={center}
      icon={L.divIcon({
        className: "forecast-label",
        html: `<div style="color: white; font-weight: bold; text-shadow: 1px 1px 2px black; font-size: ${
          zoomLevel >= 8 ? "18px" : zoomLevel >= 6 ? "16px" : "14px"
        };">Blizzard Forecast<br/>3 Days</div>`,
        iconAnchor: [20, 80],
      })}
      interactive={false}
    />

    {/* PIN MARKER */}
    <Marker
      ref={markerRef}
      position={center}
      icon={customIcon(zoomLevel)}
      eventHandlers={{
        click: handlePinClick,
      }}
    />

    <DynamicEvents />
  </MapContainer>
);
