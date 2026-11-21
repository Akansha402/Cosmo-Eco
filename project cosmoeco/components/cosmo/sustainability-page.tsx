'use client'

import { useState } from 'react'
import { ArrowRight, Info } from 'lucide-react'
import { sustainabilityFactors } from './data'
import { SustainabilityRadar } from './charts'
import { Panel, ScoreGauge, StatusPill } from './shared'

export default function SustainabilityPage() {
  const [selectedFactor, setSelectedFactor] = useState(sustainabilityFactors[0])
  const [methodologyOpen, setMethodologyOpen] = useState(false)
  return (
    <div className="page-stack">
      <div className="sustainability-top-grid">
        <Panel title="Global sustainability score" description="Composite index · Q2 2026" className="global-score-panel" action={<StatusPill tone="amber">MODERATE</StatusPill>}>
          <div className="global-score-content"><ScoreGauge value={64} size={160} /><div className="global-score-copy"><h3>Orbital ecosystem requires attention</h3><p>Disposal compliance and increasing debris density are the largest modeled constraints on long-term orbital access.</p><div className="score-range"><span>CRITICAL</span><div><i /></div><span>RESILIENT</span></div></div></div>
          <div className="score-period"><span>−2 pts from previous quarter</span><span>Illustrative composite score</span></div>
        </Panel>
        <Panel title="Factor performance" description="Seven-factor assessment" className="factor-chart-panel" action={<button className="text-link" type="button" onClick={() => setMethodologyOpen(true)}>Methodology <Info aria-hidden="true" /></button>}>
          <SustainabilityRadar />
          <div className="factor-chart-legend"><span><i className="legend-dot dot-cyan" />Current profile</span><span><i className="legend-dot dot-amber" />Target band</span></div>
        </Panel>
      </div>

      <section className="factor-section" aria-labelledby="factor-heading">
        <div className="section-heading"><div><p className="eyebrow">SEVEN-FACTOR ASSESSMENT</p><h2 id="factor-heading">Performance breakdown</h2></div><span>Q2 2026 · SAMPLE</span></div>
        <div className="factor-grid">{sustainabilityFactors.map((factor, index) => <button type="button" key={factor.label} className={`factor-card ${selectedFactor.label === factor.label ? 'is-selected' : ''}`} onClick={() => setSelectedFactor(factor)} aria-pressed={selectedFactor.label === factor.label}>
          <div className="factor-card-top"><span>0{index + 1}</span><StatusPill tone={factor.status === 'AT RISK' ? 'red' : factor.status === 'WATCH' ? 'amber' : factor.status === 'STRONG' ? 'green' : 'cyan'}>{factor.status}</StatusPill></div>
          <h3>{factor.label}</h3><div className="factor-score-line"><strong>{factor.score}<small>/100</small></strong><div className="progress-track"><i style={{ width: `${factor.score}%` }} /></div></div><p>{factor.detail}</p>
        </button>)}</div>
      </section>

      <Panel className="factor-detail-panel">
        <div className="factor-detail-content"><div><p className="eyebrow">SELECTED FACTOR</p><h2>{selectedFactor.label}</h2><p>{selectedFactor.detail}</p></div><div className="factor-detail-score"><span>PROTOTYPE SCORE</span><strong>{selectedFactor.score}<small>/100</small></strong></div><button className="button-quiet" type="button" onClick={() => setMethodologyOpen(true)}>View scoring methodology <ArrowRight aria-hidden="true" /></button></div>
      </Panel>
      <p className="sample-footnote">The COSMO ECO score is a prototype model using illustrative values and is not an official sustainability certification.</p>

      {methodologyOpen && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setMethodologyOpen(false) }}><section className="methodology-modal" role="dialog" aria-modal="true" aria-labelledby="methodology-title"><button className="modal-close icon-button" type="button" onClick={() => setMethodologyOpen(false)} aria-label="Close methodology"><span aria-hidden="true">×</span></button><p className="eyebrow">SCORING FRAMEWORK</p><h2 id="methodology-title">Seven signals. One orbital picture.</h2><p>This prototype combines debris risk, collision risk, disposal planning, fuel efficiency, launch impact, re-entry impact, and repairability into a single illustrative index.</p><ul>{sustainabilityFactors.map(factor => <li key={factor.label}><span>{factor.label}</span><strong>{factor.score}/100</strong></li>)}</ul><p className="modal-note">Scores are examples for interface demonstration only and are not based on a live catalog.</p><button type="button" className="button-primary" onClick={() => setMethodologyOpen(false)}>Back to assessment <ArrowRight aria-hidden="true" /></button></section></div>}
    </div>
  )
}
