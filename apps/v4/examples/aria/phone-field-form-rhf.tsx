"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import type { PhoneField as PhoneFieldPrimitive } from "phonefield/react-aria"
import { getExampleNumber, isValid } from "phonefield/utils"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/styles/aria-nova/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/styles/aria-nova/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/styles/aria-nova/ui/field"
import {
  PhoneField,
  PhoneFieldCountry,
  PhoneFieldInput,
} from "@/styles/aria-nova/ui/phone-field"

const formSchema = z.object({
  phone: z
    .custom<PhoneFieldPrimitive.InputValue>()
    .refine((phone) => isValid(phone), "Enter a valid phone number."),
})

export default function PhoneFieldFormRhf() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: { countryIso2: "US", nationalNumber: "" },
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
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
        <form id="phone-field-form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone-field-form-rhf-phone">
                    Phone number
                  </FieldLabel>
                  <PhoneField
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={fieldState.invalid}
                    autoInvalid={false}
                  >
                    <PhoneFieldCountry />
                    <PhoneFieldInput
                      ref={field.ref}
                      id="phone-field-form-rhf-phone"
                      placeholder={(country) => getExampleNumber(country.iso2)}
                    />
                  </PhoneField>
                  <FieldDescription>
                    We&apos;ll send a verification code to this number.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="phone-field-form-rhf">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
