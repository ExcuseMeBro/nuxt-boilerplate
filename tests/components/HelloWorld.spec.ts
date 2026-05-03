import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HelloWorld from '../../src/components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders correctly', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.html()).contain('Hello, world!')
  })
})
