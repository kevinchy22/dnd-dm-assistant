import { useState } from 'react'
import { getJSON, rand } from '../api'
import Card from './Card'
import coinCobre from '../assets/coinCob.png'
import coinPlata from '../assets/coinPla.png'
import coinOro from '../assets/coinGol.png'
import coinPlatino from '../assets/gem.png'

function generarMonedas(cr) {
  return {
    cp: rand(1, 10) * (cr + 1) * 10,
    sp: rand(1, 10) * (cr + 1) * 5,
    gp: rand(1, 10) * (cr + 1) * (cr + 1),
    pp: cr >= 5 ? rand(1, 4) * cr : 0,
  }
}

function cantidadObjetos(cr) {
  return rand(1, 2) + Math.floor(cr / 6)
}

export default function LootGenerator() {
  const [cr, setCr] = useState(1)
  const [loot, setLoot] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function generar() {
    setLoading(true)
    setError('')
    try {
      const monedas = generarMonedas(cr)
      const chanceMagico = Math.min(cr * 5, 90) // % de objeto mágico
      const items = []

      for (let i = 0; i < cantidadObjetos(cr); i++) {
        const esMagico = rand(1, 100) <= chanceMagico
        const endpoint = esMagico ? '/api/magic-items' : '/api/equipment'
        const lista = await getJSON(endpoint)
        const elegido = lista.results[rand(0, lista.results.length - 1)]
        const detalle = await getJSON(elegido.url)
        items.push({ ...detalle, esMagico })
      }
      setLoot({ monedas, items })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h2>Generador de Loot</h2>
      <label className="label">
        Nivel de desafío del monstruo: <strong>{cr}</strong>
      </label>
      <input
        className="range"
        type="range"
        min="0"
        max="30"
        value={cr}
        onChange={(e) => setCr(Number(e.target.value))}
      />
      <button className="btn" onClick={generar} disabled={loading}>
        {loading ? 'Generando...' : 'Generar botín'}
      </button>
      {error && <p className="error">{error}</p>}

      {loot && (
        <>
          <h3>Monedas</h3>
          <div className="coins">
            <div className="coin cp">
              <img src={coinCobre} alt="Cobre" className="coin-img" />
              {loot.monedas.cp} cp
            </div>
            <div className="coin sp">
              <img src={coinPlata} alt="Plata" className="coin-img" />
              {loot.monedas.sp} sp
            </div>
            <div className="coin gp">
              <img src={coinOro} alt="Oro" className="coin-img" />
              {loot.monedas.gp} gp
            </div>
            {loot.monedas.pp > 0 && (
              <div className="coin pp">
                <img src={coinPlatino} alt="Platino" className="coin-img" />
                {loot.monedas.pp} pp
              </div>
            )}
          </div>

          <h3>Objetos</h3>
          <div className="grid">
            {loot.items.map((it, i) => (
              <Card
                key={i}
                title={it.name}
                subtitle={it.equipment_category?.name}
                badge={it.esMagico ? it.rarity?.name || 'Mágico' : 'Común'}
              >
                {it.desc?.[0] && <p className="muted">{it.desc[0].slice(0, 120)}...</p>}
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  )
}