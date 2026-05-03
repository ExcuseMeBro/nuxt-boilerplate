<script setup lang="ts">
const { t } = useI18n()
const head = useLocaleHead()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description')
})
</script>

<template>
  <div class="app">
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <Link
          v-for="link in head.link"
          :id="link.id"
          :key="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
        <Meta
          v-for="meta in head.meta"
          :id="meta.id"
          :key="meta.id"
          :property="meta.property"
          :content="meta.content"
        />
      </Head>
      <Body>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </Body>
    </Html>
  </div>
</template>
