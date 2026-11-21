'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { ArrowRight, Orbit } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn('brand-mark', className)} aria-hidden="true">
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="4.2" fill="currentColor" />
        <ellipse cx="20" cy="20" rx="17" ry="7.5" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="20" cy="20" rx="17" ry="7.5" stroke="currentColor" strokeWidth="1" transform="rotate(58 20 20)" />
        <ellipse cx="20" cy="20" rx="17" ry="7.5" stroke="currentColor" strokeWidth="1" transform="rotate(-58 20 20)" />
      </svg>
    </span>
  )
}

export function BrandName({ compact = false }: { compact?: boolean }) {
  return (
    <span className={cn('brand-name', compact && 'brand-name-compact')}>
      <BrandMark />
      <span>COSMO <strong>ECO</strong></span>
    </span>
  )
}

export function SampleBadge({ subtle = false }: { subtle?: boolean }) {
  return <span className={cn('sample-badge', subtle && 'sample-badge-subtle')}><span /> SAMPLE DATA</span>
}

export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow page-kicker">ASTRA 2026 <span>·</span> COSMO ECO</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      <div className="page-header-actions"><SampleBadge />{action}</div>
    </header>
  )
}

export function Panel({ title, description, action, children, className, bodyClassName, titleTag = 'h2' }: {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
  titleTag?: 'h2' | 'h3'
}) {
  const Title = titleTag
  return (
    <section className={cn('panel', className)}>
      {(title || description || action) && (
        <div className="panel-heading">
          <div>{title && <Title>{title}</Title>}{description && <p>{description}</p>}</div>
          {action && <div className="panel-action">{action}</div>}
        </div>
      )}
      <div className={cn('panel-body', bodyClassName)}>{children}</div>
    </section>
  )
}

export function MetricCard({ label, value, note, icon: Icon, tone = 'cyan', trend }: {
  label: string
  value: string
  note: string
  icon: typeof Orbit
  tone?: 'cyan' | 'green' | 'amber' | 'red'
  trend?: string
}) {
  return (
    <article className={cn('metric-card', `tone-${tone}`)}>
      <div className="metric-card-top">
        <span className="metric-icon"><Icon aria-hidden="true" /></span>
        <div className="metric-label-wrap"><span className="metric-label">{label}</span><span className="micro-label">ILLUSTRATIVE</span></div>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-card-foot"><span>{note}</span>{trend && <TinySparkline tone={tone} />}</div>
    </article>
  )
}

export function TinySparkline({ tone = 'cyan' }: { tone?: 'cyan' | 'green' | 'amber' | 'red' }) {
  const points = tone === 'red' ? '2,9 10,5 17,11 24,7 31,14 38,10 45,16 52,13 60,18' : '2,17 10,14 17,16 25,10 33,13 40,7 48,10 55,4 62,7'
  return (
    <svg className={cn('sparkline', `tone-${tone}`)} viewBox="0 0 64 24" aria-hidden="true">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="62" cy={tone === 'red' ? '18' : '7'} r="1.8" fill="currentColor" />
    </svg>
  )
}

export function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'cyan' | 'green' | 'amber' | 'red' }) {
  return <span className={cn('status-pill', `status-${tone}`)}>{children}</span>
}

export function ScoreGauge({ value, size = 112, label }: { value: number; size?: number; label?: string }) {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  return (
    <div className="score-gauge" style={{ width: size, height: size }} aria-label={`${value} out of 100${label ? `, ${label}` : ''}`} role="img">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r={radius} className="gauge-track" />
        <circle cx="50" cy="50" r={radius} className="gauge-value" style={{ strokeDasharray: circumference, strokeDashoffset: circumference * (1 - value / 100) }} />
      </svg>
      <span className="gauge-number">{value}<small>/100</small></span>
    </div>
  )
}

const stars = [
  ['12%', '22%', 'cyan'], ['25%', '63%', 'teal'], ['38%', '15%', 'amber'], ['58%', '25%', 'cyan'],
  ['72%', '13%', 'teal'], ['83%', '52%', 'cyan'], ['20%', '80%', 'cyan'], ['91%', '35%', 'teal'],
  ['66%', '76%', 'amber'], ['43%', '88%', 'cyan'], ['6%', '48%', 'teal'], ['77%', '87%', 'cyan'],
]

export function OrbitalScene({ variant = 'dashboard', showLabels = true, className }: { variant?: 'hero' | 'dashboard' | 'tracker' | 'environment'; showLabels?: boolean; className?: string }) {
  return (
    <div className={cn('orbital-scene', `orbital-${variant}`, className)}>
      <div className="orbit-glow" />
      <span className="orbit-line orbit-line-a" />
      <span className="orbit-line orbit-line-b" />
      <span className="orbit-line orbit-line-c" />
      <span className="orbit-line orbit-line-d" />
      {stars.map(([left, top, color], index) => <span key={index} className={cn('orbit-star', `star-${color}`)} style={{ left, top }} />)}
      <div className="earth-wrap"><Image src="/cosmo-earth.png" alt="Earth viewed from orbit" width={1024} height={1024} priority={variant === 'hero'} /></div>
      {showLabels && <>
        <div className="orbit-callout callout-cosmos"><span>COSMOS 2251</span><small>785 km · LEO</small></div>
        <div className="orbit-callout callout-sentinel"><span>SENTINEL-2B</span><small>702 km · Sun-sync</small></div>
      </>}
      {variant === 'hero' && <>
        <div className="orbit-float-card hero-catalog"><small>CATALOG OBJECTS · SAMPLE</small><strong>47,360</strong><span>Illustrative count</span></div>
        <div className="orbit-float-card hero-score"><small>PROTOTYPE SCORE</small><strong>64<small>/100</small></strong><span className="score-tag">MODERATE</span></div>
      </>}
    </div>
  )
}

export function OrbitLegend({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('orbit-legend', compact && 'orbit-legend-compact')}>
      <span><i className="legend-dot dot-cyan" />Catalog objects <strong>47,360</strong></span>
      <span><i className="legend-dot dot-amber" />Est. debris <strong>1.5M</strong></span>
      <span><i className="legend-dot dot-red" />Sample alerts <strong>12</strong></span>
    </div>
  )
}

export function ArrowLink({ children }: { children: ReactNode }) {
  return <span className="arrow-link">{children}<ArrowRight aria-hidden="true" /></span>
}
