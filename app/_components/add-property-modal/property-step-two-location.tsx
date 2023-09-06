"use client";

import { FC, Dispatch, useState } from "react";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepAction, StepForm, StepType } from ".";
import { Actions } from "./actions";
import { useCountries } from "@/hooks/use-countries";
import { FormSelect } from "../base/form/select";
import { Box, Group, Stack } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  COUNTRY_MAP_DEFAULT_ZOOM,
  COUNTRY_MAP_MAX_ZOOM,
  COUNTRY_MAP_MIN_ZOOM,
  COUNTRY_SELECT_Z_INDEX,
} from "@/utils/constants";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepTwoLocation: FC<Props> = (props) => {
  const {
    stepTwoForm,
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
                  handleChange(value);
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
            <MapContainer
              center={[51.505, -0.09]}
              attributionControl={false}
              zoomControl={false}
              scrollWheelZoom={false}
              zoom={COUNTRY_MAP_DEFAULT_ZOOM}
              minZoom={COUNTRY_MAP_MIN_ZOOM}
              maxZoom={COUNTRY_MAP_MAX_ZOOM}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                borderRadius: "8px",
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
            </MapContainer>
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
  const [country, setCountry] = useState<string>(formState.location.country);
  const [countries] = useCountries();

  const stepTwoForm = useForm<PropertyStepTwoLocationFormValues>({
    resolver: zodResolver(propertyStepTwoLocationSchema("required field!")),
    defaultValues: { ...formState.location, postalCode: undefined },
  });
  const {
    formState: { errors },
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

  const handleChange = (value: string | null) => {
    setCountry(countries.find((c) => c.id === value)?.id ?? "");
  };

  const handlePrevButton = () => dispatch({ type: StepType.PREVIOUS });

  const onSubmit = (values: PropertyStepTwoLocationFormValues) => {
    dispatch({ type: StepType.NEXT, payload: { location: values } });
  };

  return {
    stepTwoForm,
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
    postalCode: z.number({ required_error: required }),
    county: z.string(),
  });
