import DashboardShell from '@/components/cosmo/dashboard-shell'
import SustainabilityPage from '@/components/cosmo/sustainability-page'

export default function SustainabilityRoute() {
  return <DashboardShell active="sustainability-score"><SustainabilityPage /></DashboardShell>
}
