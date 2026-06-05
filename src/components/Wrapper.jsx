function Wrapper({ pagination, operatingBar, children }) {
  return (
    <div className="white-card" style={{ marginTop: 12 }}>
      {(pagination || operatingBar) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {pagination && <div>{pagination}</div>}
          {operatingBar && <div>{operatingBar}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export default Wrapper
