import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import hypernova, { serialize } from 'hypernova';

export const renderVue = (name: string, Component): void => hypernova({
  server() {
    return async (propsData): Promise<string> => {
      const vm = createSSRApp(Component, propsData)
      const contents = await renderToString(vm);

      return serialize(name, contents, propsData);
    };
  },

  client() {
    throw new Error('Use hypernova-vue instead');
  },
});

export const renderPinia = (
  name: string,
  Component,
  createStore: Function,
): void => hypernova({
  server() {
    return async (propsData): Promise<string> => {
      const store = createStore();

      const vm = createSSRApp(Component, propsData)

      vm.use(store);

      const contents = await renderToString(vm);

      return serialize(name, contents, { propsData, state: store.state.value });
    };
  },

  client() {
    throw new Error('Use hypernova-vue instead');
  },
});
