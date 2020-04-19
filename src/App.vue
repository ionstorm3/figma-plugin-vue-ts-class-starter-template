<template>
    <div>
        <img src="<%= require('./logo.svg') %>">
        <h2>Rectangle Creator</h2>
        <p>Count: <input id="count" v-model="count"></p>
        <button @click="create">Create</button>
        <button @click="cancel">Cancel</button>
    </div>

    <!--    <div>-->
    <!--        <span>Hi there</span>-->
    <!--        <span>{{namex}}</span>-->
    <!--        <button @click="generate">Generate</button>-->
    <!--    </div>-->
</template>
<script lang="ts">
    import {App} from "./App";

    export default App;
</script>