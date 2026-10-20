// I sincerely did not do this part. I used claude. 
import { useState } from 'react'

const CATS = {
  profile: '/cats/miko1.png', 
  squads: ['/cats/miko2.jpg', '/cats/miko3.jpg', '/cats/miko4.jpg'], 
  feedback: ['/cats/miko2.jpg', '/cats/miko3.jpg', '/cats/miko4.jpg'], 
}

const USER_LEVEL = 8
const LEVEL_PROGRESS = 0.65 

const tabs = ['For you', 'Web Development', 'PHP', 'GitHub']

const sidebarIcons = ['👥', '👁️', '🔥', '🧪', '✨']

const news = [
  { title: 'Moonshot AI prepares to release Kimi K3, a 3-trillion-parameter open frontier model', time: '8m ago' },
  { title: "Nvidia discusses $250B guarantee to backstop OpenAI's 10GW Ohio data center", time: '2h ago' },
  { title: 'Cursor zero-day lets malicious git.exe hijack Windows developers on project open', time: '13h ago' },
  { title: 'WordPress patches pre-auth RCE requiring no plugins and activates forced auto-updates', time: '1d ago' },
]

const card = 'rounded-3xl border border-[#2a2e37] bg-[#1a1d24]'
const outlined = 'rounded-xl border border-[#2a2e37] bg-[#161a21]'

