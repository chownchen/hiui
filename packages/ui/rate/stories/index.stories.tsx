import React from 'react'

export * from './basic.stories'

export default {
  title: 'Rate',
  decorators: [(story: Function) => <div>{story()}</div>],
}
