"use client"

import * as React from "react"
import { PhoneField as PhoneFieldPrimitive } from "phonefield/radix"
import { Popover as PopoverPrimitive } from "radix-ui"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/bases/radix/ui/input-group"
import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

const PhoneFieldAnchorContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

function PhoneField({
  ref,
  children,
  ...props
}: Omit<PhoneFieldPrimitive.RootProps, "asChild" | "role">) {
  const anchorRef = React.useRef<HTMLDivElement | null>(null)
  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      anchorRef.current = node
      if (typeof ref === "function") {
        return ref(node)
      }
      if (ref) {
        ref.current = node
      }
    },
    [ref]
  )

  return (
    <PhoneFieldAnchorContext.Provider value={anchorRef}>
      <PhoneFieldPrimitive.Root
        data-slot="phone-field"
        ref={composedRef}
        asChild
        {...props}
      >
        <InputGroup>{children}</InputGroup>
      </PhoneFieldPrimitive.Root>
    </PhoneFieldAnchorContext.Provider>
  )
}

function PhoneFieldCountry({
  labels,
  ...props
}: Omit<PhoneFieldPrimitive.CountryProps, "children">) {
  const anchorRef = React.useContext(PhoneFieldAnchorContext)

  return (
    <PhoneFieldPrimitive.Country labels={labels} {...props}>
      <InputGroupAddon align="inline-start">
        <PhoneFieldPrimitive.CountryTrigger asChild>
          <InputGroupButton variant="ghost" size="xs">
            <PhoneFieldPrimitive.CountryValue />
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              className="cn-combobox-trigger-icon pointer-events-none"
            />
          </InputGroupButton>
        </PhoneFieldPrimitive.CountryTrigger>
      </InputGroupAddon>
      {anchorRef && (
        <PopoverPrimitive.Anchor
          virtualRef={anchorRef as React.RefObject<HTMLDivElement>}
        />
      )}
      <PhoneFieldPrimitive.CountryPortal>
        <PhoneFieldPrimitive.CountryContent
          data-slot="phone-field-country-content"
          side="bottom"
          align="start"
          sideOffset={6}
          collisionPadding={8}
          className="cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative isolate z-50 max-h-(--radix-popover-content-available-height) w-(--radix-popover-trigger-width) max-w-(--radix-popover-content-available-width) min-w-72 origin-(--radix-popover-content-transform-origin) [--available-height:var(--radix-popover-content-available-height)]"
        >
          <InputGroup className="w-auto">
            <PhoneFieldPrimitive.CountrySearch asChild>
              <InputGroupInput />
            </PhoneFieldPrimitive.CountrySearch>
            <InputGroupAddon>
              <IconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              />
            </InputGroupAddon>
          </InputGroup>
          <PhoneFieldPrimitive.CountryEmpty className="cn-combobox-empty not-empty:flex" />
          <PhoneFieldPrimitive.CountryList className="cn-combobox-list overflow-y-auto overscroll-contain *:data-preferred:-mx-1 *:data-preferred:mb-1 *:data-preferred:border-b *:data-preferred:px-1 *:data-preferred:pb-1">
            {(country) => (
              <PhoneFieldPrimitive.CountryItem
                country={country}
                className="cn-combobox-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
              >
                <span aria-hidden="true">{country.flag}</span>
                <span className="flex-1 truncate">{country.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {country.dialCode}
                </span>
                <PhoneFieldPrimitive.CountryItemIndicator className="cn-combobox-item-indicator">
                  <IconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                    className="cn-combobox-item-indicator-icon pointer-events-none"
                  />
                </PhoneFieldPrimitive.CountryItemIndicator>
              </PhoneFieldPrimitive.CountryItem>
            )}
          </PhoneFieldPrimitive.CountryList>
        </PhoneFieldPrimitive.CountryContent>
      </PhoneFieldPrimitive.CountryPortal>
    </PhoneFieldPrimitive.Country>
  )
}

function PhoneFieldInput({
  ...props
}: Omit<PhoneFieldPrimitive.InputProps, "asChild">) {
  return (
    <PhoneFieldPrimitive.Input
      data-slot="input-group-control"
      asChild
      {...props}
    >
      <InputGroupInput />
    </PhoneFieldPrimitive.Input>
  )
}

export { PhoneField, PhoneFieldCountry, PhoneFieldInput }
