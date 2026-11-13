"use client"

import { Field, FieldGroup, FieldLabel } from "@/styles/radix-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/radix-nova/ui/phone-field"

export default function PhoneFieldFormat() {
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field>
        <FieldLabel htmlFor="phone-field-format-on">Formatted</FieldLabel>
        <PhoneField
          defaultValue={{ countryIso2: "US", nationalNumber: "2015550123" }}
        >
          <PhoneFieldCountry />
          <PhoneFieldInput id="phone-field-format-on" />
        </PhoneField>
      </Field>
      <Field>
        <FieldLabel htmlFor="phone-field-format-off">Unformatted</FieldLabel>
        <PhoneField
          formatOnType={false}
          defaultValue={{ countryIso2: "US", nationalNumber: "2015550123" }}
        >
          <PhoneFieldCountry />
          <PhoneFieldInput id="phone-field-format-off" />
        </PhoneField>
      </Field>
    </FieldGroup>
  )
}
