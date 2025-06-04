<template>
    <div class="directive-loading">
        <Spin size="large" />
    </div>
</template>

<script lang="ts" setup>
import {
    Spin,
} from 'ant-design-vue';
</script>

<style lang="scss" scoped>
.directive-loading {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, .2);
    cursor: no-drop;

    :deep(.ant-spin-dot) {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        .ant-spin-dot-item {
            background: #FFF;
        }
    }
}
</style>