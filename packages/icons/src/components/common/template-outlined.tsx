
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-template-outlined')

export const TemplateOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M789.333333 106.666667a128 128 0 0 1 128 128v554.666666a128 128 0 0 1-128 128H234.666667a128 128 0 0 1-128-128V234.666667a128 128 0 0 1 128-128h554.666666zM384 448H192v341.333333a42.666667 42.666667 0 0 0 39.466667 42.56L234.666667 832h149.333333V448zM789.333333 192H469.333333v640h320a42.666667 42.666667 0 0 0 42.56-39.466667L832 789.333333V234.666667a42.666667 42.666667 0 0 0-39.466667-42.56L789.333333 192zM384 192h-149.333333a42.666667 42.666667 0 0 0-42.56 39.466667L192 234.666667v128h192V192z" p-id="39015"></path></svg>
    )
  }
)

if (__DEV__) {
  TemplateOutlined.displayName = 'TemplateOutlined'
}
  