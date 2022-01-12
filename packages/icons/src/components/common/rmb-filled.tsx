
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-rmb-filled')

export const RmbFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-79.210667 223.338667a42.666667 42.666667 0 0 0-57.621333 62.826667L451.626667 448H384a42.666667 42.666667 0 0 0-42.56 39.466667L341.333333 490.666667a42.666667 42.666667 0 0 0 42.666667 42.666666h85.333333v42.666667h-85.333333a42.666667 42.666667 0 0 0-42.56 39.466667L341.333333 618.666667a42.666667 42.666667 0 0 0 42.666667 42.666666h85.333333v42.666667a42.666667 42.666667 0 0 0 39.466667 42.56L512 746.666667a42.666667 42.666667 0 0 0 42.666667-42.666667v-42.666667h85.333333a42.666667 42.666667 0 0 0 42.56-39.466666L682.666667 618.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-85.333333v-42.666667h85.333333a42.666667 42.666667 0 0 0 42.56-39.466666L682.666667 490.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-67.669333l76.501333-76.501333a42.666667 42.666667 0 0 0-57.621333-62.826667l-2.709334 2.496L512 387.626667l-76.501333-76.48z" p-id="15561"></path></svg>
    )
  }
)

if (__DEV__) {
  RmbFilled.displayName = 'RmbFilled'
}
  