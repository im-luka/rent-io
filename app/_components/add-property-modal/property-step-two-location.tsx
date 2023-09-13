"use client";

import { FC, Dispatch, useRef } from "react";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepAction, StepForm, StepType } from ".";
import { Actions } from "./actions";
import { useCountries } from "@/hooks/use-countries";
import { FormSelect } from "../base/form/select";
import { Box, Group, Stack, createStyles, rem } from "@mantine/core";
import { FormTextInput } from "../base/form/text-input";
import { Map, LatLngTuple } from "leaflet";
import { COUNTRY_SELECT_Z_INDEX } from "@/utils/constants";
import { PropertyMap } from "./property-map";
import { useTranslations } from "next-intl";

type Props = {
  formState: StepForm;
  dispatch: Dispatch<StepAction>;
};

export const PropertyStepTwoLocation: FC<Props> = (props) => {
  const {
    t,
    classes,
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
                label={t("country")}
                placeholder={t("country")}
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
          <Box className={classes.mapWrapper}>
            <PropertyMap ref={mapRef} center={defaultLatLng as LatLngTuple} />
          </Box>
          <Stack spacing="xs">
            <Group noWrap>
              <FormTextInput
                name="city"
                label={t("city")}
                placeholder={t("city")}
                withAsterisk
                w="100%"
                mb={addressErrors.cityStreet.city ? "md" : 0}
              />
              <FormTextInput
                name="street"
                label={t("street")}
                placeholder={t("street")}
                withAsterisk
                w="100%"
                mb={addressErrors.cityStreet.street ? "md" : 0}
              />
            </Group>
            <Group noWrap>
              <FormTextInput
                name="county"
                label={t("county")}
                placeholder={t("county")}
                w="100%"
                mb={addressErrors.countyPostalCode.county ? "md" : 0}
              />
              <FormTextInput
                name="postalCode"
                label={t("postalCode")}
                placeholder={t("postalCode")}
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
  const t = useTranslations("home.propertyModal.location");
  const { classes } = useStyles();
  const mapRef = useRef<Map>(null);
  const [countries, { getCountry }] = useCountries();

  const tValidation = useTranslations("validation");
  const stepTwoForm = useForm<PropertyStepTwoLocationFormValues>({
    resolver: zodResolver(
      propertyStepTwoLocationSchema(tValidation("required"))
    ),
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
    t,
    classes,
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

const useStyles = createStyles((theme) => ({
  mapWrapper: {
    height: rem(200),
    position: "relative",
    borderRadius: theme.radius.md,
  },
}));
