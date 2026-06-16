import { Activity, Clock, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react'

interface Props {
  tgUser: { first_name: string; id: number } | null
}

// Временные mock-данные (потом заменим на API)
const MOCK_STATS = {
  plan: 'Старт',
  daysLeft: 18,
  messagesThisMonth: 1247,
  messagesLimit: 3000,
  hoursSaved: 24,
  costSavings: 60000,
  recentActivity: [
    { time: '14:32', text: 'Клиент → Ответ по доставке', type: 'support' },
    { time: '13:18', text: 'Новый лид: +7 495 123-45-67', type: 'sales' },
    { time: '12:05', text: 'Запрос на бронь → подтверждено', type: 'booking' },
    { time: '11:00', text: 'Отчёт в Telegram: 24 диалога', type: 'report' },
  ],
}

export function Dashboard({ tgUser }: Props) {
  const usagePct = Math.round((MOCK_STATS.messagesThisMonth / MOCK_STATS.messagesLimit) * 100)

  return (
    <div className="space-y-4 pt-2">
      {/* Greeting + plan */}
      <div className="glass-tide rounded-2xl p-4">
        <div className="text-xs text-white/60 mb-1">Активный тариф</div>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold gradient-text">{MOCK_STATS.plan}</div>
            <div className="text-xs text-white/60 mt-0.5">
              до конца {MOCK_STATS.daysLeft} дн.
            </div>
          </div>
          <button className="text-xs text-tide-300 flex items-center gap-1 hover:gap-2 transition-all">
            Продлить <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Usage + metrics */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Activity className="h-4 w-4" />}
          label="Диалоги"
          value={`${MOCK_STATS.messagesThisMonth.toLocaleString('ru-RU')}`}
          sub={`из ${MOCK_STATS.messagesLimit.toLocaleString('ru-RU')}`}
          progress={usagePct}
        />
        <MetricCard
          icon={<Clock className="h-4 w-4" />}
          label="Часы / мес"
          value={`${MOCK_STATS.hoursSaved}`}
          sub="возвращено"
        />
        <MetricCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Экономия"
          value={`${(MOCK_STATS.costSavings / 1000).toFixed(0)}K ₽`}
          sub="≈ 1 FTE"
        />
        <MetricCard
          icon={<AlertCircle className="h-4 w-4" />}
          label="Ошибки"
          value="0"
          sub="за 7 дней"
        />
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="text-sm font-semibold">Активность</div>
          <button className="text-[10px] text-tide-300">Все →</button>
        </div>
        <div className="glass rounded-2xl divide-y divide-white/5">
          {MOCK_STATS.recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="text-[10px] text-white/40 w-10">{a.time}</div>
              <div className="text-xs flex-1">{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick action */}
      <button className="w-full glass-tide rounded-2xl p-4 text-left flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-tide-300">Подключить новый канал</div>
          <div className="text-[10px] text-white/60 mt-0.5">VK, WhatsApp, Instagram*</div>
        </div>
        <ArrowRight className="h-4 w-4 text-tide-300" />
      </button>
    </div>
  )
}

function MetricCard({ icon, label, value, sub, progress }: { icon: React.ReactNode; label: string; value: string; sub: string; progress?: number }) {
  return (
    <div className="glass rounded-2xl p-3">
      <div className="flex items-center gap-1.5 text-tide-300 mb-1">
        {icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[10px] text-white/50 mt-0.5">{sub}</div>
      {progress !== undefined && (
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-tide-400 to-tide-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}
