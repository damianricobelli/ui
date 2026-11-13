"use client"

import { CheckIcon } from "lucide-react"
import { usePhoneField } from "phonefield"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import { InputGroupAddon } from "@/styles/base-nova/ui/input-group"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

function PhoneFieldValidIcon() {
  const { state } = usePhoneField()

  if (!state.valid) {
    return null
  }

  return (
    <InputGroupAddon align="inline-end">
      <CheckIcon />
    </InputGroupAddon>
  )
}

export default function PhoneFieldCustomParts() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="phone-field-custom-parts">Phone number</FieldLabel>
      <PhoneField defaultCountry="US">
        <PhoneFieldCountry />
        <PhoneFieldInput id="phone-field-custom-parts" />
        <PhoneFieldValidIcon />
      </PhoneField>
      <FieldDescription>
        A check mark appears once the number is valid.
      </FieldDescription>
    </Field>
  )
}
