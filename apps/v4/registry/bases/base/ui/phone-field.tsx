"use client"

import * as React from "react"
import { PhoneField as PhoneFieldPrimitive } from "phonefield"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/bases/base/ui/input-group"
import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

const PhoneFieldAnchorContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

function PhoneField({
  ref,
  ...props
}: Omit<PhoneFieldPrimitive.RootProps, "render" | "role">) {
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
        render={<InputGroup />}
        {...props}
      />
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
        <PhoneFieldPrimitive.CountryTrigger
          render={<InputGroupButton variant="ghost" size="xs" />}
        >
          <PhoneFieldPrimitive.CountryValue />
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconSelector"
            hugeicons="UnfoldMoreIcon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            className="cn-combobox-trigger-icon pointer-events-none"
          />
        </PhoneFieldPrimitive.CountryTrigger>
      </InputGroupAddon>
      <PhoneFieldPrimitive.CountryPortal>
        <PhoneFieldPrimitive.CountryPositioner
          side="bottom"
          align="start"
          sideOffset={6}
          collisionPadding={8}
          anchor={anchorRef}
          className="isolate z-50"
        >
          <PhoneFieldPrimitive.CountryPopup
            data-slot="phone-field-country-content"
            className="cn-combobox-content cn-combobox-content-logical cn-menu-target cn-menu-translucent group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-72 origin-(--transform-origin)"
          >
            <InputGroup className="w-auto">
              <PhoneFieldPrimitive.CountrySearch render={<InputGroupInput />} />
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
            <PhoneFieldPrimitive.CountryEmpty className="cn-combobox-empty" />
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
                  <PhoneFieldPrimitive.CountryItemIndicator
                    render={<span className="cn-combobox-item-indicator" />}
                  >
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
          </PhoneFieldPrimitive.CountryPopup>
        </PhoneFieldPrimitive.CountryPositioner>
      </PhoneFieldPrimitive.CountryPortal>
    </PhoneFieldPrimitive.Country>
  )
}

function PhoneFieldInput({
  ...props
}: Omit<PhoneFieldPrimitive.InputProps, "render">) {
  return (
    <PhoneFieldPrimitive.Input
      data-slot="input-group-control"
      render={<InputGroupInput />}
      {...props}
    />
  )
}

export { PhoneField, PhoneFieldCountry, PhoneFieldInput }
