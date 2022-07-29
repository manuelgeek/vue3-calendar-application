<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2"
      >Reminder label</label
    >
    <div class="flex justify-around space-x-2">
      <div
        v-for="(theme, index) in colorClasses"
        :key="index"
        :class="[
          'w-10 h-10 cursor-pointer rounded',
          theme,
          theme === color ? 'border-2 border-black' : '',
        ]"
        @click="selectColor(theme)"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "",
  },
});
const colorClasses = [
  "bg-red-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
];

const emit = defineEmits(["color-selected"]);
const selectColor = (color) => {
  emit("color-selected", color);
};
</script>
