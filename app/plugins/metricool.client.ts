// Metricool web analytics (the visits of the site in the Metricool brand): their tracker script with the brand hash
export default defineNuxtPlugin(() => {
  const hash = useRuntimeConfig().public.metricoolHash
  if (!hash) return
  const s = document.createElement('script')
  s.src = 'https://tracker.metricool.com/resources/be.js'
  s.async = true
  s.onload = () =>
    (window as Window & { beTracker?: { t: (o: { hash: string }) => void } }).beTracker?.t({ hash: String(hash) })
  document.head.appendChild(s)
})
