import { useEffect, useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Audit } from './components/Audit'
import { Investigate } from './components/Investigate'
import { Settings } from './components/Settings'
import { initTelegram } from './lib/telegram'
import { Home, ClipboardList, Settings as SettingsIcon, Sparkles, Search } from 'lucide-react'

type Tab = 'dashboard' | 'audit' | 'investigate' | 'settings'

export default function App() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [tgUser, setTgUser] = useState<{ first_name: string; id: number } | null>(null)

  useEffect(() => {
    const tg = initTelegram()
    if (tg?.initDataUnsafe?.user) {
      setTgUser({
        first_name: tg.initDataUnsafe.user.first_name || 'Друг',
        id: tg.initDataUnsafe.user.id,
      })
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col safe-top">
      {/* Top bar */}
      <header className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-tide-400 to-tide-500 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-ocean-900" />
          </div>
          <div>
            <div className="text-sm font-bold leading-none">Buildo</div>
            <div className="text-[10px] text-white/50">Личный кабинет</div>
          </div>
        </div>
        {tgUser && (
          <div className="text-xs text-white/60">
            👋 {tgUser.first_name}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-24">
        {tab === 'dashboard' && <Dashboard tgUser={tgUser} />}
        {tab === 'audit' && <Audit />}
        {tab === 'investigate' && <Investigate />}
        {tab === 'settings' && <Settings tgUser={tgUser} />}
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 safe-bottom px-3 pb-3 pt-2">
        <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around">
          <TabButton icon={<Home className="h-5 w-5" />} label="Дашборд" active={tab === 'dashboard'} onClick={() => setTab('dashboard')} />
          <TabButton icon={<ClipboardList className="h-5 w-5" />} label="Аудит" active={tab === 'audit'} onClick={() => setTab('audit')} />
          <TabButton icon={<Search className="h-5 w-5" />} label="Проверка" active={tab === 'investigate'} onClick={() => setTab('investigate')} />
          <TabButton icon={<SettingsIcon className="h-5 w-5" />} label="Профиль" active={tab === 'settings'} onClick={() => setTab('settings')} />
        </div>
      </nav>
    </div>
  )
}

function TabButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
        active ? 'bg-tide-400/20 text-tide-300' : 'text-white/50 hover:text-white/80'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}
