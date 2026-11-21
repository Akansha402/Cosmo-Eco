import DashboardShell from '@/components/cosmo/dashboard-shell'
import SimulatorPage from '@/components/cosmo/simulator-page'

export default function SimulatorRoute() {
  return <DashboardShell active="what-if-simulator"><SimulatorPage /></DashboardShell>
}
