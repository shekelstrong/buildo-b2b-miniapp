import { useState } from 'react'
import { Search, Loader2, Building2, User, MapPin, Calendar, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react'

interface EgrulEntity {
  id: string
  type: string
  value: string
  attributes: {
    inn?: string
    name?: string
    ogrn?: string
    kpp?: string
    region?: string
    director?: string
    reg_date?: string
    status?: string
    role?: string
    via_company?: string
  }
  sources: string[]
}

interface AuditResult {
  found: number
  entities: EgrulEntity[]
  persons: EgrulEntity[]
  relations: Array<{ source_id: string; target_id: string; type: string }>
  risk_score: number
  risk_factors: string[]
  recommendations: string[]
}

const API_BASE = import.meta.env.VITE_INVESTIGATIONS_API || 'http://108.165.164.85:8765'
// Note: реальный endpoint — на VPS за reverse proxy. Для MVP — переменная окружения.

const SAMPLE_RESULT: AuditResult = {
  found: 1,
  entities: [
    {
      id: 'company-7707083893',
      type: 'company',
      value: 'ПАО "СБЕРБАНК РОССИИ"',
      attributes: {
        inn: '7707083893',
        ogrn: '1027700132195',
        kpp: '773601001',
        region: 'г. Москва',
        reg_date: '16.08.2002',
      },
      sources: ['egrul'],
    },
  ],
  persons: [
    {
      id: 'person-греф-герман-оскарович',
      type: 'person',
      value: 'Греф Герман Оскарович',
      attributes: { role: 'director', via_company: '7707083893' },
      sources: ['egrul'],
    },
  ],
  relations: [
    { source_id: 'person-греф-герман-оскарович', target_id: 'company-7707083893', type: 'director_of' },
  ],
  risk_score: 0.1,
  risk_factors: [],
  recommendations: [
    'Проверить арбитражные дела (kad.arbitr.ru)',
    'Проверить исполнительные производства (fssp.gov.ru)',
  ],
}

function riskColor(score: number): string {
  if (score < 0.3) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
  if (score < 0.7) return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
  return 'text-rose-400 bg-rose-400/10 border-rose-400/20'
}

function riskLabel(score: number): string {
  if (score < 0.3) return 'Низкий риск'
  if (score < 0.7) return 'Средний риск'
  return 'Высокий риск'
}

export function Investigate() {
  const [inn, setInn] = useState('')
  const [ogrn, setOgrn] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    const q = inn || ogrn
    if (!q) {
      setError('Введите ИНН или ОГРН')
      return
    }
    if (inn && !/^\d{10,12}$/.test(inn)) {
      setError('ИНН должен содержать 10 или 12 цифр')
      return
    }
    if (ogrn && !/^\d{13,15}$/.test(ogrn)) {
      setError('ОГРН должен содержать 13 или 15 цифр')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      // В проде: fetch с реального API. Пока — fallback на sample
      // const r = await fetch(`${API_BASE}/api/v1/audit`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'x-api-key': 'dev-key' },
      //   body: JSON.stringify({ inn: inn || undefined, ogrn: ogrn || undefined }),
      // })
      // const data = await r.json()
      // setResult(data)

      // Демо: имитация задержки и возврат sample
      await new Promise((r) => setTimeout(r, 800))
      setResult(SAMPLE_RESULT)
    } catch (e) {
      setError(`Ошибка запроса: ${(e as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="glass-card p-4 rounded-2xl space-y-3">
        <h2 className="text-base font-semibold">Проверка контрагента</h2>
        <p className="text-xs text-white/50">
          ИНН или ОГРН. Данные из ЕГРЮЛ/ЕГРИП ФНС России. Бесплатно.
        </p>

        <div>
          <label className="text-[11px] text-white/60 uppercase tracking-wider">ИНН</label>
          <input
            type="text"
            inputMode="numeric"
            value={inn}
            onChange={(e) => setInn(e.target.value.replace(/\D/g, ''))}
            placeholder="7707083893"
            className="mt-1 w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-tide-400/50"
            maxLength={12}
          />
        </div>

        <div>
          <label className="text-[11px] text-white/60 uppercase tracking-wider">ОГРН (опционально)</label>
          <input
            type="text"
            inputMode="numeric"
            value={ogrn}
            onChange={(e) => setOgrn(e.target.value.replace(/\D/g, ''))}
            placeholder="1027700132195"
            className="mt-1 w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-tide-400/50"
            maxLength={15}
          />
        </div>

        {error && (
          <div className="text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg p-2">
            {error}
          </div>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-tide-400 to-tide-500 text-ocean-900 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Проверяю...</>
          ) : (
            <><Search className="h-4 w-4" /> Проверить</>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-3">
          {/* Risk score card */}
          <div className={`glass-card p-4 rounded-2xl border ${riskColor(result.risk_score)}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider opacity-80">Уровень риска</div>
                <div className="text-2xl font-bold mt-1">{riskLabel(result.risk_score)}</div>
              </div>
              <div className="text-4xl font-bold tabular-nums opacity-80">
                {Math.round(result.risk_score * 100)}
              </div>
            </div>
          </div>

          {/* Company */}
          {result.entities.map((e) => (
            <div key={e.id} className="glass-card p-4 rounded-2xl space-y-2">
              <div className="flex items-start gap-2">
                <Building2 className="h-4 w-4 text-tide-300 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{e.attributes.name || e.value}</div>
                  <div className="text-[11px] text-white/50 mt-0.5">Юридическое лицо</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <Field label="ИНН" value={e.attributes.inn} />
                <Field label="ОГРН" value={e.attributes.ogrn} />
                <Field label="КПП" value={e.attributes.kpp} />
                <Field label="Регион" value={e.attributes.region} icon={<MapPin className="h-3 w-3" />} />
                <Field label="Дата рег." value={e.attributes.reg_date} icon={<Calendar className="h-3 w-3" />} />
              </div>
            </div>
          ))}

          {/* Persons */}
          {result.persons.length > 0 && (
            <div className="glass-card p-4 rounded-2xl space-y-2">
              <div className="text-xs font-semibold text-white/80 flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-tide-300" /> Связанные лица
              </div>
              {result.persons.map((p) => (
                <div key={p.id} className="text-sm flex items-center justify-between border-t border-white/5 pt-2">
                  <div>
                    <div>{p.value}</div>
                    <div className="text-[11px] text-white/40">{p.attributes.role}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Risk factors */}
          {result.risk_factors.length > 0 && (
            <div className="glass-card p-4 rounded-2xl space-y-2">
              <div className="text-xs font-semibold text-white/80 flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-300" /> Факторы риска
              </div>
              {result.risk_factors.map((f, i) => (
                <div key={i} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-amber-300 mt-0.5">•</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="glass-card p-4 rounded-2xl space-y-2">
              <div className="text-xs font-semibold text-white/80 flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" /> Что проверить дальше
              </div>
              {result.recommendations.map((r, i) => (
                <div key={i} className="text-sm text-white/70 flex items-start gap-2">
                  <span className="text-emerald-300 mt-0.5">→</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          )}

          <div className="text-[10px] text-white/30 text-center pt-2 flex items-center justify-center gap-1">
            <span>Источник: egrul.nalog.ru</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, icon }: { label: string; value: string | undefined; icon?: React.ReactNode }) {
  return (
    <div className="bg-white/5 rounded-lg p-2">
      <div className="text-[10px] text-white/40 uppercase tracking-wider flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className="text-xs text-white/80 mt-0.5 tabular-nums">{value || '—'}</div>
    </div>
  )
}
