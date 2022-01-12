
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-file-question-outlined')

export const FileQuestionOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M627.498667 97.834667l-0.362667-0.384c5.973333 3.562667 11.52 7.893333 16.533333 12.885333l205.994667 205.994667c5.013333 5.013333 9.322667 10.56 12.885333 16.533333a41.813333 41.813333 0 0 1 11.733334 35.882667c0.256 2.624 0.384 5.269333 0.384 7.936V810.666667a128 128 0 0 1-128 128H277.333333a128 128 0 0 1-128-128V213.333333a128 128 0 0 1 128-128h305.984c2.666667 0 5.333333 0.128 7.978667 0.362667l0.64-0.064a41.749333 41.749333 0 0 1 35.562667 12.202667zM554.666667 170.666667H277.333333a42.666667 42.666667 0 0 0-42.56 39.466666L234.666667 213.333333v597.333334a42.666667 42.666667 0 0 0 39.466666 42.56L277.333333 853.333333h469.333334a42.666667 42.666667 0 0 0 42.56-39.466666L789.333333 810.666667V405.333333h-192a42.666667 42.666667 0 0 1-42.56-39.466666L554.666667 362.666667l-0.021334-192z m-66.368 503.125333c7.509333 0 13.994667 2.389333 19.114666 7.168 4.778667 4.778667 7.509333 10.922667 7.509334 18.432s-2.730667 13.994667-7.850667 18.773333c-5.12 4.778667-11.264 7.168-18.773333 7.168s-13.653333-2.730667-18.773334-7.509333c-5.12-4.778667-7.509333-10.922667-7.509333-18.432s2.389333-13.653333 7.509333-18.432c5.12-4.778667 11.264-7.168 18.773334-7.168z m6.144-196.949333c22.186667 0 40.277333 5.802667 53.930666 18.090666 13.653333 11.946667 20.48 28.330667 20.48 49.152 0 17.066667-4.437333 31.061333-12.629333 41.984-3.072 3.413333-12.970667 12.629333-29.354667 26.965334a52.906667 52.906667 0 0 0-13.653333 17.066666c-3.413333 6.826667-5.12 13.994667-5.12 22.186667v4.778667h-39.253333v-4.778667c0-12.970667 2.048-24.234667 6.826666-33.450667 4.437333-9.216 17.749333-23.552 39.936-43.349333l4.096-4.778667c6.144-7.509333 9.216-15.701333 9.216-24.234666 0-11.264-3.413333-20.138667-9.557333-26.624-6.485333-6.485333-15.701333-9.557333-27.306667-9.557334-15.018667 0-25.6 4.437333-32.085333 13.994667-5.802667 7.850667-8.533333 19.114667-8.533333 33.450667h-38.912c0-25.258667 7.168-45.056 22.186666-59.392 14.677333-14.336 34.474667-21.504 59.733334-21.504zM640 231.018667V320h88.981333L640 231.018667z" p-id="39545"></path></svg>
    )
  }
)

if (__DEV__) {
  FileQuestionOutlined.displayName = 'FileQuestionOutlined'
}
  