'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { projectionYears, sustainabilityFactors } from './data'

export function SustainabilityRadar() {
  return (
    <ChartContainer
      config={{ score: { label: 'Factor score', color: 'var(--chart-1)' } }}
      className="data-chart radar-chart"
    >
      <RadarChart data={sustainabilityFactors} outerRadius="72%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="short" tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} />
        <Radar dataKey="score" stroke="var(--color-score)" fill="var(--color-score)" fillOpacity={0.2} strokeWidth={2} isAnimationActive={false} />
        <Tooltip content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

export function ProjectionChart({ scenarioScore, fleetGrowth, compliance }: { scenarioScore: number; fleetGrowth: number; compliance: number }) {
  const baseline = [14, 22, 35, 51, 72]
  const reduction = Math.max(0.22, Math.min(0.75, compliance / 150 + 0.1 - fleetGrowth / 350))
  const data = projectionYears.map((year, index) => ({
    year,
    baseline: baseline[index],
    scenario: Math.round(baseline[index] * (1 - reduction) + index * 3 + (100 - scenarioScore) / 30),
  }))

  return (
    <ChartContainer
      config={{ baseline: { label: 'Current trajectory', color: 'var(--chart-4)' }, scenario: { label: 'Improved scenario', color: 'var(--chart-2)' } }}
      className="data-chart projection-chart"
    >
      <AreaChart data={data} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="scenarioFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-scenario)" stopOpacity={0.22} /><stop offset="95%" stopColor="var(--color-scenario)" stopOpacity={0} /></linearGradient>
          <linearGradient id="baselineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-baseline)" stopOpacity={0.12} /><stop offset="95%" stopColor="var(--color-baseline)" stopOpacity={0} /></linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<ChartTooltipContent />} />
        <Area dataKey="baseline" type="monotone" stroke="var(--color-baseline)" fill="url(#baselineFill)" strokeWidth={1.5} isAnimationActive={false} />
        <Area dataKey="scenario" type="monotone" stroke="var(--color-scenario)" fill="url(#scenarioFill)" strokeWidth={2} isAnimationActive={false} />
      </AreaChart>
    </ChartContainer>
  )
}

export function EmissionsChart({ data }: { data: { month: string; emissions: number }[] }) {
  return (
    <ChartContainer
      config={{ emissions: { label: 'Modeled CO₂e index', color: 'var(--chart-1)' } }}
      className="data-chart emission-chart"
    >
      <BarChart data={data} margin={{ top: 12, right: 4, left: -24, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="emissions" fill="var(--color-emissions)" radius={[3, 3, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  )
}

export function ActivitySparkChart() {
  const data = [{ name: '01', value: 18 }, { name: '02', value: 22 }, { name: '03', value: 19 }, { name: '04', value: 28 }, { name: '05', value: 24 }, { name: '06', value: 31 }]
  return (
    <ChartContainer config={{ activity: { label: 'Index', color: 'var(--chart-1)' } }} className="data-chart activity-chart">
      <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
        <Line dataKey="value" type="monotone" stroke="var(--color-activity)" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ChartContainer>
  )
}
