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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPinia = exports.renderVue = void 0;
const vue_1 = require("vue");
const server_renderer_1 = require("vue/server-renderer");
const hypernova_1 = __importStar(require("hypernova"));
const devalue_1 = __importDefault(require("@nuxt/devalue"));
exports.renderVue = (name, Component) => hypernova_1.default({
    server() {
        return async (propsData) => {
            const vm = vue_1.createSSRApp(Component, propsData);
            const contents = await server_renderer_1.renderToString(vm);
            return hypernova_1.serialize(name, contents, propsData);
        };
    },
    client() {
        throw new Error('Use hypernova-vue instead');
    },
});
exports.renderPinia = (name, Component, createStore) => hypernova_1.default({
    server() {
        return async (propsData) => {
            const store = createStore();
            const vm = vue_1.createSSRApp(Component, propsData);
            vm.use(store);
            const contents = await server_renderer_1.renderToString(vm);
            return hypernova_1.serialize(name, contents, { propsData, state: devalue_1.default(store.state.value) });
        };
    },
    client() {
        throw new Error('Use hypernova-vue instead');
    },
});
