<template>
<div class="message-container">
    <Icon class="icon-error" icon="material-symbols-light:error-outline" />
    <p> {{ msg }} </p>
</div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
    name: "MessageError",
    props: {
        msg: String 
    },
    components: {
        Icon,
    },

}
</script>
<style scoped>
.message-container {    
    display: flex;
    position: absolute;
    top: 8rem;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #a60202;
    background-color: #FFCACA;
    border: 2px #a60202 solid;
    border-radius: 5px;
    padding: 8px;
    max-width: 400px;
    text-align: center;
    transition: 3s;
    align-items: center;
    z-index: 1000;
}
.icon-error{
    margin-right: 5px;
    width: 3rem;
    height: 3rem;
}
       
</style>