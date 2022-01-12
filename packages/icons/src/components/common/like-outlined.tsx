
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-like-outlined')

export const LikeOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M620.352 100.522667l18.474667 10.666666A149.354667 149.354667 0 0 1 701.717333 298.666667h110.698667a128 128 0 0 1 126.72 146.112l-48.768 341.333333A128 128 0 0 1 763.648 896H426.666667a127.530667 127.530667 0 0 1-85.333334-32.597333A127.530667 127.530667 0 0 1 256 896h-42.666667a128 128 0 0 1-128-128V469.333333a128 128 0 0 1 128-128h42.666667c22.826667 0 44.224 5.973333 62.784 16.426667 5.184-8.106667 11.285333-15.616 18.133333-22.357333l108.586667-188.032a128 128 0 0 1 174.848-46.848zM384 768.298667V768a42.666667 42.666667 0 0 0 39.466667 42.56L426.666667 810.666667h336.981333a42.666667 42.666667 0 0 0 41.642667-33.365334l0.597333-3.264 48.768-341.333333a42.666667 42.666667 0 0 0-39.04-48.597333l-3.2-0.106667H572.821333l50.346667-118.656a64.021333 64.021333 0 0 0-23.594667-78.122667l-3.413333-2.133333-18.474667-10.666667a42.666667 42.666667 0 0 0-56.533333 12.8l-1.770667 2.816-114.346666 198.08-8.277334 8.106667a42.24 42.24 0 0 0-12.586666 26.581333L384 426.666667v341.632z m-85.354667-299.456L298.666667 469.333333a42.666667 42.666667 0 0 0-39.466667-42.56L256 426.666667h-42.666667a42.666667 42.666667 0 0 0-42.56 39.466666L170.666667 469.333333v298.666667a42.666667 42.666667 0 0 0 39.466666 42.56L213.333333 810.666667h42.666667a42.666667 42.666667 0 0 0 42.56-39.466667l0.106667-2.858667-0.021334-299.498666z" p-id="39675"></path></svg>
    )
  }
)

if (__DEV__) {
  LikeOutlined.displayName = 'LikeOutlined'
}
  