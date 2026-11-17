// Tarjeta genérica y reutilizable: sirve para monstruos, objetos, etc.
export default function Card({ title, subtitle, badge, stats = [], children }) {
  return (
    <article className="card">
      <div className="card-head">
        <h3>{title}</h3>
        {badge && <span className="badge">{badge}</span>}
      </div>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {stats.length > 0 && (
        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label}>
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </li>
          ))}
        </ul>
      )}
      {children}
    </article>
  )
}