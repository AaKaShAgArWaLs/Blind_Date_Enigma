/**
 * Shuffles an array using Fisher-Yates algorithm.
 */
export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Keep selected members in one team without exposing any UI toggle.
// Add exact participant names here.
const LOCKED_MEMBER_GROUPS = [
  ['Aakash', 'Rahul'],['Karthik', 'Divya']
]

const cleanName = (value) => String(value || '').trim()

function buildTeamSizes(total, teamSize) {
  const count = Math.floor(total / teamSize)
  const remainder = total % teamSize
  const sizes = Array(count).fill(teamSize)

  if (remainder === 1 && count > 0) {
    sizes[sizes.length - 1] = teamSize - 1
    sizes.push(2)
  } else if (remainder > 0) {
    sizes.push(remainder)
  }

  return sizes.length ? sizes : [total]
}

function buildUnits(names, lockedGroups) {
  const participantSet = new Set(names)
  const used = new Set()
  const units = []

  for (const rawGroup of lockedGroups) {
    if (!Array.isArray(rawGroup)) continue

    const group = [...new Set(rawGroup.map(cleanName).filter(Boolean))]
    const valid =
      group.length > 1 &&
      group.every((name) => participantSet.has(name)) &&
      group.every((name) => !used.has(name))

    if (!valid) continue

    group.forEach((name) => used.add(name))
    units.push(group)
  }

  names.forEach((name) => {
    if (!used.has(name)) units.push([name])
  })

  return units
}

function placeUnits(units, sizes) {
  const teams = sizes.map((size) => ({ members: [], remaining: size }))

  for (const unit of [...shuffle(units)].sort((a, b) => b.length - a.length)) {
    const target = teams
      .filter((team) => team.remaining >= unit.length)
      .sort((a, b) => a.remaining - b.remaining)[0]

    if (!target) return null

    target.members.push(...unit)
    target.remaining -= unit.length
  }

  return teams.map(({ members }) => ({ members }))
}

/**
 * Generates teams from an array of participant names.
 * Team size is 3 or 4 (prefers 4, adjusts remainder).
 */
export function generateTeams(names, teamSize = 3, options = {}) {
  if (!names || names.length === 0) return []

  const cleanNames = [...new Set(names.map(cleanName).filter(Boolean))]
  if (!cleanNames.length) return []

  const lockedGroups = Array.isArray(options.lockedGroups)
    ? options.lockedGroups
    : LOCKED_MEMBER_GROUPS

  const units = buildUnits(cleanNames, lockedGroups)
  const largestUnit = Math.max(...units.map((u) => u.length), 1)
  const sizes = buildTeamSizes(cleanNames.length, Math.max(teamSize, largestUnit))

  return placeUnits(units, sizes)
}

export const SAMPLE_PARTICIPANTS = [
  'Aakash', 'Rahul', 'Sneha', 'Dev', 'Arjun', 'Kavya',
  'Riya', 'Aditya', 'Priya', 'Vikram', 'Ananya', 'Rohan',
  'Meera', 'Karthik', 'Divya', 'Siddharth', 'Nisha', 'Arnav',
  'Pooja', 'Nikhil', 'Shruti', 'Tanmay', 'Ishaan', 'Lavanya',
  'Tejas', 'Swati', 'Yash', 'Preethi', 'Varun', 'Aarti',
  'Dhruv', 'Simran', 'Vivek', 'Ritika', 'Mohit', 'Shivani',
  'Aman', 'Tanya', 'Kunal', 'Deepa', 'Harsh', 'Jyoti',
  'Parth', 'Sakshi', 'Akshay', 'Mansi', 'Saurabh', 'Neha',
  'Abhinav', 'Preeti','random'
]

