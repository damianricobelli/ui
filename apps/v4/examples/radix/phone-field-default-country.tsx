"use client"

import { getExampleNumber } from "phonefield/utils"

import { Field, FieldLabel } from "@/styles/radix-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/radix-nova/ui/phone-field"

export default function PhoneFieldDefaultCountry() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="phone-field-default-country">
        Phone number
      </FieldLabel>
      <PhoneField defaultCountry="GB">
        <PhoneFieldCountry />
        <PhoneFieldInput
          id="phone-field-default-country"
          placeholder={(country) => getExampleNumber(country.iso2)}
        />
      </PhoneField>
    </Field>
  )
}
