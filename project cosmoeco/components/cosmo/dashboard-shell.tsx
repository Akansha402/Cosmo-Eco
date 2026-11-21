'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, ChevronRight, CircleHelp, Globe2, LayoutDashboard, Menu, Orbit, Search, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { BrandName, SampleBadge } from './shared'

export type DashboardRoute = 'overview' | 'orbit-tracker' | 'sustainability-score' | 'what-if-simulator' | 'environmental-intelligence'

const navigation: { id: DashboardRoute; href: string; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', href: '/overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orbit-tracker', href: '/orbit-tracker', label: 'Orbit Tracker', icon: Orbit },
  { id: 'sustainability-score', href: '/sustainability-score', label: 'Sustainability Score', icon: ShieldCheck },
  { id: 'what-if-simulator', href: '/what-if-simulator', label: 'What-if Simulator', icon: SlidersHorizontal },
  { id: 'environmental-intelligence', href: '/environmental-intelligence', label: 'Environmental Intelligence', icon: Globe2 },
]

const pageCopy: Record<DashboardRoute, { title: string; description: string }> = {
  overview: { title: 'Space Intelligence', description: 'Prototype orbital awareness and sustainability monitoring' },
  'orbit-tracker': { title: 'Orbit Tracker', description: 'Explore an illustrative catalog of objects in orbit' },
  'sustainability-score': { title: 'Space Sustainability', description: 'A science-based view of orbital responsibility' },
  'what-if-simulator': { title: 'What-if Simulator', description: 'Model decisions before they become orbital reality' },
  'environmental-intelligence': { title: 'Environmental Intelligence', description: 'Connect orbital activity with Earth’s changing systems' },
}

export default function DashboardShell({ active, children }: { active: DashboardRoute; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const pathname = usePathname()
  const current = pageCopy[active]
  const filteredNavigation = navigation.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Link className="sidebar-brand" href="/" aria-label="Return to COSMO ECO home"><BrandName /></Link>
        <Link className="workspace-switcher" href="/overview">
          <span className="workspace-avatar">CE</span><span><strong>Cosmo Command</strong><small>Global workspace</small></span><ChevronRight aria-hidden="true" />
        </Link>
        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {navigation.map(({ id, href, label, icon: Icon }) => (
            <Link key={id} href={href} aria-current={pathname === href ? 'page' : undefined} className={`sidebar-link ${active === id ? 'is-active' : ''}`}>
              <Icon aria-hidden="true" /><span>{label}</span>{active === id && <i />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="system-status"><span className="status-light" /><div><strong>Prototype ready</strong><small>Illustrative dataset loaded</small></div></div>
          <div className="profile-row"><span className="profile-avatar">AK</span><span><strong>Alex Kim</strong><small>Mission Analyst</small></span><button className="profile-more" type="button" aria-label="More profile options">•••</button></div>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="mobile-nav-toggle icon-button" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(value => !value)}>{mobileOpen ? <X /> : <Menu />}</button>
          <div className="topbar-title"><h1>{current.title}</h1><p>{current.description}</p></div>
          <div className="topbar-actions">
            <SampleBadge />
            <button className="icon-button" type="button" aria-label="Search the workspace" aria-expanded={searchOpen} onClick={() => { setSearchOpen(value => !value); setNotificationsOpen(false) }}><Search /></button>
            <button className="icon-button notification-button" type="button" aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen(value => !value); setSearchOpen(false) }}><Bell /><i /></button>
            <span className="topbar-separator" /><span className="mission-label">ASTRA 2026</span><span className="profile-avatar topbar-avatar">AK</span>
          </div>
          {searchOpen && <div className="topbar-popover search-popover"><label htmlFor="workspace-search">Search sections</label><div className="search-field"><Search aria-hidden="true" /><input id="workspace-search" autoFocus value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Find a workspace section" /></div><div className="search-results">{filteredNavigation.length ? filteredNavigation.map(item => <Link href={item.href} key={item.id} onClick={() => setSearchOpen(false)}>{item.label}<ChevronRight aria-hidden="true" /></Link>) : <p>No matching sections</p>}</div></div>}
          {notificationsOpen && <div className="topbar-popover notification-popover"><div className="popover-title"><strong>Sample alerts</strong><span>3 items</span></div><Link href="/orbit-tracker" onClick={() => setNotificationsOpen(false)}><span className="alert-marker marker-red" /><span><strong>Close approach flagged</strong><small>STARLINK-3286 · 148 m · illustrative</small></span><ChevronRight /></Link><Link href="/sustainability-score" onClick={() => setNotificationsOpen(false)}><span className="alert-marker marker-amber" /><span><strong>Disposal score needs review</strong><small>Prototype score · 45 / 100</small></span><ChevronRight /></Link></div>}
        </header>

        {mobileOpen && <nav className="mobile-navigation" aria-label="Mobile dashboard navigation">{navigation.map(({ id, href, label, icon: Icon }) => <Link key={id} href={href} aria-current={active === id ? 'page' : undefined} onClick={() => setMobileOpen(false)}><Icon aria-hidden="true" />{label}<ChevronRight aria-hidden="true" /></Link>)}<Link href="/" onClick={() => setMobileOpen(false)}><CircleHelp aria-hidden="true" />About COSMO ECO<ChevronRight aria-hidden="true" /></Link></nav>}
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  )
}
