<template>
  <!-- 悬浮按钮 -->
  <div class="fab" @click="showDialog = true">
    <span class="plus">+</span>
  </div>
  <!-- 创建博客弹窗 -->
  <van-dialog v-model:show="showDialog" title="创建博客" show-cancel-button @confirm="onSubmit">
    <van-field v-model="form.title" label="标题" placeholder="请输入标题" />
    <van-field v-model="form.content" label="内容" type="textarea" placeholder="请输入内容" />
    <van-uploader
      v-model="fileList"
      :after-read="afterRead"
      :max-count="9"
      :max-size="2 * 1024 * 1024"
      @oversize="onOversize"
    />
  </van-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'
import request from '../service/myAxios'

const showDialog = ref(false)
const form = ref({
  title: '',
  content: '',
  images: [] as string[]
})
const fileList = ref<any[]>([])

const afterRead = async (file: any) => {
  const res = await request.post('/file/upload', {
    file: file.file,
    biz: 'blog_picture'
  }, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  if (res) {
    form.value.images.push(res)
    fileList.value.push({ url: res })
  }
}

const onOversize = () => {
  showFailToast('图片大小不能超过2MB')
}

const onSubmit = async () => {
  if (!form.value.title || !form.value.content) {
    showFailToast('标题和内容不能为空')
    return
  }
  const res = await request.post('/blog/create', {
    ...form.value,
    images: form.value.images
  })
  if (res) {
    showSuccessToast('博客创建成功')
    emit('created')
    showDialog.value = false
    form.value.title = ''
    form.value.content = ''
    form.value.images = []
    fileList.value = []
  }
}
const emit = defineEmits(['created'])
</script>

<style scoped>
.fab {
  position: fixed;
  right: 32px;
  bottom: 80px;
  width: 60px;
  height: 60px;
  background: #1890ff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.fab:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
}
.plus {
  color: #fff;
  font-size: 36px;
  font-weight: bold;
  line-height: 1;
  user-select: none;
}
</style>