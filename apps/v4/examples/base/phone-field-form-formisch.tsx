"use client"

import * as React from "react"
import { Form, Field as FormischField, reset, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import type { PhoneField as PhoneFieldPrimitive } from "phonefield"
import { getExampleNumber, isValid } from "phonefield/utils"
import { toast } from "sonner"
import * as v from "valibot"

import { Button } from "@/styles/base-nova/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/base-nova/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/styles/base-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/base-nova/ui/phone-field"

const FormSchema = v.object({
  phone: v.custom<PhoneFieldPrimitive.InputValue>(
    (input) => isValid(input as PhoneFieldPrimitive.InputValue),
    "Enter a valid phone number."
  ),
})

export default function PhoneFieldFormFormisch() {
  const form = useForm({
    schema: FormSchema,
    initialInput: {
      phone: { countryIso2: "US", nationalNumber: "" },
    },
  })

  const handleSubmit: SubmitHandler<typeof FormSchema> = (output) => {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(output, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>
          Add a phone number to secure your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form of={form} id="phone-field-form-formisch" onSubmit={handleSubmit}>
          <FieldGroup>
            <FormischField of={form} path={["phone"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="phone-field-form-formisch-phone">
                    Phone number
                  </FieldLabel>
                  <PhoneField
                    value={{
                      countryIso2: field.input?.countryIso2 ?? "US",
                      nationalNumber: field.input?.nationalNumber ?? "",
                    }}
                    onValueChange={(value) => field.onChange(value)}
                    invalid={field.errors !== null}
                    autoInvalid={false}
                  >
                    <PhoneFieldCountry />
                    <PhoneFieldInput
                      ref={field.props.ref}
                      id="phone-field-form-formisch-phone"
                      placeholder={(country) => getExampleNumber(country.iso2)}
                    />
                  </PhoneField>
                  <FieldDescription>
                    We&apos;ll send a verification code to this number.
                  </FieldDescription>
                  {field.errors && (
                    <FieldError
                      errors={field.errors.map((message) => ({ message }))}
                    />
                  )}
                </Field>
              )}
            </FormischField>
          </FieldGroup>
        </Form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset(form)}>
            Reset
          </Button>
          <Button type="submit" form="phone-field-form-formisch">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
