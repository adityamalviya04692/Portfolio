import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { usePortfolio, asset } from '../hooks/usePortfolio'
import SocialLinks from './SocialLinks'

export default function HeroSection() {
  const { profile, stats } = usePortfolio()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-14 sm:px-8">
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* CSS Grid hero (guide iteration prompt #2) — avatar overlaps the headline row */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="pill mb-7 inline-flex items-center gap-2 px-3.5 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="mono text-[11px] tracking-wider text-neutral-400">
                {profile.availability} · {profile.location.split(',')[0]}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="hero-heading chrome-text relative z-10 font-semibold"
            >
              Hi, I'm {profile.shortName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
              className="mono mt-5 text-base text-neutral-400 sm:text-lg"
            >
              <span className="accent-text font-medium">{profile.role}</span>
              <span className="mx-2 text-neutral-700">/</span>
              {profile.specialization}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-400 sm:text-base"
            >
              {profile.tagline} {profile.yearsOfExperience} on Microsoft Azure, most of it on
              pipelines that other people depend on before breakfast.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full accent-bg px-6 py-3 text-sm font-medium text-white">
                View Projects <ArrowRight size={16} />
              </a>
              <a href={asset(profile.resume)} download className="pill inline-flex items-center gap-2 px-6 py-3 text-sm text-neutral-200 hover:text-white">
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="relative z-20 mx-auto w-full max-w-[280px] lg:max-w-[340px] lg:justify-self-end"
          >
            <div className="absolute -inset-5 rounded-full bg-gradient-to-tr from-purple-600/25 via-pink-500/15 to-orange-500/20 blur-2xl" />
            <img
              src={asset(profile.avatar)}
              alt={profile.name}
              className="relative aspect-square w-full rounded-full border border-line object-cover"
            />
            <div className="pill absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5">
              <span className="mono text-[11px] text-neutral-400">Azure · Databricks · PySpark</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-9 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="chrome-text text-3xl font-semibold sm:text-4xl">{s.value}</div>
              <div className="mt-1.5 text-xs leading-snug text-neutral-500">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
