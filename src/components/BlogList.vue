<template>
  <div>
    <div v-for="blog in blogs" :key="blog.id" class="blog-card">
      <div class="blog-header">
        <img
          :src="blog.user.userAvatarUrl"
          alt="avatar"
          class="avatar"
          @click="goUser(blog.user.id)"
          style="cursor:pointer"
        />
        <div>
          <div class="username">{{ blog.user.username }}</div>
          <div class="create-time">{{ blog.createTime }}</div>
        </div>
      </div>
      <div class="blog-title">{{ blog.title }}</div>
      <div class="blog-images" v-if="blog.images && blog.images.length">
        <img
          v-for="(img, idx) in blog.images"
          :key="idx"
          :src="img"
          class="blog-image"
          alt="blog-img"
        />
      </div>
      <div class="blog-content">{{ blog.content }}</div>
      <div class="blog-footer">
        <span>👍 {{ blog.liked }}</span>
        <span>💬 {{ blog.comments }}</span>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '../service/myAxios'
import type { BlogVo } from '../model/blog'

function parseImages(images: string | string[]): string[] {
  if (Array.isArray(images)) return images
  if (typeof images === 'string') {
    try {
      const arr = JSON.parse(images)
      if (Array.isArray(arr)) return arr
    } catch {
      return images.replace(/[\[\]\"]/g, '').split(',').filter(Boolean)
    }
  }
  return []
}

const blogs = ref<BlogVo[]>([])
const router = useRouter()

const goUser = (id: number) => {
  router.push(`/user/show/${id}`)
}

onMounted(async () => {
  const res = await request.get('/blog/list')
  blogs.value = (res as any[]).map((item) => ({
    ...item,
    images: parseImages(item.images),
    createTime: item.createTime,
  }))
})
</script>

<style scoped>
.blog-card {
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 16px;
  background: #fff;
}
.blog-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}
.username {
  font-weight: bold;
}
.create-time {
  font-size: 12px;
  color: #888;
}
.blog-title {
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
}
.blog-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}
.blog-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}
.blog-content {
  margin-bottom: 8px;
}
.blog-footer {
  display: flex;
  gap: 16px;
  color: #888;
  font-size: 14px;
}
</style>