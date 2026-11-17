import { useState } from 'react'
import Bestiary from './components/Bestiary'
import LootGenerator from './components/LootGenerator'
import DiceTray from './components/DiceTray'
import conejillo from './assets/conejillo.png'
import './App.css'

const TABS = [
  { id: 'bestiario', label: 'Bestiario' },
  { id: 'loot', label: 'Loot' },
  { id: 'dados', label: 'Dados' },
]

function App() {
  const [tab, setTab] = useState('bestiario')

  return (
    <div className="app">
      <header>
        <h1>Asistente del DM</h1>
        <img class="Banner" src={conejillo} alt="Conejillo" className="logo" />
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? 'tab active' : 'tab'}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {tab === 'bestiario' && <Bestiary />}
        {tab === 'loot' && <LootGenerator />}
        {tab === 'dados' && <DiceTray />}
      </main>
    </div>
  )
}

export default App