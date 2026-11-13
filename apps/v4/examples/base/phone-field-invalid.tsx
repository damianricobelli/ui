"use client"

import { Field, FieldError, FieldLabel } from "@/styles/base-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

export default function PhoneFieldInvalid() {
  return (
    <Field className="w-full max-w-xs" data-invalid>
      <FieldLabel htmlFor="phone-field-invalid">Phone number</FieldLabel>
      <PhoneField
        invalid
        defaultValue={{ countryIso2: "US", nationalNumber: "201555" }}
      >
        <PhoneFieldCountry />
        <PhoneFieldInput id="phone-field-invalid" />
      </PhoneField>
      <FieldError>Enter a valid phone number.</FieldError>
    </Field>
  )
}
