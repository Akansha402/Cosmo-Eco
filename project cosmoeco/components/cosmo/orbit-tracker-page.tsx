'use client'

import { useMemo, useState } from 'react'
import { Layers, Minus, Plus, RotateCcw, Search, Satellite, X } from 'lucide-react'
import { orbitObjects, type OrbitObject } from './data'
import { OrbitalScene, Panel, StatusPill } from './shared'

export default function OrbitTrackerPage() {
  const [query, setQuery] = useState('')
  const [orbitFilter, setOrbitFilter] = useState('All orbits')
  const [typeFilter, setTypeFilter] = useState('All objects')
  const [layersVisible, setLayersVisible] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [selectedId, setSelectedId] = useState('S2B')
  const filtered = useMemo(() => orbitObjects.filter(object => {
    const matchesText = `${object.name} ${object.type} ${object.orbit}`.toLowerCase().includes(query.toLowerCase())
    const matchesOrbit = orbitFilter === 'All orbits' || object.orbit === orbitFilter
    const matchesType = typeFilter === 'All objects' || object.type === typeFilter
    return matchesText && matchesOrbit && matchesType
  }), [query, orbitFilter, typeFilter])
  const selected: OrbitObject | undefined = selectedId === 'none' ? undefined : filtered.find(object => object.id === selectedId) ?? filtered[0]

  return (
    <div className="page-stack">
      <div className="tracker-toolbar">
        <label className="tracker-search"><Search aria-hidden="true" /><span className="sr-only">Search sample catalog</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by object name or type" /></label>
        <label className="filter-field"><span>ORBIT TYPE</span><select value={orbitFilter} onChange={event => setOrbitFilter(event.target.value)}><option>All orbits</option><option>LEO</option><option>MEO</option><option>GEO</option></select></label>
        <label className="filter-field"><span>OBJECT TYPE</span><select value={typeFilter} onChange={event => setTypeFilter(event.target.value)}><option>All objects</option><option>Satellite</option><option>Debris</option><option>Rocket body</option></select></label>
        <button className={`button-quiet layer-toggle ${layersVisible ? 'is-on' : ''}`} type="button" aria-pressed={layersVisible} onClick={() => setLayersVisible(value => !value)}><Layers aria-hidden="true" />Layers {layersVisible ? 'on' : 'off'}</button>
      </div>

      <div className="tracker-layout">
        <div className="tracker-main-column">
          <Panel title="Orbital object catalog" description="Illustrative object catalog · Not real-time tracking" action={<StatusPill tone="cyan">{filtered.length} SAMPLE {filtered.length === 1 ? 'OBJECT' : 'OBJECTS'}</StatusPill>} className="tracker-map-panel" bodyClassName="tracker-map-body">
            <div className={`tracker-orbit-stage zoom-${zoom} ${layersVisible ? '' : 'layers-muted'}`}>
              <div className="orbit-scale"><span>2,000 km</span><span>1,500</span><span>1,000</span><span>500</span><span>160 km</span></div>
              <OrbitalScene variant="tracker" showLabels={layersVisible && !query.trim() && orbitFilter === 'All orbits' && typeFilter === 'All objects'} />
              <div className="tracker-map-controls">
                <button type="button" aria-label="Zoom in" onClick={() => setZoom(value => Math.min(3, value + 1))}><Plus /></button>
                <button type="button" aria-label="Zoom out" onClick={() => setZoom(value => Math.max(1, value - 1))}><Minus /></button>
                <button type="button" aria-label="Reset zoom" onClick={() => setZoom(1)}><RotateCcw /></button>
              </div>
              <div className="tracker-map-legend"><span><i className="legend-dot dot-cyan" />Satellites</span><span><i className="legend-dot dot-amber" />Debris</span><span><i className="legend-dot dot-red" />Alerts</span></div>
              <span className="zoom-indicator">{zoom}×</span>
            </div>
          </Panel>
          <Panel title={`Filtered catalog`} description={`${filtered.length} illustrative ${filtered.length === 1 ? 'record matches' : 'records match'} the current filters`} className="catalog-panel">
            {filtered.length ? <div className="catalog-list" role="list">{filtered.map(object => <button type="button" role="listitem" className={`catalog-row ${selected?.id === object.id ? 'is-selected' : ''}`} key={object.id} onClick={() => setSelectedId(object.id)}>
              <span className={`catalog-object-icon ${object.type === 'Debris' ? 'object-debris' : ''}`}><Satellite aria-hidden="true" /></span>
              <span className="catalog-object-name"><strong>{object.name}</strong><small>{object.type} · {object.orbit}</small></span>
              <span className="catalog-altitude">{object.altitude.toLocaleString()} km</span>
              <StatusPill tone={object.risk === 'High' ? 'red' : object.risk === 'Medium' ? 'amber' : 'green'}>{object.risk}</StatusPill>
            </button>)}</div> : <div className="empty-state"><Search aria-hidden="true" /><strong>No sample objects found</strong><span>Try a different name or filter.</span><button type="button" onClick={() => { setQuery(''); setOrbitFilter('All orbits'); setTypeFilter('All objects') }}>Clear filters</button></div>}
          </Panel>
        </div>

        <aside className="tracker-detail-column" aria-label="Selected catalog object">
          {selected ? <Panel className="object-detail-panel">
            <div className="detail-heading"><span className="detail-type">{selected.type.toUpperCase()}</span><button className="icon-button" type="button" aria-label="Clear selected object" onClick={() => setSelectedId('none')}><X /></button></div>
            <h2>{selected.name}</h2><p className="detail-subtitle">{selected.orbit} · SAMPLE OBJECT</p>
            <dl className="object-stats"><div><dt>Operator</dt><dd>{selected.operator}</dd></div><div><dt>Altitude</dt><dd>{selected.altitude.toFixed(selected.altitude % 1 ? 1 : 0)} km</dd></div><div><dt>Velocity</dt><dd>{selected.velocity.toFixed(2)} km/s</dd></div><div><dt>Inclination</dt><dd>{selected.inclination.toFixed(2)}°</dd></div><div><dt>Period</dt><dd>{selected.period.toFixed(1)} min</dd></div></dl>
            <div className="altitude-profile"><div><strong>Altitude profile</strong><span>LAST 24 HOURS</span></div><svg viewBox="0 0 280 64" preserveAspectRatio="none" aria-label="Illustrative altitude profile"><path d="M0 48 C25 44 31 39 55 42 S88 49 108 35 S143 31 162 36 S190 22 213 28 S246 18 280 12" fill="none" stroke="var(--cyan)" strokeWidth="2" /><path d="M0 48 C25 44 31 39 55 42 S88 49 108 35 S143 31 162 36 S190 22 213 28 S246 18 280 12 L280 64 L0 64Z" fill="url(#altitudeFill)" /><defs><linearGradient id="altitudeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--cyan)" stopOpacity=".22" /><stop offset="1" stopColor="var(--cyan)" stopOpacity="0" /></linearGradient></defs></svg></div>
            <div className="next-pass-card"><span>NEXT PASS OVER STATION</span><strong>01:42:18</strong><small>47° max elevation · sample estimate</small></div>
            <button className="button-secondary button-full" type="button" onClick={() => setQuery(selected.name)}>View object analysis <span aria-hidden="true">↗</span></button>
          </Panel> : <Panel className="object-detail-panel"><div className="empty-state"><Satellite aria-hidden="true" /><strong>Select an object</strong><span>Choose an illustrative catalog row to inspect it.</span></div></Panel>}
        </aside>
      </div>
      <p className="sample-footnote">Orbital paths, object positions, and conjunction distances are illustrative and do not represent live tracking.</p>
    </div>
  )
}
