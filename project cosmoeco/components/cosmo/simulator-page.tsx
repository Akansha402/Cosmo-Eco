'use client'

import { useMemo, useState } from 'react'
import { Play, RotateCcw, TrendingDown, TrendingUp } from 'lucide-react'
import { ProjectionChart } from './charts'
import { Panel, StatusPill } from './shared'

type Scenario = 'Highest risk' | 'Largest mass' | 'Random'

export default function SimulatorPage() {
  const [fleetGrowth, setFleetGrowth] = useState(45)
  const [compliance, setCompliance] = useState(72)
  const [lifetime, setLifetime] = useState(8)
  const [removal, setRemoval] = useState(5)
  const [strategy, setStrategy] = useState<Scenario>('Highest risk')
  const [hasRun, setHasRun] = useState(false)
  const scenarioScore = useMemo(() => Math.max(30, Math.min(96, Math.round(51.2 + compliance * 0.24 + removal * 0.4 - fleetGrowth * 0.1 + (8 - lifetime) * 0.2 + (strategy === 'Highest risk' ? 0 : strategy === 'Largest mass' ? 2 : -3)))), [compliance, fleetGrowth, lifetime, removal, strategy])

  function resetScenario() {
    setFleetGrowth(45)
    setCompliance(72)
    setLifetime(8)
    setRemoval(5)
    setStrategy('Highest risk')
    setHasRun(false)
  }

  return (
    <div className="page-stack">
      <div className="simulator-grid">
        <Panel title="Scenario controls" description="Adjust assumptions to project through 2045" className="scenario-panel" action={<button className="text-link" type="button" onClick={resetScenario}><RotateCcw aria-hidden="true" />Reset</button>}>
          <div className="scenario-controls">
            <label className="range-control"><span><span>Satellite fleet growth</span><strong>{fleetGrowth}% <small>/ year</small></strong></span><input type="range" min="0" max="100" value={fleetGrowth} onChange={event => { setFleetGrowth(Number(event.target.value)); setHasRun(false) }} aria-label="Satellite fleet growth" aria-valuetext={`${fleetGrowth} percent per year`} /><span className="range-labels"><small>0%</small><small>100%</small></span></label>
            <label className="range-control"><span><span>Disposal compliance</span><strong>{compliance}%</strong></span><input type="range" min="20" max="100" value={compliance} onChange={event => { setCompliance(Number(event.target.value)); setHasRun(false) }} aria-label="Disposal compliance" aria-valuetext={`${compliance} percent`} /><span className="range-labels"><small>20%</small><small>100%</small></span></label>
            <label className="range-control"><span><span>Average mission lifetime</span><strong>{lifetime} <small>years</small></strong></span><input type="range" min="2" max="20" value={lifetime} onChange={event => { setLifetime(Number(event.target.value)); setHasRun(false) }} aria-label="Average mission lifetime" aria-valuetext={`${lifetime} years`} /><span className="range-labels"><small>2 yr</small><small>20 yr</small></span></label>
            <label className="range-control"><span><span>Active debris removal</span><strong>{removal} <small>objects / year</small></strong></span><input type="range" min="0" max="20" value={removal} onChange={event => { setRemoval(Number(event.target.value)); setHasRun(false) }} aria-label="Active debris removal" aria-valuetext={`${removal} objects per year`} /><span className="range-labels"><small>None</small><small>20 / yr</small></span></label>
          </div>
          <fieldset className="strategy-select"><legend>Debris removal strategy</legend><div className="segmented-control strategy-options">{(['Highest risk', 'Largest mass', 'Random'] as const).map(option => <button type="button" key={option} className={strategy === option ? 'is-selected' : ''} aria-pressed={strategy === option} onClick={() => { setStrategy(option); setHasRun(false) }}>{option}</button>)}</div></fieldset>
          <button className="button-primary run-simulation" type="button" onClick={() => setHasRun(true)}><Play aria-hidden="true" fill="currentColor" />{hasRun ? 'Re-run simulation' : 'Run simulation'} <span>PROJECT 20 YEARS</span></button>
          <p className="form-note">A simplified scenario model for interface demonstration only.</p>
        </Panel>

        <div className="simulation-results">
          <Panel title="Projected orbital sustainability" description="Global composite index in 2045" className="projection-score-panel" action={<StatusPill tone={hasRun ? 'green' : 'cyan'}>{hasRun ? 'SCENARIO RUN' : 'READY'}</StatusPill>}>
            <div className="projection-score-row"><div className="projection-stat"><span>CURRENT TRAJECTORY</span><strong>49</strong><small>High risk</small></div><div className="projection-delta"><span>SCENARIO CHANGE</span><strong>+{Math.max(0, scenarioScore - 49)}</strong></div><div className="projection-stat improved"><span>IMPROVED SCENARIO</span><strong>{scenarioScore}</strong><small>{scenarioScore >= 70 ? 'Resilient' : scenarioScore >= 60 ? 'Moderate' : 'Watch'}</small></div></div>
            {hasRun && <p className="simulation-confirmation">Updated using {strategy.toLowerCase()} removal and your current assumptions.</p>}
          </Panel>
          <Panel title="Orbital object projection" description="2025–2045 · Illustrative model" className="projection-chart-panel" action={<div className="chart-key"><span><i className="key-line key-baseline" />Baseline</span><span><i className="key-line key-scenario" />Scenario</span></div>}>
            <ProjectionChart scenarioScore={scenarioScore} fleetGrowth={fleetGrowth} compliance={compliance} />
            <div className="projection-outcomes"><div><span>DEBRIS OBJECTS</span><strong>−38%</strong><small>vs. baseline</small></div><div><span>COLLISION RISK</span><strong>−52%</strong><small>vs. baseline</small></div><div><span>ORBITAL LIFETIME</span><strong>+17 yr</strong><small>capacity horizon</small></div></div>
          </Panel>
        </div>
      </div>
      <div className="scenario-insight"><div className="insight-icon"><TrendingDown aria-hidden="true" /></div><div><strong>{hasRun ? 'Scenario updated' : 'A stronger disposal plan can shift the curve'}</strong><p>In this illustrative model, increasing post-mission compliance and targeted removal improves the long-term sustainability index.</p></div><span><TrendingUp aria-hidden="true" />+17 points</span></div>
      <p className="sample-footnote">Simulation outputs are illustrative, deterministic examples and are not operational forecasts.</p>
    </div>
  )
}
