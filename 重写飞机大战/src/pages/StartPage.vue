<template>
    <container>
        <sprite :texture="startPageImg"></sprite>
        <sprite :texture="startBtnImg" x="255" y="520" :interactive="true" @click="handleClick"></sprite>
    </container>
</template>

<script>
import startPageImg from "../assets/start_page.jpg";
import startBtnImg from "../assets/startBtn.png"
export default {
    setup (props, {emit}) {
        const handleClick =()=>{
            console.log("click");
            emit("change-page","GamePage")
        }

        return {
            startPageImg,
            startBtnImg,
            handleClick
        }
    }
}
</script>

<style>

</style>