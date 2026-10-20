// I sincerely did not do this part. I used claude. 

const tabs = ['For you', 'Web Development', 'PHP', 'GitHub']

const sidebarIcons = ['➕', '👥', '👁️', '🔥', '🧪', '✨']

const news = [
  { title: 'Moonshot AI prepares to release Kimi K3, a 3-trillion-parameter open frontier model', time: '8m ago' },
  { title: "Nvidia discusses $250B guarantee to backstop OpenAI's 10GW Ohio data center", time: '2h ago' },
  { title: 'Cursor zero-day lets malicious git.exe hijack Windows developers on project open', time: '13h ago' },
  { title: 'WordPress patches pre-auth RCE requiring no plugins and activates forced auto-updates', time: '1d ago' },
]

const card = 'rounded-3xl border border-[#2a2e37] bg-[#1a1d24]'
const outlined = 'rounded-xl border border-[#2a2e37] bg-[#161a21]'

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
      <span className="text-xl font-bold">
        daily<span className="font-normal text-zinc-400">.dev</span>
      </span>

      <div className="flex h-11 max-w-xl flex-1 items-center gap-3 rounded-xl bg-[#1a1d24] px-4 text-zinc-400">
        <span>🔍</span>
        <span className="flex-1">Search</span>
        <kbd className="hidden rounded-md border border-zinc-600 px-2 text-sm lg:block">Ctrl + K</kbd>
      </div>

      <div className="ml-auto hidden items-center gap-3 sm:flex">
        <IconButton>💼</IconButton>
        <IconButton>🎁</IconButton>
        <IconButton>🔔</IconButton>
      </div>

      <div className={`${outlined} hidden h-11 items-center gap-4 px-4 text-sm md:flex`}>
        <span className="text-zinc-300">⭕ 0</span>
        <span className="text-yellow-400">◆ 1.1K</span>
        <span className="text-violet-400">⚡ 510</span>
        <span className="size-9 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-900" />
      </div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="hidden w-14 flex-col items-center gap-6 border-r border-[#2a2e37] py-4 md:flex">
      {sidebarIcons.map((icon) => (
        <button key={icon} className="text-lg opacity-70 transition hover:opacity-100">
          {icon}
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
        <span className="size-8 rounded-full border-2 border-white bg-amber-700" />
        <span className="size-8 rounded-full border-2 border-white bg-indigo-700" />
        <span className="size-8 rounded-full border-2 border-white bg-slate-500" />
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