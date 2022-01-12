
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-upload-outlined')

export const UploadOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M512 678.506667a42.666667 42.666667 0 0 0 42.666667-42.666667V252.373333l140.501333 140.458667a42.666667 42.666667 0 0 0 57.621333 2.496l2.709334-2.496a42.666667 42.666667 0 0 0 2.496-57.621333l-2.496-2.709334-213.333334-213.333333a42.666667 42.666667 0 0 0-57.621333-2.496l-2.709333 2.496-213.333334 213.333333a42.666667 42.666667 0 0 0 57.621334 62.826667l2.709333-2.496L469.333333 252.330667v383.509333a42.666667 42.666667 0 0 0 42.666667 42.666667zM874.666667 618.666667a42.666667 42.666667 0 0 1 42.56 39.466666L917.333333 661.333333v128a128 128 0 0 1-123.2 127.914667L789.333333 917.333333H234.666667a128 128 0 0 1-127.914667-123.2L106.666667 789.333333v-128a42.666667 42.666667 0 0 1 85.226666-3.2L192 661.333333v128a42.666667 42.666667 0 0 0 39.466667 42.56L234.666667 832h554.666666a42.666667 42.666667 0 0 0 42.56-39.466667L832 789.333333v-128a42.666667 42.666667 0 0 1 42.666667-42.666666z" p-id="38645"></path></svg>
    )
  }
)

if (__DEV__) {
  UploadOutlined.displayName = 'UploadOutlined'
}
  