function Avatar({ src, alt = 'Cat', className = '', fallback = '🐱' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span role="img" aria-label={alt} className={`${className} grid shrink-0 place-items-center text-[0.9em] leading-none`}>
        {fallback}
      </span>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${className} shrink-0 object-cover`}
    />
  )
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2" aria-label="daily.dev">
      <svg viewBox="0 0 40 24" className="h-6 w-10 text-white" fill="none" aria-hidden="true">
        <path
          d="M20 12 L27 4 H34 L38.5 12 L34 20 H27 L20 12 L13 4 H6 L1.5 12 L6 20 H13 Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
        />
      </svg>
      <span className="text-xl font-bold">
        daily<span className="font-normal text-zinc-500">.dev</span>
      </span>
    </a>
  )
}

function LevelBadge({ level, progress }) {
  const r = 19
  const circumference = 2 * Math.PI * r
  return (
    <div className="relative grid size-11 place-items-center rounded-full bg-[#161a21]" title={`Level ${level}`}>
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#2f343e" strokeWidth="3" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="#a8b3cf"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <span className="relative text-sm font-bold">{level}</span>
    </div>
  )
}

function IconButton({ children }) {
  return (
    <button className={`${outlined} grid size-11 place-items-center transition hover:border-zinc-500`}>
      {children}
    </button>
  )
}

function Navbar() {
  return (
    <header className="flex items-center gap-3 border-b border-[#2a2e37] px-4 py-3">
      <Logo />

      <div className="flex h-11 max-w-xl flex-1 items-center gap-3 rounded-xl bg-[#1a1d24] px-4 text-zinc-400">
        <span>🔍</span>
        <span className="flex-1">Search</span>
        <kbd className="hidden rounded-md border border-zinc-600 px-2 text-sm lg:block">Ctrl + K</kbd>
      </div>

      <div className="ml-auto hidden items-center gap-3 sm:flex">
        <IconButton>💼</IconButton>
        <LevelBadge level={USER_LEVEL} progress={LEVEL_PROGRESS} />
        <IconButton>🎁</IconButton>
        <IconButton>🔔</IconButton>
      </div>

      <div className={`${outlined} hidden h-11 items-center gap-4 px-4 text-sm md:flex`}>
        <span className="text-zinc-300">⭕ 0</span>
        <span className="text-yellow-400">◆ 1.1K</span>
        <span className="text-violet-400">⚡ 510</span>
        <Avatar src={CATS.profile} alt="Your profile" className="size-9 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-900" />
      </div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="hidden w-14 shrink-0 flex-col items-center gap-5 overflow-y-auto border-r border-[#2a2e37] py-3 md:flex">
      <button aria-label="Collapse sidebar" className="text-lg text-zinc-400 transition hover:text-white">
        ◧
      </button>

      <button
        aria-label="New post"
        className="grid size-9 place-items-center rounded-xl bg-white text-2xl font-bold leading-none text-black transition hover:bg-zinc-200"
      >
        +
      </button>

      <button aria-label="Your profile" className="transition hover:opacity-80">
        <Avatar src={CATS.profile} alt="Your profile" className="size-8 rounded-full bg-zinc-700" />
      </button>

      {sidebarIcons.map((icon) => (
        <button key={icon} className="text-lg opacity-70 transition hover:opacity-100">
          {icon}
        </button>
      ))}

      <div className="h-px w-8 bg-[#2a2e37]" />

      {CATS.squads.map((src, i) => (
        <button key={src} aria-label={`Squad ${i + 1}`} className="transition hover:opacity-80">
          <Avatar src={src} alt={`Squad ${i + 1}`} className="size-7 rounded-full bg-zinc-700" />
        </button>
      ))}
    </aside>
  )
}

function FeedTabs() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      <button className="shrink-0 rounded-2xl bg-[linear-gradient(90deg,#c13cf2,#7b5cf5)] px-4 py-3 font-bold">
        Want chips 🍟 ?
      </button>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`shrink-0 rounded-2xl border border-[#2a2e37] px-5 py-3 font-bold ${
            i === 0 ? 'bg-black text-white' : 'bg-[#1a1d24] text-slate-400'
          }`}
        >
          {tab}
        </button>
      ))}
      <button className={`${outlined} shrink-0 px-5 py-3 font-medium`}>⚙️ Feed settings</button>
      <button className={`${outlined} shrink-0 px-5 py-3 font-medium`}>➕ Shortcuts</button>
      <button className={`${outlined} shrink-0 px-5 py-3 font-medium`}>🛡️ 4/5</button>
    </div>
  )
}

function HappeningNow() {
  return (
    <section className={`${card} p-6`}>
      <h2 className="bg-[linear-gradient(90deg,#4fd1c5,#f0e442)] bg-clip-text text-2xl font-bold text-transparent">
        Happening Now
      </h2>
      <ul className="mt-5 divide-y divide-[#2a2e37]">
        {news.map((item) => (
          <li key={item.title} className="py-3">
            <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.time}</p>
          </li>
        ))}
      </ul>
      <a href="#" className="mt-2 flex items-center justify-between font-medium text-teal-300">
        Read all <span className="text-yellow-300">→</span>
      </a>
    </section>
  )
}

function ArticleCard() {
  return (
    <article className={`${card} p-5`}>
      <div className="grid size-11 place-items-center rounded-lg bg-orange-500 text-xl font-bold">Y</div>
      <h2 className="mt-4 text-2xl font-bold leading-snug">So Reddit has decided that plain HTML is unsafe</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {['#javascript', '#html', '#crawling'].map((tag) => (
          <span key={tag} className="rounded-xl border border-[#2a2e37] px-3 py-1 text-slate-400">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-slate-300">Jul 22 • 9m read time</p>

      <div className="mt-4 flex flex-col items-center gap-3 rounded-xl bg-black px-6 py-8">
        <button className="w-full max-w-xs rounded-full bg-white py-2 text-sm font-medium text-black">
          Continue with Google
        </button>
        <button className="w-full max-w-xs rounded-full bg-white py-2 text-sm font-medium text-black">
          Email me a one-time link
        </button>
        <div className="w-full max-w-xs rounded-xl bg-zinc-800 px-4 py-3 text-sm text-zinc-400">
          Email or username <span className="text-red-400">*</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-slate-300">
        <span>⬆️ 73</span>
        <span>⬇️</span>
        <span>💬 12</span>
        <span>🔖</span>
      </div>
    </article>
  )
}

function FeedbackButton() {
  return (
    <button className="fixed bottom-4 right-4 flex items-center gap-4 rounded-2xl bg-white px-5 py-3 text-left text-black shadow-lg">
      <span>
        <span className="block font-bold">Feedback</span>
        <span className="block text-sm">Real people reply</span>
      </span>
      <span className="flex -space-x-2">
        {CATS.feedback.map((src, i) => (
          <Avatar
            key={src}
            src={src}
            alt={`Cat ${i + 1}`}
            className="size-8 rounded-full border-2 border-white bg-amber-200"
          />
        ))}
      </span>
    </button>
  )
}

function App() {
  return (
    <div className="flex h-screen flex-col bg-[#0e1217] text-white">
      <Navbar />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <FeedTabs />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <HappeningNow />
            <ArticleCard />
          </div>
        </main>
      </div>
      <FeedbackButton />
    </div>
  )
}

export default App