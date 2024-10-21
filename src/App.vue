<template>
  <div class="app-container">
    <!-- 加号按钮，点击时显示弹窗 -->
    <button class="add-button" @click="openModal">+</button>
    
    <!-- 计划列表展示 -->
    <ul class="plan-list">
      <li v-for="plan in plans" :key="plan.id">
        {{ plan.description }} - {{ plan.date }}
        <button class="delete-button" @click="deletePlan(plan.id)">-</button>
      </li>
    </ul>

    <!-- 弹窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Add New Plan</h2>
        <input v-model="newPlanDescription" type="text" placeholder="Plan Description" />
        <input v-model="newPlanDate" type="date" placeholder="Plan Date" />
        <button @click="addPlan">Add</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';

// 计划数据类型
interface Plan {
  id: number;
  description: string;
  date: string;
}

const plans = ref<Plan[]>([]);  // 计划列表
const showModal = ref(false);  // 控制弹窗显示
const newPlanDescription = ref<string>('');  // 新计划的描述
const newPlanDate = ref<string>('');  // 新计划的日期

// 排序函数：按日期从近到远排序
const sortPlans = () => {
  plans.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// 打开弹窗
const openModal = () => {
  showModal.value = true;
};

// 关闭弹窗
const closeModal = () => {
  showModal.value = false;
  newPlanDescription.value = '';
  newPlanDate.value = '';
};

// 添加新计划
const addPlan = async () => {
  if (newPlanDescription.value && newPlanDate.value) {
    console.log('Adding plan:', newPlanDescription.value, newPlanDate.value);
    const newPlan: Plan = {
      id: plans.value.length + 1,
      description: newPlanDescription.value,
      date: newPlanDate.value,
    };
    plans.value.push(newPlan);
    sortPlans();  // 添加新计划后排序
    closeModal();  // 关闭弹窗
    await invoke('save_plans', { plans: plans.value });
  } else {
    alert('Please fill out all fields.');
  }
};

// 删除计划
const deletePlan = async (id: number) => {
  plans.value = plans.value.filter(plan => plan.id !== id);
  sortPlans();  // 删除计划后排序
  await invoke('save_plans', { plans: plans.value });
};



// 初始化时加载计划
const loadPlans = async () => {
  try {
    const storedPlans = await invoke<Plan[]>('load_plans');
    plans.value = storedPlans || [];
    sortPlans();  // 加载完后立即排序
  } catch (error) {
    console.error('Failed to load plans:', error);
  }
};

loadPlans();
</script>

<style scoped>
/* 确保 html 和 body 占满整个视口 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* 使 app-container 占满整个窗口 */
.app-container {
  top: 0;
  left: 0;
  width: 400px;
  height: 600px; /* 100% 视口高度 */
  padding: 0;
  font-family: Arial, sans-serif;
  position: absolute;
  background-color: white; /* 背景色为白色 */
}

.add-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;  /* 设置宽度为 30px */
  height: 20px;  /* 设置高度为 20px */
  background-color: #90EE90;  /* 浅绿色 */
  color: white;
  border: none;
  font-size: 16px;  /* 适当调整字体大小 */
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;  /* 垂直居中 */
  cursor: pointer;
}

.plan-list {
  margin-top: 40px;
  list-style-type: none;
  padding: 0;
  font-family: "SimSun", serif; /* 更改字体为宋体 */
}

.plan-list li {
  margin: 10px 0;
  padding: 10px;
  background-color: #f0f0f0;
  color: #000;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  font-family: "SimSun", serif; /* 更改字体为宋体 */
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  width: 30px;  /* 设置宽度为 30px */
  height: 20px;  /* 设置高度为 20px */
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  font-size: 16px;  /* 适当调整字体大小 */
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;  /* 垂直居中 */
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  font-family: "SimSun", serif; /* 更改字体为宋体 */
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}
</style>
