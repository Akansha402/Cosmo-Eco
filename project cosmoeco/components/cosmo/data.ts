export type OrbitObject = {
  id: string
  name: string
  orbit: 'LEO' | 'MEO' | 'GEO'
  type: 'Satellite' | 'Debris' | 'Rocket body'
  altitude: number
  velocity: number
  operator: string
  inclination: number
  period: number
  risk: 'High' | 'Medium' | 'Low'
  distance: string
}

export const sampleNotice = 'Illustrative sample dataset · Not live satellite data'

export const orbitObjects: OrbitObject[] = [
  { id: 'COS-2251', name: 'COSMOS 2251', orbit: 'LEO', type: 'Debris', altitude: 785, velocity: 7.46, operator: 'Uncontrolled object', inclination: 74.0, period: 100.2, risk: 'High', distance: '148 m' },
  { id: 'S2B', name: 'SENTINEL-2B', orbit: 'LEO', type: 'Satellite', altitude: 702.4, velocity: 7.51, operator: 'European Space Agency', inclination: 98.57, period: 98.7, risk: 'Low', distance: '—' },
  { id: 'SL-3286', name: 'STARLINK-3286', orbit: 'LEO', type: 'Satellite', altitude: 550.2, velocity: 7.59, operator: 'SpaceX · sample record', inclination: 53.0, period: 95.4, risk: 'High', distance: '148 m' },
  { id: 'OW-0421', name: 'ONEWEB-0421', orbit: 'MEO', type: 'Satellite', altitude: 1_200, velocity: 7.25, operator: 'OneWeb · sample record', inclination: 87.9, period: 109.1, risk: 'Medium', distance: '392 m' },
  { id: 'SL16-RB', name: 'SL-16 R/B', orbit: 'LEO', type: 'Rocket body', altitude: 840, velocity: 7.44, operator: 'Launch vehicle stage', inclination: 71.0, period: 101.1, risk: 'Medium', distance: '392 m' },
  { id: 'FY1C-DEB', name: 'FENGYUN 1C DEB', orbit: 'LEO', type: 'Debris', altitude: 860, velocity: 7.43, operator: 'Fragment · sample record', inclination: 98.6, period: 102.0, risk: 'Low', distance: '1.2 km' },
]

export const sustainabilityFactors = [
  { label: 'Debris risk', short: 'DEBRIS RISK', score: 58, status: 'WATCH', detail: 'Debris density is rising in key LEO bands.' },
  { label: 'Collision risk', short: 'COLLISION', score: 72, status: 'MODERATE', detail: 'Avoidance capabilities reduce modeled exposure.' },
  { label: 'Disposal plan', short: 'DISPOSAL', score: 45, status: 'AT RISK', detail: 'Post-mission compliance remains below the target.' },
  { label: 'Fuel efficiency', short: 'EFFICIENCY', score: 81, status: 'STRONG', detail: 'Efficient station-keeping can extend mission life.' },
  { label: 'Launch impact', short: 'LAUNCH', score: 68, status: 'MODERATE', detail: 'Launch emissions are within the modeled range.' },
  { label: 'Re-entry impact', short: 'RE-ENTRY', score: 61, status: 'MODERATE', detail: 'Material ablation remains an area of uncertainty.' },
  { label: 'Repairability', short: 'REPAIR', score: 54, status: 'WATCH', detail: 'Serviceability is limited across current mission designs.' },
]

export const conjunctions = [
  { level: 'HIGH', primary: 'STARLINK-3286', secondary: 'COSMOS 1408 DEB', distance: '148 m', time: 'Today · 18:42 UTC' },
  { level: 'MEDIUM', primary: 'ONEWEB-0421', secondary: 'SL-16 R/B', distance: '392 m', time: 'Tomorrow · 02:16 UTC' },
  { level: 'LOW', primary: 'SENTINEL-2A', secondary: 'FENGYUN 1C DEB', distance: '1.2 km', time: 'May 26 · 11:05 UTC' },
]

export const orbitalActivity = [
  { time: '14:28:42', type: 'MANEUVER', object: 'ISS', detail: 'Altitude boost completed', value: '+1.8 km' },
  { time: '14:16:09', type: 'LAUNCH', object: 'Transporter-12', detail: '47 payloads deployed', value: 'LEO' },
  { time: '13:51:33', type: 'CONJUNCTION', object: 'NOAA-20', detail: 'Avoidance window updated', value: 'Medium' },
  { time: '13:22:18', type: 'RE-ENTRY', object: 'CZ-2D R/B', detail: 'Tracking window narrowed', value: 'Pacific' },
]

export const projectionYears = [2025, 2030, 2035, 2040, 2045]

export const emissionData = [
  { month: 'J', emissions: 61 }, { month: 'F', emissions: 54 }, { month: 'M', emissions: 69 },
  { month: 'A', emissions: 58 }, { month: 'M', emissions: 73 }, { month: 'J', emissions: 62 },
  { month: 'J', emissions: 79 }, { month: 'A', emissions: 68 }, { month: 'S', emissions: 85 },
  { month: 'O', emissions: 72 }, { month: 'N', emissions: 91 }, { month: 'D', emissions: 76 },
]

export const recentQuestions = [
  { title: 'Orbital debris growth', date: 'Just now', prompt: 'Why is orbital debris increasing?' },
  { title: 'Improve sustainability score', date: 'Yesterday', prompt: 'How can we improve this sustainability score?' },
  { title: 'Disposal compliance impact', date: 'May 20', prompt: 'What happens if disposal compliance improves?' },
]
