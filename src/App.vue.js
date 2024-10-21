import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const plans = ref([]); // 计划列表
const showModal = ref(false); // 控制弹窗显示
const newPlanDescription = ref(''); // 新计划的描述
const newPlanDate = ref(''); // 新计划的日期
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
        const newPlan = {
            id: plans.value.length + 1,
            description: newPlanDescription.value,
            date: newPlanDate.value,
        };
        plans.value.push(newPlan);
        sortPlans(); // 添加新计划后排序
        closeModal(); // 关闭弹窗
        await invoke('save_plans', { plans: plans.value });
    }
    else {
        alert('Please fill out all fields.');
    }
};
// 删除计划
const deletePlan = async (id) => {
    plans.value = plans.value.filter(plan => plan.id !== id);
    sortPlans(); // 删除计划后排序
    await invoke('save_plans', { plans: plans.value });
};
// 初始化时加载计划
const loadPlans = async () => {
    try {
        const storedPlans = await invoke('load_plans');
        plans.value = storedPlans || [];
        sortPlans(); // 加载完后立即排序
    }
    catch (error) {
        console.error('Failed to load plans:', error);
    }
};
loadPlans();
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    __VLS_styleScopedClasses['plan-list'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("app-container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.openModal) }, ...{ class: ("add-button") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("plan-list") }, });
    for (const [plan] of __VLS_getVForSourceType((__VLS_ctx.plans))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((plan.id)), });
        (plan.description);
        (plan.date);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.deletePlan(plan.id);
                } }, ...{ class: ("delete-button") }, });
    }
    if (__VLS_ctx.showModal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("modal-content") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ value: ((__VLS_ctx.newPlanDescription)), type: ("text"), placeholder: ("Plan Description"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("date"), placeholder: ("Plan Date"), });
        (__VLS_ctx.newPlanDate);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.addPlan) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.closeModal) }, });
    }
    __VLS_styleScopedClasses['app-container'];
    __VLS_styleScopedClasses['add-button'];
    __VLS_styleScopedClasses['plan-list'];
    __VLS_styleScopedClasses['delete-button'];
    __VLS_styleScopedClasses['modal'];
    __VLS_styleScopedClasses['modal-content'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            plans: plans,
            showModal: showModal,
            newPlanDescription: newPlanDescription,
            newPlanDate: newPlanDate,
            openModal: openModal,
            closeModal: closeModal,
            addPlan: addPlan,
            deletePlan: deletePlan,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
