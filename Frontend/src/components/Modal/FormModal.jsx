import React from 'react'
import { Input, Button, FeedbackMessage } from '..'

function FormModal({
  modalId,
  primaryHandler,
  secondaryHandler,
  iconClass,
  heading,
  message,
  primaryBtnText,
  secondaryBtnText,
  feedbackMessage = {},
  ctaDanger,
  ctaDisabled,
  btnLoading,
  onChange_1,
  onChange_2,
  onChange_3,
  charLimit,
  inputFeildSpecs = [],
  inputFeild_1Value,
  inputFeild_2Value,
  inputFeild_3Value,
  imputFeild_1Error,
  imputFeild_2Error,
  imputFeild_3Error }) {
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const refs = [
    ref1,
    ref2,
    ref3
  ]
  const inputValue = [
    inputFeild_1Value,
    inputFeild_2Value,
    inputFeild_3Value
  ]
  const inputError = [
    imputFeild_1Error,
    imputFeild_2Error,
    imputFeild_3Error
  ]
  const onChange = [
    onChange_1,
    onChange_2,
    onChange_3
  ]

  return (
    <div className='w-fit rounded-3xl p-1.5vw bg-white dark:bg-darkPrimary max-w-30vw absolute modalAnim '>
      <div id={`formModal-header-${modalId}`} className='flex justify-start gap-4 items-center text-1.7vw font-medium'>
        <span className={`${iconClass} ${ctaDanger ? "text-danger" : "text-blue-400"} text-2vw`}></span>
        <h1 className=''>{heading}</h1>
      </div>
      <div id={`formModal-body-${modalId}`} className='text-toastDarkModeBg dark:text-footer_text text-0.9vw mt-0.5vw mb-0.5vw'>
        <p>{message}</p>
        <FeedbackMessage
          id={`${modalId}-formModal-feedback`}
          err={feedbackMessage.type === "err"}
          className='pl-none mt-1vw text-1vw'
          iconType='solid'
        >
          {feedbackMessage.message}
        </FeedbackMessage>
      </div>
      <div id={`formModal-inputs-${modalId}`}>
        {inputFeildSpecs.map((inputFeildSpec, idx) => {
          return (
            <Input ref={idx === 0 ? refs[0] : idx === 1 ? refs[1] : refs[2]}
              value={inputValue[idx]}
              onChange={onChange[idx]}
              key={modalId + idx}
              icon={false}
              type={inputFeildSpec.type}
              className_container="w-20vw px-1.5vw py-1vw"
              style={{ width: "100%" }}
              className_input={inputFeildSpec.text_area || "pl-0"}
              text_area={inputFeildSpec.text_area}
              errMsg={inputError[idx]}
              charLimit={charLimit} />
          )
        })}
      </div>
      <div id={`formModal-footer-${modalId}`} className='flex items-center justify-end gap-2 mt-2vw'>
        <Button
          outline
          id={`${modalId}-formModal-secondary`}
          onClick={secondaryHandler}
          className='text-1vw'
        >
          {secondaryBtnText}
        </Button>
        <Button
          primary={!ctaDisabled && !ctaDanger}
          danger={ctaDanger && !ctaDisabled}
          disabled={ctaDisabled}
          loading={btnLoading}
          id={`${modalId}-formModal-cta`}
          onClick={primaryHandler}
          className='text-1vw'
        >
          {primaryBtnText}
        </Button>
      </div>

    </div>
  )
}

export default FormModal