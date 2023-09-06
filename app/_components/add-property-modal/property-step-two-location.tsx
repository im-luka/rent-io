"use client";

import { FC, Dispatch, useRef } from "react";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepAction, StepForm, StepType } from ".";
import { Actions } from "./actions";
import { useCountries } from "@/hooks/use-countries";
import { FormSelect } from "../base/form/select";
import { Box, Group, Stack } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";
import { Map, LatLngTuple } from "leaflet";
import { COUNTRY_SELECT_Z_INDEX } from "@/utils/constants";
import { PropertyMap } from "./property-map";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepTwoLocation: FC<Props> = (props) => {
  const {
    mapRef,
    stepTwoForm,
    defaultLatLng,
    countries,
    addressErrors,
    handleChange,
    handlePrevButton,
    onSubmit,
  } = usePropertyStepTwoLocation(props);

  return (
    <FormProvider {...stepTwoForm}>
      <form onSubmit={onSubmit}>
        <Stack>
          <Controller
            name="country"
            render={({ field }) => (
              <FormSelect
                name="country"
                label="Country"
                placeholder="Select Country"
                data={countries.map(({ id, flag, name }) => ({
                  value: id,
                  label: `${flag} ${name}`,
                }))}
                onChange={(value) => {
                  field.onChange(value);
                  handleChange(value!);
                }}
                dropdownPosition="bottom"
                searchable
                allowDeselect
                withAsterisk
                zIndex={COUNTRY_SELECT_Z_INDEX}
              />
            )}
          />
          <Box
            sx={{
              height: "200px",
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <PropertyMap ref={mapRef} center={defaultLatLng as LatLngTuple} />
          </Box>
          <Stack spacing="xs">
            <Group noWrap>
              <FormTextInput
                name="city"
                label="City"
                placeholder="City"
                withAsterisk
                w="100%"
                mb={addressErrors.cityStreet.city ? "md" : 0}
              />
              <FormTextInput
                name="street"
                label="Street"
                placeholder="Street"
                withAsterisk
                w="100%"
                mb={addressErrors.cityStreet.street ? "md" : 0}
              />
            </Group>
            <Group noWrap>
              <FormTextInput
                name="county"
                label="County"
                placeholder="County"
                w="100%"
                mb={addressErrors.countyPostalCode.county ? "md" : 0}
              />
              <FormTextInput
                name="postalCode"
                label="Postal Code"
                placeholder="Postal Code"
                withAsterisk
                w="100%"
                mb={addressErrors.countyPostalCode.postalCode ? "md" : 0}
              />
            </Group>
          </Stack>
        </Stack>
        <Actions handlePrevButton={handlePrevButton} />
      </form>
    </FormProvider>
  );
};

function usePropertyStepTwoLocation({ formState, dispatch }: Props) {
  const mapRef = useRef<Map>(null);
  const [countries, { getCountry }] = useCountries();

  const stepTwoForm = useForm<PropertyStepTwoLocationFormValues>({
    resolver: zodResolver(propertyStepTwoLocationSchema("required field!")),
    defaultValues: formState.location,
  });
  const {
    formState: { errors },
    setValue,
    handleSubmit,
  } = stepTwoForm;
  const addressErrors = {
    cityStreet: {
      city: !!(!errors.city && errors.street),
      street: !!(!errors.street && errors.city),
    },
    countyPostalCode: {
      county: !!(!errors.county && errors.postalCode),
      postalCode: !!(!errors.postalCode && errors.county),
    },
  };
  const defaultLatLng = formState.location.latlng;

  const handleChange = (value: string) => {
    const country = getCountry(value);
    if (country) {
      setValue("latlng", country.latlng);
      mapRef.current?.flyTo(country.latlng, undefined, { duration: 1 });
    }
  };

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const onSubmit = (values: PropertyStepTwoLocationFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { location: values } });
  };

  return {
    mapRef,
    stepTwoForm,
    defaultLatLng,
    countries,
    addressErrors,
    handleChange,
    handlePrevButton,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type PropertyStepTwoLocationFormValues = z.infer<
  ReturnType<typeof propertyStepTwoLocationSchema>
>;
const propertyStepTwoLocationSchema = (required: string) =>
  z.object({
    country: z.string().nonempty(required),
    city: z.string().nonempty(required),
    street: z.string().nonempty(required),
    postalCode: z.string().nonempty(required),
    county: z.string(),
    latlng: z.array(z.number().optional()),
  });
