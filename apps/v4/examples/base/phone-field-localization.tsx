"use client"

import { Field, FieldLabel } from "@/styles/base-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

export default function PhoneFieldLocalization() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="phone-field-localization">Teléfono</FieldLabel>
      <PhoneField defaultCountry="ES" lang="es">
        <PhoneFieldCountry
          labels={{
            search: "Buscar país",
            empty: "No se encontraron países.",
          }}
        />
        <PhoneFieldInput id="phone-field-localization" />
      </PhoneField>
    </Field>
  )
}
