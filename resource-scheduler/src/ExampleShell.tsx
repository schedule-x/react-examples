import type { ReactNode } from 'react'

type ExampleShellProps = {
  children: ReactNode
  demo: string
}

export function ExampleShell({ children, demo }: ExampleShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">SX</span>
          <span>Schedule-X examples</span>
        </div>
        <div className="user-summary">
          <span className="status-pill">
            <span className="status-dot" /> Local demo
          </span>
          <div className="account">
            <span className="avatar">EX</span>
            <span className="account-copy">
              <strong>Example user</strong>
              <span>Frontend sample</span>
            </span>
          </div>
        </div>
      </header>
      <div className="shell-body">
        <aside className="workspace-sidebar">
          <p className="sidebar-label">Workspace</p>
          <div className="nav-item"><span className="nav-icon">▦</span> Calendar</div>
          <div className="sidebar-footer">
            <span className="sync-icon">↻</span>
            <span className="sidebar-footer-copy">
              <strong>Sample data</strong>
              <span>Runs locally in your browser</span>
            </span>
          </div>
        </aside>
        <main className="workspace">
          <div className="page-heading">
            <p className="eyebrow">Your workspace</p>
            <h1>Calendar</h1>
            <p className="subtitle">Explore Schedule-X with a focused, production-inspired frontend shell.</p>
          </div>
          <section className="calendar-panel">
            <div className="panel-meta"><strong>{demo}</strong><span>Interactive example</span></div>
            <div className="calendar-stage">{children}</div>
          </section>
        </main>
      </div>
    </div>
  )
}
