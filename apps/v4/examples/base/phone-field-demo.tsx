"use client"

import { getExampleNumber } from "phonefield/utils"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

export default function PhoneFieldDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="phone-field-demo">Phone number</FieldLabel>
      <PhoneField defaultCountry="US">
        <PhoneFieldCountry />
        <PhoneFieldInput
          id="phone-field-demo"
          placeholder={(country) => getExampleNumber(country.iso2)}
        />
      </PhoneField>
      <FieldDescription>
        We&apos;ll send a verification code to this number.
      </FieldDescription>
    </Field>
  )
}
