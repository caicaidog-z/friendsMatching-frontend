<template>
  <BlogCreatePage @created="refreshBlogList" />
  <BlogList :blogs="blogs" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogCreatePage from './BlogCreatePage.vue'
import BlogList from '../components/BlogList.vue'
import request from '../service/myAxios'

const blogs = ref([])

const refreshBlogList = async () => {
  const res = await request.get('/blog/list')
  blogs.value = res?.data ?? []
}

onMounted(refreshBlogList)
</script>