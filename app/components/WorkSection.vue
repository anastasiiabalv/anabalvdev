<template>
  <div id="work">
    <CaseStudy
      label="Case study 01"
      title="FX-ATS"
      role="Founding software engineer"
      logo="logo-fxats.svg"
      description="The in-house technology behind FX-ATS Group: trading infrastructure, real-time account monitoring and the web tools the team and clients use every day. I designed and built the whole system myself."
      :built="[
        'Monitoring dashboard with equity curves, period stats and gain tracking',
        'Account connection flow between client accounts and strategies',
        'Backend, data delivery and deployments on VPS',
        'Marketing site and product UI'
      ]"
      :stats="[
        { value: '2 yrs', label: 'in production' },
        { value: '6+', label: 'strategies monitored live' },
        { value: '35+', label: 'projects shipped' }
      ]"
      :shots="[
        {
          src: 'examples/fx_monitor.webp',
          alt: 'FX-ATS monitor: one account with its gain chart and stats',
          caption: 'Monitor: equity curve, balance and period gains'
        },
        {
          src: 'examples/fx_accounts.webp',
          alt: 'FX-ATS monitor: accounts as chart cards',
          caption: 'All accounts at a glance as live chart cards'
        },
        {
          src: 'examples/fx_analytics.webp',
          alt: 'FX-ATS monitor: monthly analytics and traded instruments',
          caption: 'Monthly analytics and traded instruments'
        },
        {
          src: 'examples/fx_whitebit.webp',
          alt: 'FX-ATS monitor: monitoring link for a WhiteBIT account',
          caption: 'Read-only monitoring link for a WhiteBIT account'
        }
      ]"
      reverse />

    <CaseStudy
      label="Case study 02"
      title="Trade copier"
      role="MT4 ⇄ MT5 copying system"
      description="A high-speed copier that moves trades between MT4 and MT5 in every direction, in under a second, across many accounts at once. Built for live trading and refined over years of real use: from a DLL socket bridge to an AES-encrypted API."
      :built="[
        'Copier core in MQL4/5 with a high-load algorithm that keeps signals fast during volatile markets',
        'Desktop management console (PyQt5) with real-time alerts and one-click disconnect of any account from the master',
        'NestJS REST API to manage the copier from websites, plus VPS deployment with instant auto-reconnect'
      ]"
      :stats="[
        { value: '< 1 s', label: 'signal transfer' },
        { value: '4', label: 'directions: MT4 ↔ MT4, MT4 ↔ MT5, MT5 ↔ MT5' },
        { value: '24/7', label: 'on VPS with auto-reconnect' }
      ]"
      :shots="[
        {
          src: 'examples/copier_preview.webp',
          alt: 'Trade copier architecture: MT4/MT5 terminals, copier core, AES-encrypted API and NestJS REST API on a VPS, web panel and PyQt5 console',
          caption: 'How it fits together: terminals, copier core, encrypted API on a VPS, web panel and desktop console'
        }
      ]" />
  </div>
</template>

<script lang="ts" setup></script>
