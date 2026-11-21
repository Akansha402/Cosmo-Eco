'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AlertTriangle, ArrowRight, Globe2, Radio, Satellite, Zap } from 'lucide-react'
import { conjunctions, orbitalActivity } from './data'
import { MetricCard, OrbitalScene, OrbitLegend, Panel, ScoreGauge, StatusPill } from './shared'

export default function OverviewPage() {
  const [view, setView] = useState<'3D VIEW' | 'MAP'>('3D VIEW')
  return (
    <div className="page-stack">
      <section className="metric-grid" aria-label="Illustrative orbital metrics">
        <MetricCard label="Objects Tracked" value="47,360" note="Catalog sample" icon={Satellite} tone="cyan" />
        <MetricCard label="Active Satellites" value="9,842" note="+2.4% this month" icon={Radio} tone="green" />
        <MetricCard label="Estimated Debris" value="1.5M" note="Estimated objects" icon={AlertTriangle} tone="amber" />
        <MetricCard label="Close Approaches" value="12" note="3 require review" icon={Zap} tone="red" />
      </section>

      <div className="overview-grid">
        <Panel title="Orbital environment model" description="Illustrative object catalog · Not real-time tracking" className="orbit-panel" action={<div className="segmented-control" role="group" aria-label="Orbital model view">{(['3D VIEW', 'MAP'] as const).map(option => <button type="button" key={option} className={view === option ? 'is-selected' : ''} aria-pressed={view === option} onClick={() => setView(option)}>{option}</button>)}</div>}>
          <div className={`overview-orbit-wrap ${view === 'MAP' ? 'is-map-view' : ''}`}>
            <OrbitalScene variant="dashboard" />
            <OrbitLegend compact />
            <Link href="/orbit-tracker" className="orbit-open-button"><Globe2 aria-hidden="true" />Open full tracker</Link>
            {view === 'MAP' && <span className="map-view-label">ILLUSTRATIVE MAP VIEW</span>}
          </div>
        </Panel>

        <div className="overview-side-stack">
          <Panel title="Orbit sustainability" description="Prototype composite score" className="score-panel" action={<StatusPill tone="amber">MODERATE</StatusPill>}>
            <div className="score-panel-content"><ScoreGauge value={64} size={104} /><div><strong>Needs attention</strong><p>Down 2 points from last quarter</p><span className="mini-trend">↘ 2 pts</span></div></div>
            <Link className="panel-footer-link" href="/sustainability-score">View full assessment <ArrowRight aria-hidden="true" /></Link>
          </Panel>
          <Panel title="Close approach alerts" description="Next 72 hours" className="alerts-panel" action={<Link href="/orbit-tracker" className="text-link">View all</Link>}>
            <div className="alert-list">{conjunctions.map(alert => <Link className="alert-row" href="/orbit-tracker" key={alert.primary}>
              <StatusPill tone={alert.level === 'HIGH' ? 'red' : alert.level === 'MEDIUM' ? 'amber' : 'cyan'}>{alert.level}</StatusPill>
              <span className="alert-objects"><strong>{alert.primary}</strong><small>vs. {alert.secondary}</small></span><b>{alert.distance}</b>
            </Link>)}</div>
          </Panel>
        </div>
      </div>

      <Panel title="Recent orbital activity" description="Sample event stream · Illustrative data" className="activity-panel" action={<button className="button-quiet" type="button">All activity <span aria-hidden="true">⌄</span></button>}>
        <div className="activity-table" role="table" aria-label="Recent illustrative orbital activity">
          <div className="activity-row activity-head" role="row"><span>TIME · UTC</span><span>EVENT</span><span>OBJECT</span><span>DETAIL</span><span>VALUE</span></div>
          {orbitalActivity.map(event => <div className="activity-row" role="row" key={event.time}><span>{event.time}</span><StatusPill tone={event.type === 'CONJUNCTION' ? 'amber' : 'cyan'}>{event.type}</StatusPill><strong>{event.object}</strong><span>{event.detail}</span><b>{event.value}</b></div>)}
        </div>
      </Panel>
      <p className="sample-footnote">All values are illustrative prototype data and should not be used for operational decisions.</p>
    </div>
  )
}
