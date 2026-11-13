"use client"

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

export default function PhoneFieldCountries() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="phone-field-countries">Phone number</FieldLabel>
      <PhoneField defaultCountry="AR" countries={["AR", "BR", "CL", "UY"]}>
        <PhoneFieldCountry />
        <PhoneFieldInput id="phone-field-countries" />
      </PhoneField>
      <FieldDescription>
        We only ship to Argentina, Brazil, Chile, and Uruguay.
      </FieldDescription>
    </Field>
  )
}
