export const API = 'https://www.dnd5eapi.co'

export async function getJSON(path) {
  const res = await fetch(`${API}${path}`)
  if (!res.ok) throw new Error(`Error ${res.status} al consultar la API`)
  return res.json()
}

export const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min