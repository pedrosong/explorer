//用来自定义canvas的渲染器

import {createCommentVNode, createRenderer, reactive} from "vue";
import {
    Container,
    Sprite,
    Text,
    Texture
} from "pixi.js";

const renderer = createRenderer({
    createElement(type) {
        let element;
        switch (type) {
            case "container":
                element = new Container();
                break;
            case "sprite":
                element = new Sprite();
                break;
        };
        return element
    },

    insert(el, parent) {
        if (el) {
            parent.addChild
        }
    },

    parentNode(node){
        if(el && el.parent){
            el.parent.removeChild(el)
        }
    },

    patchProp(el,key,preValue,nextValue){
        switch (key){
            case "texture":
                el.texture = Texture.from(nextValue);
                break;
            case "onclick":
                el.on("pointertap", nextValue);
                break;
            default:
                el[key] = nextValue;
                break;
        }
    },

    createText(text){
        return new Text(text)
    },

    nextSibling(){},
    createComment(){}
})

export function createApp(routComponent){
    return renderer.createApp(routComponent)
}