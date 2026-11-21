import Image from 'next/image'
import Link from 'next/link'
import { Activity, ArrowRight, Globe2, Orbit, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { BrandName, SampleBadge } from './shared'

const capabilities = [
  { number: '01', title: 'Orbital Intelligence', copy: 'Track active spacecraft, debris, and close approaches across operational orbits.', icon: Orbit, href: '/orbit-tracker' },
  { number: '02', title: 'Sustainability Scoring', copy: 'Measure mission impact across seven science-based sustainability factors.', icon: ShieldCheck, href: '/sustainability-score' },
  { number: '03', title: 'Scenario Simulation', copy: 'Model fleet growth, disposal compliance, and debris-removal strategies.', icon: SlidersHorizontal, href: '/what-if-simulator' },
  { number: '04', title: 'Environmental Context', copy: 'Connect orbital activity with atmospheric and Earth-observation intelligence.', icon: Globe2, href: '/environmental-intelligence' },
]

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link href="/" aria-label="Cosmo Eco home"><BrandName /></Link>
        <nav className="landing-nav" aria-label="Main navigation">
          <Link className="active" href="/">Home</Link>
          <Link href="/orbit-tracker">Orbit Tracker</Link>
          <Link href="/sustainability-score">Sustainability</Link>
          <Link href="/what-if-simulator">Simulator</Link>
          <Link href="/environmental-intelligence">Intelligence</Link>
        </nav>
        <Link className="button-primary header-cta" href="/overview">Explore Dashboard <ArrowRight aria-hidden="true" /></Link>
      </header>

      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span />ASTRA 2026 · TEAM ROCKET</p>
          <h1 id="hero-title">Earth&apos;s orbit<br />is not <em>infinite.</em></h1>
          <p className="hero-description">Understand orbital congestion. Measure sustainability.<br className="desktop-break" /> Protect the future of space.</p>
          <div className="hero-actions">
            <Link className="button-primary" href="/overview">Explore Dashboard <ArrowRight aria-hidden="true" /></Link>
            <Link className="button-secondary" href="/orbit-tracker"><Orbit aria-hidden="true" />Track the Orbit</Link>
          </div>
          <div className="hero-model-note"><span>MODELING</span><span>LEO</span><span>MEO</span><span>GEO</span><i /><small>Sample catalog · Not real-time</small></div>
        </div>
        <div className="hero-art" aria-label="Illustration of Earth and orbital paths">
          <div className="hero-orbit-rings"><i /><i /><i /></div>
          <Image className="hero-earth" src="/cosmo-earth.png" alt="Earth viewed from orbit" width={1024} height={1024} priority />
          <div className="hero-orbit-label label-top"><span>COSMOS 2251</span><small>785 km · LEO</small></div>
          <div className="hero-orbit-label label-bottom"><span>SENTINEL-2B</span><small>702 km · Sun-sync</small></div>
          <div className="hero-count-card"><small>CATALOG OBJECTS · SAMPLE</small><strong>47,360</strong><span>Illustrative count</span></div>
          <div className="hero-score-card"><small>PROTOTYPE SCORE</small><strong>64<small>/100</small></strong><span>MODERATE</span></div>
          <span className="hero-star star-a" /><span className="hero-star star-b" /><span className="hero-star star-c" />
        </div>
      </section>

      <section className="landing-stats" aria-label="Illustrative platform metrics">
        <article><span>CATALOG OBJECTS · SAMPLE</span><strong>47,360</strong><small>Illustrative dataset</small></article>
        <article><span>ESTIMATED DEBRIS</span><strong>1.5M</strong><small>Modeled estimate</small></article>
        <article><span>SAMPLE CONJUNCTIONS</span><strong>1,247</strong><small>12 flagged for review</small></article>
        <article><span>PROTOTYPE SCORE</span><strong>64</strong><small>Seven-factor model</small></article>
      </section>

      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <div className="capabilities-intro">
          <div>
            <p className="eyebrow">ONE PLANET. ONE ORBIT.</p>
            <h2 id="capabilities-title">Intelligence for a<br /><em>sustainable space future.</em></h2>
          </div>
          <p>From orbital awareness to environmental impact, COSMO ECO brings mission-critical intelligence into one unified platform.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map(({ number, title, copy, icon: Icon, href }) => (
            <Link className="capability-card" href={href} key={number}>
              <div className="capability-top"><span>{number}</span><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <span className="capability-link">Explore capability <ArrowRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
        <div className="landing-bottom-note"><SampleBadge subtle /><p>Designed for mission planning and sustainability analysis. All values shown are illustrative and not operational data.</p><span><Activity aria-hidden="true" />ASTRA 2026</span></div>
      </section>
    </main>
  )
}
