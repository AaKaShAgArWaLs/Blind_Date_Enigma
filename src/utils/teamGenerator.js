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

/**
 * Generates teams from an array of participant names.
 * Team size is 3 or 4 (prefers 4, adjusts remainder).
 */
export function generateTeams(names, teamSize = 4) {
  if (!names || names.length === 0) return []
  const shuffled = shuffle(names)
  const teams = []
  let i = 0
  const total = shuffled.length

  // Determine group sizes
  const baseCount = Math.floor(total / teamSize)
  const remainder = total % teamSize

  const sizes = Array(baseCount).fill(teamSize)
  if (remainder === 1 && baseCount > 0) {
    sizes[sizes.length - 1] = 3
    sizes.push(2)
  } else if (remainder !== 0) {
    sizes.push(remainder)
  }

  for (const size of sizes) {
    teams.push({
      members: shuffled.slice(i, i + size),
    })
    i += size
  }

  return teams
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
  'Abhinav', 'Preeti',
]
