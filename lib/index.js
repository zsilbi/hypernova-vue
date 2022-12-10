"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPinia = exports.renderVue = exports.loadById = exports.renderInPlaceholder = exports.mountComponent = void 0;
const vue_1 = require("vue");
const hypernova_1 = __importStar(require("hypernova"));
const nova_helpers_1 = require("nova-helpers");
var hypernova_2 = require("hypernova");
Object.defineProperty(exports, "load", { enumerable: true, get: function () { return hypernova_2.load; } });
exports.mountComponent = (Component, node, data) => {
    return vue_1.createApp(Component, data).mount(node);
};
exports.renderInPlaceholder = (name, Component, id) => {
    const node = nova_helpers_1.findNode(name, id);
    const data = nova_helpers_1.getData(name, id);
    if (node && data) {
        return exports.mountComponent(Component, node, data);
    }
    return null;
};
exports.loadById = (name, id) => {
    const node = nova_helpers_1.findNode(name, id);
    const data = nova_helpers_1.getData(name, id);
    if (node && data) {
        return {
            node,
            data,
        };
    }
    return null;
};
exports.renderVue = (name, Component) => hypernova_1.default({
    server() {
        throw new Error('Use hypernova-vue/server instead');
    },
    client() {
        const payloads = hypernova_1.load(name);
        if (payloads) {
            payloads.forEach((payload) => {
                const { node, data: propsData } = payload;
                exports.mountComponent(Component, node, propsData);
            });
        }
        return Component;
    },
});
exports.renderPinia = (name, Component, createStore) => hypernova_1.default({
    server() {
        throw new Error('Use hypernova-vue/server instead');
    },
    client() {
        const payloads = hypernova_1.load(name);
        if (payloads) {
            payloads.forEach((payload) => {
                const { node, data } = payload;
                const { propsData, devaluedState } = data;
                const store = createStore();
                store.state.value = (null, eval)('(' + devaluedState + ')');
                const vm = exports.mountComponent(Component, node, propsData);
                vm.use(store);
            });
        }
        return Component;
    },
});
