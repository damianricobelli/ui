"use client"

import * as React from "react"
import { cn } from "cn"
import { PhoneField as PhoneFieldPrimitive } from "phonefield/react-aria"

import { buttonVariants } from "@/registry/bases/aria/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/aria/ui/input-group"
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
        render={({ role: _role, ...rootProps }, state) => (
          <InputGroup
            {...rootProps}
            isDisabled={state.disabled}
            isInvalid={state.invalid}
            isReadOnly={state.readOnly}
          />
        )}
        {...props}
      />
    </PhoneFieldAnchorContext.Provider>
  )
}

function PhoneFieldCountry({
  labels,
  ...props
}: Omit<PhoneFieldPrimitive.CountryProps, "children" | "className" | "style">) {
  const anchorRef = React.useContext(PhoneFieldAnchorContext)

  return (
    <PhoneFieldPrimitive.Country
      data-slot="input-group-addon"
      data-align="inline-start"
      className="cn-input-group-addon cn-input-group-addon-align-inline-start order-first flex cursor-text items-center justify-center select-none group-data-[disabled=true]/input-group:opacity-100"
      labels={labels}
      {...props}
    >
      <PhoneFieldPrimitive.CountryTrigger
        data-variant="ghost"
        data-size="xs"
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: cn(
              "cn-input-group-button cn-input-group-button-size-xs flex items-center shadow-none"
            ),
          })
        )}
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
      <PhoneFieldPrimitive.CountryPopover
        data-slot="phone-field-country-content"
        placement="bottom start"
        offset={6}
        containerPadding={8}
        triggerRef={anchorRef ?? undefined}
        className="cn-combobox-content-aria cn-menu-target cn-menu-translucent relative isolate z-50 flex w-(--trigger-width) min-w-72 origin-(--trigger-anchor-point) flex-col"
      >
        <PhoneFieldPrimitive.CountrySearch
          data-slot="input-group"
          className="group/input-group cn-input-group relative flex w-auto min-w-0 items-center outline-none"
        >
          <PhoneFieldPrimitive.CountrySearchInput className="cn-input cn-input-group-input w-full min-w-0 flex-1 outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none" />
          <InputGroupAddon>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </InputGroupAddon>
        </PhoneFieldPrimitive.CountrySearch>
        <PhoneFieldPrimitive.CountryList
          className="cn-combobox-list group/combobox-content max-h-[calc(--spacing(72)---spacing(9))] min-h-0 flex-1 overflow-y-auto overscroll-contain *:data-preferred:-mx-1 *:data-preferred:mb-1 *:data-preferred:border-b *:data-preferred:px-1 *:data-preferred:pb-1"
          renderEmptyState={() => (
            <PhoneFieldPrimitive.CountryEmpty className="cn-combobox-empty" />
          )}
        >
          {(country) => (
            <PhoneFieldPrimitive.CountryItem
              country={country}
              className="cn-combobox-item cn-combobox-item-aria relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
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
      </PhoneFieldPrimitive.CountryPopover>
    </PhoneFieldPrimitive.Country>
  )
}

function PhoneFieldInput({
  ...props
}: Omit<PhoneFieldPrimitive.InputProps, "render">) {
  return (
    <PhoneFieldPrimitive.Input
      data-slot="input-group-control"
      render={(inputProps) => <InputGroupInput {...inputProps} />}
      {...props}
    />
  )
}

export { PhoneField, PhoneFieldCountry, PhoneFieldInput }
