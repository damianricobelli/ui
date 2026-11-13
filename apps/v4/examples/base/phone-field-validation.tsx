"use client"

import * as React from "react"
import type { PhoneField as PhoneFieldPrimitive } from "phonefield"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

export default function PhoneFieldValidation() {
  const [value, setValue] = React.useState<PhoneFieldPrimitive.Value | null>(
    null
  )
  const [touched, setTouched] = React.useState(false)
  const invalid = touched && !value?.isValid

  return (
    <Field className="w-full max-w-xs" data-invalid={invalid}>
      <FieldLabel htmlFor="phone-field-validation">Phone number</FieldLabel>
      <PhoneField
        defaultCountry="AR"
        onValueChange={setValue}
        onBlur={() => setTouched(true)}
        invalid={invalid}
        autoInvalid={false}
      >
        <PhoneFieldCountry />
        <PhoneFieldInput id="phone-field-validation" />
      </PhoneField>
      {invalid ? (
        <FieldError>Enter a valid phone number.</FieldError>
      ) : (
        <FieldDescription>
          {value?.isValid
            ? `E.164: ${value.e164}`
            : "The number is validated when you leave the field."}
        </FieldDescription>
      )}
    </Field>
  )
}
