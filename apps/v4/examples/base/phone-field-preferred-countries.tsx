"use client"

import { Field, FieldLabel } from "@/styles/base-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

export default function PhoneFieldPreferredCountries() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="phone-field-preferred-countries">
        Phone number
      </FieldLabel>
      <PhoneField defaultCountry="US" preferredCountries={["US", "CA", "MX"]}>
        <PhoneFieldCountry />
        <PhoneFieldInput id="phone-field-preferred-countries" />
      </PhoneField>
    </Field>
  )
}
