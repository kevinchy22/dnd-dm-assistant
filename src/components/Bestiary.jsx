import { useEffect, useState } from 'react'
import { getJSON } from '../api'
import Card from './Card'

function MonsterCard({ index }) {
  const [m, setM] = useState(null)

  useEffect(() => {
    getJSON(`/api/monsters/${index}`).then(setM).catch(() => setM(false))
  }, [index])

  if (m === null) return <div className="card">Cargando...</div>
  if (m === false) return <div className="card">Error al cargar</div>

  return (
    <Card
      title={m.name}
      subtitle={`${m.size} ${m.type}`}
      badge={`CR ${m.challenge_rating}`}
      stats={[
        { label: 'Armor Class', value: m.armor_class?.[0]?.value ?? '-' },
        { label: 'Hit Points', value: m.hit_points },
        { label: 'Challenge Rating', value: m.challenge_rating },
      ]}
    />
  )
}

export default function Bestiary() {
  const [monsters, setMonsters] = useState([])
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(12)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJSON('/api/monsters')
      .then((d) => setMonsters(d.results))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = monsters.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section>
      <h2>Bestiario</h2>
      <input
        className="input"
        type="text"
        placeholder="Buscar enemigo (ej: dragon)"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setLimit(12)
        }}
      />
      {loading && <p>Cargando monstruos...</p>}
      {error && <p className="error">{error}</p>}
      <p className="muted">{filtered.length} resultados</p>
      <div className="grid">
        {filtered.slice(0, limit).map((m) => (
          <MonsterCard key={m.index} index={m.index} />
        ))}
      </div>
      {limit < filtered.length && (
        <button className="btn" onClick={() => setLimit(limit + 12)}>
          Ver más
        </button>
      )}
    </section>
  )
}