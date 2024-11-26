<script setup lang="ts">
const route = useRoute()

const title = route.query?.title || 'Hello World'
const date = route.query?.date || new Date().toISOString()
const href = `/image?title=${title}`

const origin = useRequestURL().origin

useSeoMeta({
  title: title as string,
  ogTitle: title as string,
  description: date as string,
  ogDescription: date as string,
  ogImage: `${origin}/image?title=${title}&date=${date}`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    class="card"
  >
    <div class="title">
      {{ title }}
    </div>

    <div class="description">
      {{ new Date(date as string).toLocaleString() }}
    </div>
  </a>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  font-family: Arial, sans-serif;
}

.card {
  width: 800px;
  height: 420px;
  background: #181818;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: border 0.3s;
  border: 1px solid transparent;
}

.card:hover {
  border: 1px solid #4CAF50;
}

.title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 10px;
}

.description {
  opacity: 0.7;
  font-size: 14px;
  color: #fff;
}
</style>
