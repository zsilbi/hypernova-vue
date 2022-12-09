import { createApp } from 'vue';
import hypernova, { load } from 'hypernova';
import { findNode, getData } from 'nova-helpers';

type HypernovaPayload = {
  node: HTMLElement;
  data: any;
}

export { load } from 'hypernova';

export const mountComponent = (
  Component,
  node: HTMLElement,
  data: any,
) => {
  return createApp(Component, data).mount(node);
};

export const renderInPlaceholder = (
  name: string,
  Component,
  id: string,
) => {
  const node: HTMLElement = findNode(name, id);
  const data: any = getData(name, id);

  if (node && data) {
    return mountComponent(Component, node, data);
  }

  return null;
};

export const loadById = (name: string, id: string): HypernovaPayload => {
  const node = findNode(name, id);
  const data = getData(name, id);

  if (node && data) {
    return {
      node,
      data,
    };
  }

  return null;
};

export const renderPinia = (
  name: string,
  Component,
  createStore: Function,
): void => hypernova({
  server() {
    throw new Error('Use hypernova-vue/server instead');
  },

  client() {
    const payloads = load(name);

    if (payloads) {
      payloads.forEach((payload: HypernovaPayload) => {
        const { node, data } = payload;
        const { propsData, state } = data;

        const store = createStore();
        store.state.value = state;

        const vm = mountComponent(Component, node, propsData);
        vm.use(store);
      });
    }

    return Component;
  },
});

