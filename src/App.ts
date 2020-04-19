import './ui.css'

import {Component, Vue} from "vue-property-decorator";

@Component
export class App extends Vue {

    public count: number = 5;

    public create(): void {
        parent.postMessage({pluginMessage: {type: 'create-rectangles', count: this.count}}, '*')
    }

    public cancel(): void {
        parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
    }
}

/*
import './ui.css'

document.getElementById('create').onclick = () => {
  const textbox = document.getElementById('count') as HTMLInputElement
  const count = parseInt(textbox.value, 10)
  parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}

* */