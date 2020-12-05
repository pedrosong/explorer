<template>
  <container>
    <!-- <StartPage></StartPage> -->
  </container>
</template>

<script>
import StartPage from "./pages/StartPage";
import { ref,computed } from "vue";
export default {
  components: {
    // StartPage,
  },
  setup(){
      const currentPageName = ref('StartPage');

      const currentPage = computed(()=>{
          if (currentPageName.value === "StartPage"){
              return StartPage;
          }
      });

      return{
          currentPage
      }
  }
};
</script>

<style>
</style>