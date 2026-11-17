import { useState } from 'react'
import { rand } from '../api'

const DADOS = [4, 6, 8, 10, 12, 20, 100]

export default function DiceTray() {
  const [dado, setDado] = useState(20)
  const [resultado, setResultado] = useState(null)
  const [rodando, setRodando] = useState(false)
  const [historial, setHistorial] = useState([])

  function lanzar() {
    setRodando(true)
    setTimeout(() => {
      const r = rand(1, dado) 
      setResultado(r)
      setHistorial([`d${dado}: ${r}`, ...historial].slice(0, 8))
      setRodando(false)
    }, 400)
  }

  const critico = dado === 20 && resultado === 20
  const pifia = dado === 20 && resultado === 1

  return (
    <section>
      <h2>Bandeja de dados</h2>
      <div className="dice-select">
        {DADOS.map((d) => (
          <button
            key={d}
            className={`die ${d === dado ? 'active' : ''}`}
            onClick={() => {
              setDado(d)
              setResultado(null)
            }}
          >
            d{d}
          </button>
        ))}
      </div>

      <button className="btn" onClick={lanzar} disabled={rodando}>
        Lanzar d{dado}
      </button>

      <div
        className={`result ${rodando ? 'rolling' : ''} ${critico ? 'crit' : ''} ${pifia ? 'fail' : ''}`}
      >
        {rodando ? '...' : resultado ?? '?'}
      </div>
      {critico && <p className="center">¡Crítico!</p>}
      {pifia && <p className="center">¡Pifia!</p>}

      {historial.length > 0 && (
        <p className="muted center">Historial: {historial.join(' · ')}</p>
      )}
    </section>
  )
}