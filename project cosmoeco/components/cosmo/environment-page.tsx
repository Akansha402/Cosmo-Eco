'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Cloud, Wind } from 'lucide-react'
import { EmissionsChart } from './charts'
import { emissionData } from './data'
import { Panel, StatusPill } from './shared'

const regions = ['Global view', 'Europe', 'Pacific'] as const
const reentries = [
  { object: 'CZ-2C R/B', time: 'May 24 · 08:42 UTC', place: 'Pacific Ocean', level: 'MEDIUM' },
  { object: 'STARLINK-1862', time: 'May 26 · 14:18 UTC', place: 'South Atlantic', level: 'LOW' },
  { object: 'OBJECT 45219', time: 'May 28 · Window', place: 'Uncertain', level: 'WATCH' },
]
const regionCoordinates: Record<(typeof regions)[number], string> = { 'Global view': '32.6°N · 41.3°W', Europe: '48.9°N · 2.4°E', Pacific: '12.8°N · 156.2°W' }

export default function EnvironmentPage() {
  const [region, setRegion] = useState<(typeof regions)[number]>('Global view')
  const [timeIndex, setTimeIndex] = useState(3)
  const [period, setPeriod] = useState('Past 12 months')
  const visibleEmissions = useMemo(() => emissionData.slice(-(period === 'Past 3 months' ? 3 : period === 'Past 6 months' ? 6 : 12)), [period])
  const averageEmission = (visibleEmissions.reduce((sum, item) => sum + item.emissions, 0) / visibleEmissions.length).toFixed(1)
  const timeLabel = useMemo(() => `${String(11 + timeIndex).padStart(2, '0')}:${String((timeIndex * 10) % 60).padStart(2, '0')} UTC`, [timeIndex])
  return (
    <div className="page-stack">
      <div className="environment-grid">
        <Panel title="Earth observation" description="Atmospheric composite · Last 24 hours" className="earth-observation-panel" action={<label className="select-control"><span className="sr-only">Select region</span><select value={region} onChange={event => setRegion(event.target.value as (typeof regions)[number])}>{regions.map(item => <option key={item}>{item}</option>)}</select></label>}>
          <div className="environment-map">
            <div className="environment-grid-lines" />
            <div className="environment-earth"><div className="heat-zone heat-one" /><div className="heat-zone heat-two" /><div className="heat-zone heat-three" /></div>
            <div className="environment-pin"><span>RE-ENTRY 02</span><strong>ANOMALY</strong></div>
            <div className="environment-coordinates"><strong>{regionCoordinates[region]}</strong><small>ALT 84.2 KM · ILLUSTRATIVE</small></div>
            <StatusPill tone="amber">SAMPLE OBSERVATION</StatusPill>
          </div>
          <div className="time-scrubber"><button className="icon-button" type="button" aria-label="Move back ten minutes" onClick={() => setTimeIndex(value => Math.max(0, value - 1))}><ChevronLeft /></button><label><span>TIME WINDOW</span><input type="range" min="0" max="7" value={timeIndex} onChange={event => setTimeIndex(Number(event.target.value))} aria-label="Observation time window" /></label><strong>{timeLabel}</strong><button className="icon-button" type="button" aria-label="Move forward ten minutes" onClick={() => setTimeIndex(value => Math.min(7, value + 1))}><ChevronRight /></button></div>
        </Panel>

        <div className="environment-side-column">
          <div className="environment-metric-grid">
            <article className="environment-metric"><span>CO₂</span><small className="trend-up">+1.8%</small><strong>421.4 <small>ppm</small></strong><span>Global composite</span></article>
            <article className="environment-metric"><span>NOₓ</span><small className="trend-down">−0.4%</small><strong>18.2 <small>ppb</small></strong><span>Modeled indicator</span></article>
            <article className="environment-metric"><span>Aerosol</span><small className="trend-up">+3.1%</small><strong>0.14 <small>AOD</small></strong><span>Regional sample</span></article>
            <article className="environment-metric"><span>Ozone</span><small>STABLE</small><strong>293 <small>DU</small></strong><span>Modeled indicator</span></article>
          </div>
          <Panel title="Re-entry events" description="Projected next 7 days" action={<StatusPill tone="amber">4 EVENTS</StatusPill>} className="reentry-panel">
            <div className="reentry-list">{reentries.map(event => <article key={event.object}><span className={`event-dot event-${event.level.toLowerCase()}`} /><div><strong>{event.object}</strong><span>{event.time}</span><small>{event.place}</small></div><StatusPill tone={event.level === 'MEDIUM' ? 'amber' : event.level === 'WATCH' ? 'red' : 'cyan'}>{event.level}</StatusPill></article>)}</div>
          </Panel>
        </div>
      </div>

      <Panel title="Launch emissions trend" description="Modeled CO₂-equivalent · Illustrative index" className="emissions-panel" action={<label className="select-control"><span className="sr-only">Choose emissions period</span><select value={period} onChange={event => setPeriod(event.target.value)}><option>Past 12 months</option><option>Past 6 months</option><option>Past 3 months</option></select></label>}>
        <div className="emissions-chart-wrap"><EmissionsChart data={visibleEmissions} /></div>
        <div className="emissions-summary"><span><Cloud aria-hidden="true" />Modeled average<strong>{averageEmission} index</strong></span><span><Wind aria-hidden="true" />Change over period<strong className="trend-up">+6.2%</strong></span><span><span className="mini-sample-dot" />Source<strong>Illustrative composite</strong></span></div>
      </Panel>
      <p className="sample-footnote">Environmental indicators and re-entry windows are simulated sample values, not observations from live sensors.</p>
    </div>
  )
}
