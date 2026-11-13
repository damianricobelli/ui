"use client"

import * as React from "react"
import type { PhoneField as PhoneFieldPrimitive } from "phonefield/react-aria"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/aria-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/aria-nova/ui/phone-field"

export default function PhoneFieldControlled() {
  const [value, setValue] = React.useState<
    PhoneFieldPrimitive.InputValue | PhoneFieldPrimitive.Value
  >({ countryIso2: "US", nationalNumber: "" })

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="phone-field-controlled">Phone number</FieldLabel>
      <PhoneField value={value} onValueChange={setValue}>
        <PhoneFieldCountry />
        <PhoneFieldInput id="phone-field-controlled" />
      </PhoneField>
      <FieldDescription>
        {"e164" in value && value.e164
          ? `You entered ${value.e164}.`
          : "Enter a phone number."}
      </FieldDescription>
    </Field>
  )
}
