import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '../../src/App.vue'
import Vuesax from 'vuesax';

const localVue = createLocalVue();
localVue.use(Vuesax);

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(App, {
    data: function () {
      return {}
    }, localVue
  });
});

describe('App', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(wrapper.is(App)).toBe(true)
  })
})