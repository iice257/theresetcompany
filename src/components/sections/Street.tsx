export function Street() {
  return (
    <section
      id="street"
      className="chapter street"
      aria-labelledby="street-title"
    >
      <div className="chapter-label">
        <span>INTERLUDE</span>
        <span>OFFLINE DISTRIBUTION</span>
      </div>
      <h2 id="street-title">
        RESETS ON
        <br />
        THE STREET.
      </h2>
      <div className="reset-deck">
        {[0, 1, 2].map((n) => (
          <img
            key={n}
            src="/images/reset-card.webp"
            width="800"
            height="492"
            loading="lazy"
            draggable={false}
            alt={
              n === 1
                ? 'One full reset, redeemable on the street. An unofficial fan card.'
                : ''
            }
          />
        ))}
        <button className="deal-card mono">DEAL A RESET ↗</button>
      </div>
      <p className="mono distributed" role="status">
        RESETS DISTRIBUTED: <span>0</span>
      </p>
      <p className="caption">UNOFFICIAL. NOT REDEEMABLE. PROBABLY.</p>
    </section>
  );
}
