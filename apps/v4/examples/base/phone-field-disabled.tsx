"use client"

import { Field, FieldLabel } from "@/styles/base-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

export default function PhoneFieldDisabled() {
  return (
    <Field className="w-full max-w-xs" data-disabled>
      <FieldLabel htmlFor="phone-field-disabled">Phone number</FieldLabel>
      <PhoneField
        disabled
        defaultValue={{ countryIso2: "US", nationalNumber: "2015550123" }}
      >
        <PhoneFieldCountry />
        <PhoneFieldInput id="phone-field-disabled" />
      </PhoneField>
    </Field>
  )
}
