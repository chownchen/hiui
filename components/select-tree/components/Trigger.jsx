import React from 'react'
import classNames from 'classnames'
import { transKeys } from './tree/util'
const Trigger = ({
  inputRef,
  type,
  selectedItems,
  onTrigger,
  checkedEvents,
  onClear,
  showCount,
  clearable,
  show,
  selectedItemsRef,
  placeholder,
  valueRender,
  isFocus,
  disabled,
  bordered,
  fieldNames
}) => {
  return (
    <div
      ref={inputRef}
      className={classNames(
        'hi-selecttree__input',
        {
          'hi-selecttree__input--focus': isFocus,
          'hi-selecttree__input--disabled': disabled,
          bordered
        },
        type !== 'multiple' && 'hi-selecttree__input--single',
        selectedItems.length === 0 && 'hi-selecttree__input--placeholder'
      )}
      onClick={() => {
        !disabled && onTrigger()
      }}
    >
      <div className="hi-selecttree__selected-wrapper" ref={selectedItemsRef}>
        {valueRender ? (
          valueRender(selectedItems)
        ) : (
          <>
            <div className="hi-selecttree__selected--hidden">
              {selectedItems.map((node, index) => (
                <span key={index}>{(node && node[transKeys(fieldNames, 'title')]) || ''}</span>
              ))}
            </div>
            {selectedItems.length === 0 && <span>{placeholder}</span>}
            {selectedItems.length > 0 &&
              selectedItems.slice(0, showCount || 1).map((node, index) => {
                return (
                  <div key={index} className="hi-selecttree__selecteditem">
                    <div className="hi-selecttree__selecteditem-name">
                      {(node && node[transKeys(fieldNames, 'title')]) || ''}
                    </div>
                    {type === 'multiple' && (
                      <span
                        className="hi-selecttree__selecteditem-remove"
                        onClick={(e) => {
                          e.stopPropagation()
                          checkedEvents(false, node)
                        }}
                      >
                        <i className="hi-icon icon-close" />
                      </span>
                    )}
                  </div>
                )
              })}
            {!!showCount && showCount < selectedItems.length && (
              <div className="hi-selecttree__input-items--left">
                +<span>{selectedItems.length - showCount}</span>
              </div>
            )}
          </>
        )}
      </div>

      <span className="hi-selecttree__input-icon">
        <i
          className={classNames(`hi-icon icon-${show ? 'up' : 'down'} hi-selecttree__input--expand`, {
            clearable: clearable && selectedItems.length > 0
          })}
        />
        {clearable && selectedItems.length > 0 && (
          <i
            className={`hi-icon icon-close-circle hi-selecttree__icon-close`}
            onClick={(e) => {
              e.stopPropagation()
              onClear && onClear()
            }}
          />
        )}
      </span>
    </div>
  )
}

export default Trigger
