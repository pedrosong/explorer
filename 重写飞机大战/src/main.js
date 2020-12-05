import { createApp } from "./runtime-canvas/index";
import { getGameContainer } from "./game/index";
import { App } from "./App.vue";

createApp(App).mount(getGameContainer());

console.warn = () => {}