<template>
  <section
    ref="section"
    class="stack relative mt-[clamp(48px,8vw,96px)] mb-30 overflow-hidden bg-ink-900 px-[clamp(20px,4vw,56px)] py-[clamp(48px,7vw,96px)]"
    :class="{ 'is-open': open }">
    <div class="relative grid items-center gap-12 xl:grid-cols-[420px_1fr] xl:gap-8">
      <!-- left column: text -->
      <div class="stack-text flex flex-col">
        <p class="m-0 font-mono text-xs tracking-[.08em] text-bronze-400 uppercase">// Stack</p>
        <h1 class="mt-5 mb-0 font-mono text-[clamp(34px,5vw,48px)] leading-[1.15] font-normal text-milk">
          What I build with
        </h1>
        <!-- TODO: final lead text from the user -->
        <p class="mt-6 mb-0 max-w-105 font-sans text-[17px] leading-[1.6] font-light text-ink-200">
          The frameworks, databases and tools I use to build FinTech dashboards, MetaTrader systems and web apps.
        </p>
        <p class="mt-8 mb-0 font-mono text-sm text-ink-400">ana/balieieva</p>
      </div>

      <!-- right part: the plates -->
      <div class="plates">
        <div
          v-for="(group, i) in groups"
          :key="group.name"
          class="plate"
          :class="{ 'plate-accent': group.accent }"
          :style="{ '--i': i, zIndex: groups.length - i }">
          <p class="m-0 font-mono text-xs uppercase" :class="group.accent ? 'text-milk' : 'text-ink-200'">
            <span class="text-ink-400">{{ String(i + 1).padStart(2, '0') }}</span
            >&nbsp;&nbsp;{{ group.name }}
          </p>
          <ul class="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
            <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
usePageSeo({
  title: 'Tech stack',
  description:
    'The frameworks, databases and tools I use to build FinTech dashboards, MetaTrader systems and web apps.',
  path: '/stack'
})

const groups = [
  { name: 'Front-end', items: ['Nuxt', 'Vue.js', 'Pinia', 'Tailwind CSS', 'TypeScript'], accent: true },
  { name: 'Back-end', items: ['NestJS', 'TypeORM', 'Redis', 'MongoDB', 'MySQL'] },
  { name: 'Trading', items: ['MQL4 / MQL5', 'MetaTrader', 'Python', 'Binance API', 'WhiteBIT API'] },
  { name: 'Infra', items: ['Ubuntu VPS', 'Nginx', 'Docker', 'GitHub Actions', 'PM2'] },
  { name: 'Design', items: ['Figma', 'After Effects', 'Photoshop', 'Illustrator', 'Canva'] }
]

// the plates unfold once, when the section comes into view
const section = ref<HTMLElement | null>(null)
const open = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    open.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        open.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.25 }
  )
  if (section.value) observer.observe(section.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.stack {
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  /* thin vertical grid lines every 120px */
  background-image: linear-gradient(to right, rgba(255, 249, 246, 0.035) 1px, transparent 1px);
  background-size: 120px 100%;
}

/* text: starts 40px lower and invisible, rises when the section opens */
.stack-text {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 1.1s var(--ease),
    transform 1.1s var(--ease);
}
.is-open .stack-text {
  opacity: 1;
  transform: none;
}

/* phones and tablets: plain cards in a column, no 3D */
.plates {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.plate {
  padding: 22px 28px;
  background: linear-gradient(to bottom, #2b2320, #1b1613);
  border: 1px solid rgba(255, 249, 246, 0.12);
  box-shadow: 0 24px 40px -8px rgba(0, 0, 0, 0.55);
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 1.1s var(--ease),
    transform 1.1s var(--ease);
  transition-delay: calc(var(--i) * 80ms);
}
.is-open .plate {
  opacity: 1;
  transform: none;
}
.plate-accent {
  background: linear-gradient(to bottom, #77513d, #1b1613);
  border-color: rgba(176, 132, 104, 0.6);
}
.chip {
  padding: 6px 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.2;
  color: #c5bbb6;
  background: #2b2320;
  border: 1px solid rgba(255, 249, 246, 0.1);
}

/* desktop: tilted plates, folded into a block (step 16px), unfold to step 100px */
@media (min-width: 1024px) {
  .plates {
    display: block;
    height: 660px;
  }
  /* soft glow behind the plates */
  .plates::before {
    content: '';
    position: absolute;
    inset: -10% -15%;
    background: radial-gradient(closest-side, rgba(177, 155, 140, 0.16), transparent);
    pointer-events: none;
  }
  .plate {
    position: absolute;
    top: 110px;
    left: 50%;
    width: 660px;
    margin-left: -330px;
    opacity: 0.85;
    transform: translateY(calc(var(--i) * 16px)) rotateX(52deg) rotateZ(-14deg);
  }
  .plate:first-child {
    opacity: 1;
  }
  .is-open .plate {
    opacity: 1;
    transform: translateY(calc(var(--i) * 100px)) rotateX(52deg) rotateZ(-14deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stack-text,
  .plate {
    transition: none;
  }
}
</style>
