import { useState } from 'react'
import { ClipboardList, Check, ChevronRight, Rocket, Building2, Target, BarChart3, Layers, Calendar, Wallet } from 'lucide-react'

const STEPS = [
  { id: 'name', icon: '👤', label: 'Имя' },
  { id: 'company', icon: '🏢', label: 'Компания' },
  { id: 'automation', icon: '🎯', label: 'Что автоматизировать' },
  { id: 'volume', icon: '📊', label: 'Объём' },
  { id: 'stack', icon: '📡', label: 'Стек' },
  { id: 'timeline', icon: '⏰', label: 'Срок' },
  { id: 'budget', icon: '💰', label: 'Бюджет' },
]

export function Audit() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="pt-2">
        <div className="glass-tide rounded-2xl p-6 text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-tide-400 to-tide-500 flex items-center justify-center mx-auto mb-3">
            <Check className="h-8 w-8 text-ocean-900" strokeWidth={3} />
          </div>
          <div className="text-lg font-bold mb-1">Заявка отправлена!</div>
          <div className="text-sm text-white/70 mb-4">
            Ответим в течение 24 часов с персональным планом
          </div>
          <div className="text-[10px] text-white/50">ID заявки: #{Math.floor(Math.random() * 9000) + 1000}</div>
        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="pt-2 space-y-4">
        <div className="glass-tide rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <ClipboardList className="h-6 w-6 text-tide-300 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-base font-bold mb-1">Бесплатный аудит</div>
              <div className="text-xs text-white/70">
                7 вопросов за 1 минуту → персональный план автоматизации
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="glass rounded-xl px-3 py-2.5 flex items-center gap-3">
              <div className="text-xl">{s.icon}</div>
              <div className="text-sm flex-1">{s.label}</div>
              <div className="text-[10px] text-white/40">~{Math.round(60 / STEPS.length)} сек</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setStarted(true)}
          className="w-full bg-gradient-to-br from-tide-400 to-tide-500 text-ocean-900 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Rocket className="h-5 w-5" />
          Начать аудит
        </button>
      </div>
    )
  }

  return (
    <div className="pt-2 space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < current ? 'bg-tide-400' : i === current ? 'bg-tide-500' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <div className="glass-tide rounded-2xl p-5">
        <div className="text-xs text-tide-300 mb-2">
          Шаг {current + 1} из {STEPS.length}
        </div>
        <AuditStep
          step={STEPS[current].id}
          value={answers[STEPS[current].id]}
          onChange={(v) => setAnswers({ ...answers, [STEPS[current].id]: v })}
        />
      </div>

      <div className="flex gap-2">
        {current > 0 && (
          <button
            onClick={() => setCurrent(current - 1)}
            className="flex-1 glass py-3 rounded-2xl text-sm font-medium"
          >
            Назад
          </button>
        )}
        <button
          onClick={() => {
            if (current < STEPS.length - 1) {
              setCurrent(current + 1)
            } else {
              setSubmitted(true)
            }
          }}
          className="flex-1 bg-gradient-to-br from-tide-400 to-tide-500 text-ocean-900 font-bold py-3 rounded-2xl flex items-center justify-center gap-1"
        >
          {current === STEPS.length - 1 ? 'Отправить' : 'Далее'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function AuditStep({ step, value, onChange }: { step: string; value: string | undefined; onChange: (v: string) => void }) {
  const title = STEPS.find(s => s.id === step)?.label || ''
  const placeholders: Record<string, string> = {
    name: 'Иван Петров',
    company: 'Кофейня «Бин»',
    volume: 'например, 100',
  }
  const options: Record<string, string[]> = {
    automation: ['📈 Продажи', '💬 Поддержка', '📄 Документы', '✍️ Контент', '👥 HR', '🔧 Другое'],
    stack: ['Telegram', 'VK', 'WhatsApp', 'amoCRM', 'Bitrix', '1С'],
    timeline: ['🔥 Срочно', '⏱ 2 недели', '📅 Месяц', '🧘 Изучаю'],
    budget: ['до 5K ₽', '5-20K ₽', '20-50K ₽', '50K+ ₽', '🤷 Не знаю'],
  }

  return (
    <div>
      <div className="text-base font-semibold mb-3">{title}</div>
      {options[step] ? (
        <div className="grid grid-cols-2 gap-2">
          {options[step].map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={`text-xs py-2.5 px-3 rounded-xl transition-all ${
                value === opt
                  ? 'bg-tide-400/30 text-tide-300 border border-tide-400/50'
                  : 'bg-white/5 hover:bg-white/10 border border-white/5'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholders[step]}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-tide-400/50"
        />
      )}
    </div>
  )
}
