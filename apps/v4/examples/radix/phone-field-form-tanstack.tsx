/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import type { PhoneField as PhoneFieldPrimitive } from "phonefield/radix"
import { getExampleNumber, isValid } from "phonefield/utils"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/styles/radix-nova/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/radix-nova/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/styles/radix-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/radix-nova/ui/phone-field"

const formSchema = z.object({
  phone: z
    .custom<PhoneFieldPrimitive.InputValue>()
    .refine((phone) => isValid(phone), "Enter a valid phone number."),
})

const defaultPhone: PhoneFieldPrimitive.InputValue = {
  countryIso2: "US",
  nationalNumber: "",
}

export default function PhoneFieldFormTanstack() {
  const form = useForm({
    defaultValues: {
      phone: defaultPhone,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
            <code>{JSON.stringify(value, null, 2)}</code>
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
    },
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>
          Add a phone number to secure your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="phone-field-form-tanstack"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="phone-field-form-tanstack-phone">
                      Phone number
                    </FieldLabel>
                    <PhoneField
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      invalid={isInvalid}
                      autoInvalid={false}
                    >
                      <PhoneFieldCountry />
                      <PhoneFieldInput
                        id="phone-field-form-tanstack-phone"
                        placeholder={(country) =>
                          getExampleNumber(country.iso2)
                        }
                      />
                    </PhoneField>
                    <FieldDescription>
                      We&apos;ll send a verification code to this number.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="phone-field-form-tanstack">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
