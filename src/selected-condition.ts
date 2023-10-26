export default function conditionalSelection(str: string): string | null {
  const regex = /true\s*=>\s*([\s\S]*?)(?=(true|false)\s*=>|$)/g
  const match = regex.exec(str)
  if (!match) {
    return null
  }
  return match[1].trim()
}