// hello.spec.js
import { mount } from '@vue/test-utils'
import APP from '../src/App.vue'

console.log(APP)

// The component to test
const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg'],
}

describe('displays message', () => {
  const wrapper = mount(MessageComponent, {
    props: {
      msg: 'Hello world',
    },
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Hello world')
})

describe('test', () => {
  it('a', () => {
    expect(1 + 2).toBe(3)
  })
})
