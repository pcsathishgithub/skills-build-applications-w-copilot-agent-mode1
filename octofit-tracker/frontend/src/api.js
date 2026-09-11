const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getCollectionItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export async function fetchCollection(collection) {
  const url = collection.startsWith('http')
    ? collection
    : `${apiBaseUrl}/api/${collection}/`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Unable to load ${collection} (${response.status})`)
  }
  return getCollectionItems(await response.json())
}
