"use client";

import "leaflet/dist/leaflet.css";
import {
  AddPropertyModal,
  PropertyModalRef,
  StepForm,
} from "@/app/_components/add-property-modal";
import { CategoryWrapper } from "@/app/_components/categories/category-wrapper";
import {
  CategoryFormValues,
  NewCategoryModal,
} from "@/app/_components/categories/new-category-modal";
import { categoryMutation } from "@/domain/mutations/category-mutation";
import { categoryQuery } from "@/domain/queries/categories-query";
import { useModal } from "@/hooks/use-modal";
import { useNotification } from "@/hooks/use-notification";
import { Group } from "@mantine/core";
import { Category } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { propertyMutation } from "@/domain/mutations/property-mutation";
import { useRef } from "react";
import { propertiesQuery } from "@/domain/queries/properties-query";
import { PropertyWrapper } from "@/app/_components/properties/property-wrapper";
import { CategoriesSpotlight } from "@/app/_components/categories/categories-spotlight";
import { useCategoryQuery } from "@/hooks/use-category-query";
import { DEFAULT_PAGE, HOME_PROPERTIES_PER_PAGE } from "@/utils/constants";
import { PropertyWithPagination } from "@/types/property";
import { useQueryPagination } from "@/hooks/use-query-pagination";

export default function HomePage() {
  const {
    propertyModalRef,
    isOpen,
    open,
    close,
    categories,
    isAddingCategory,
    handleCategorySubmit,
    properties,
    propertiesLoading,
    isAddingProperty,
    handlePropertySubmit,
  } = useHomePage();

  return (
    <CategoriesSpotlight categories={categories ?? []}>
      <Group align="start">
        <Group h="100%" align="start">
          <CategoryWrapper categories={categories} onOpen={open} />
          <NewCategoryModal
            opened={isOpen.addCategory}
            onClose={close}
            onSubmit={handleCategorySubmit}
            isAdding={isAddingCategory}
          />
        </Group>
        <Group h="100%" align="start" className="flex-1">
          <PropertyWrapper
            properties={properties}
            isLoading={propertiesLoading}
          />
          <AddPropertyModal
            ref={propertyModalRef}
            opened={isOpen.addProperty}
            onClose={close}
            onSubmit={handlePropertySubmit}
            isAdding={isAddingProperty}
          />
        </Group>
      </Group>
    </CategoriesSpotlight>
  );
}

function useHomePage() {
  const propertyModalRef = useRef<PropertyModalRef>(null);
  const { onSuccess } = useNotification();
  const [{ isOpen }, { open, close }] = useModal();
  const [{ page, perPage }] = useQueryPagination();
  const [{ categoryId }] = useCategoryQuery();

  const { data: categories, refetch: categoriesRefetch } = useQuery<Category[]>(
    categoryQuery.key
  );
  const { mutateAsync: addCategory, isLoading: isAddingCategory } = useMutation(
    categoryMutation.fnc,
    {
      onSuccess: () => {
        onSuccess()("category");
        close();
        categoriesRefetch();
      },
    }
  );

  const {
    data: properties,
    isLoading: propertiesLoading,
    refetch: propertiesRefetch,
  } = useQuery<PropertyWithPagination>(
    propertiesQuery.key({
      category: categoryId || undefined,
      page: page || DEFAULT_PAGE,
      perPage: perPage || HOME_PROPERTIES_PER_PAGE,
    }),
    {
      keepPreviousData: true,
    }
  );
  const { mutateAsync: addProperty, isLoading: isAddingProperty } = useMutation(
    propertyMutation.fnc,
    {
      onSuccess: () => {
        onSuccess()("property");
        close();
        propertiesRefetch();
        propertyModalRef.current?.resetForm();
      },
    }
  );

  const handleCategorySubmit = async (values: CategoryFormValues) => {
    await addCategory(values);
  };

  const handlePropertySubmit = async (values: StepForm) => {
    const {
      baseInfo,
      category: categories,
      image,
      misc,
      location: { latlng, ...restLocation },
    } = values;

    await addProperty({
      ...baseInfo,
      categories,
      image,
      ...misc,
      ...restLocation,
    });
  };

  return {
    propertyModalRef,
    isOpen,
    open,
    close,
    categories,
    isAddingCategory,
    handleCategorySubmit,
    properties,
    propertiesLoading,
    isAddingProperty,
    handlePropertySubmit,
  };
}
