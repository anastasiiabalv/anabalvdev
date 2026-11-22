<template>
  <NuxtLayout>
    <section class="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-[clamp(48px,8vw,96px)]">
      <p class="eyebrow">// Error {{ code }}</p>
      <h1 class="hero-title">{{ title }}</h1>
      <p class="hero-sub">{{ text }}</p>
      <button type="button" class="btn-primary mt-2" @click="goHome">Back to the home page</button>
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const code = computed(() => Number(props.error?.statusCode) || 500)
const notFound = computed(() => code.value === 404)
const title = computed(() => (notFound.value ? 'Page not found' : 'Something went wrong'))
// own texts only: the error's message can hold technical details
const text = computed(() =>
  notFound.value
    ? 'There is nothing at this address. The page may have moved, or the link has a typo.'
    : 'An unexpected error happened on this page. Please try again in a minute.'
)

useHead({ title: () => title.value })
useSeoMeta({ robots: 'noindex' })

const goHome = () => clearError({ redirect: '/' })
</script>
