"use client"

import * as React from "react"
import type { PhoneField as PhoneFieldTypes } from "phonefield"
import { getExampleNumber } from "phonefield/utils"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/bases/base/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/registry/bases/base/ui/phone-field"

export default function PhoneFieldExample() {
  return (
    <ExampleWrapper>
      <PhoneFieldBasic />
      <PhoneFieldDefaultCountry />
      <PhoneFieldPreferredCountries />
      <PhoneFieldRestrictedCountries />
      <PhoneFieldControlled />
      <PhoneFieldDisabled />
      <PhoneFieldInvalid />
    </ExampleWrapper>
  )
}

function PhoneFieldBasic() {
  return (
    <Example title="Basic">
      <Field>
        <FieldLabel htmlFor="phone-field-basic">Phone number</FieldLabel>
        <PhoneField>
          <PhoneFieldCountry />
          <PhoneFieldInput
            id="phone-field-basic"
            placeholder={(country) => getExampleNumber(country.iso2)}
          />
        </PhoneField>
      </Field>
    </Example>
  )
}

function PhoneFieldDefaultCountry() {
  return (
    <Example title="Default Country">
      <Field>
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
    </Example>
  )
}

function PhoneFieldPreferredCountries() {
  return (
    <Example title="Preferred Countries">
      <Field>
        <FieldLabel htmlFor="phone-field-preferred">Phone number</FieldLabel>
        <PhoneField defaultCountry="US" preferredCountries={["US", "CA", "MX"]}>
          <PhoneFieldCountry />
          <PhoneFieldInput id="phone-field-preferred" />
        </PhoneField>
      </Field>
    </Example>
  )
}

function PhoneFieldRestrictedCountries() {
  return (
    <Example title="Restricted Countries">
      <Field>
        <FieldLabel htmlFor="phone-field-restricted">Phone number</FieldLabel>
        <PhoneField defaultCountry="AR" countries={["AR", "BR", "CL", "UY"]}>
          <PhoneFieldCountry />
          <PhoneFieldInput id="phone-field-restricted" />
        </PhoneField>
        <FieldDescription>Only available in South America.</FieldDescription>
      </Field>
    </Example>
  )
}

function PhoneFieldControlled() {
  const [value, setValue] = React.useState<
    PhoneFieldTypes.InputValue | PhoneFieldTypes.Value
  >({
    countryIso2: "US",
    nationalNumber: "",
  })

  return (
    <Example title="Controlled">
      <Field>
        <FieldLabel htmlFor="phone-field-controlled">Phone number</FieldLabel>
        <PhoneField value={value} onValueChange={setValue}>
          <PhoneFieldCountry />
          <PhoneFieldInput id="phone-field-controlled" />
        </PhoneField>
        <FieldDescription>
          {"e164" in value && value.e164 ? value.e164 : "No number yet."}
        </FieldDescription>
      </Field>
    </Example>
  )
}

function PhoneFieldDisabled() {
  return (
    <Example title="Disabled">
      <Field data-disabled>
        <FieldLabel htmlFor="phone-field-disabled">Phone number</FieldLabel>
        <PhoneField
          disabled
          defaultValue={{ countryIso2: "US", nationalNumber: "2015550123" }}
        >
          <PhoneFieldCountry />
          <PhoneFieldInput id="phone-field-disabled" />
        </PhoneField>
      </Field>
    </Example>
  )
}

function PhoneFieldInvalid() {
  return (
    <Example title="Invalid">
      <Field data-invalid>
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
    </Example>
  )
}
