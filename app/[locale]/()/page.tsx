"use client";

import "leaflet/dist/leaflet.css";
import {
  AddPropertyModal,
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

export default function HomePage() {
  const {
    isOpen,
    open,
    close,
    categories,
    isAddingCategory,
    handleCategorySubmit,
    isAddingProperty,
    handlePropertySubmit,
  } = useHomePage();

  return (
    <Group h="100%" align="start">
      <Group>
        <CategoryWrapper categories={categories} onOpen={open} />
        <NewCategoryModal
          opened={isOpen.addCategory}
          onClose={close}
          onSubmit={handleCategorySubmit}
          isAdding={isAddingCategory}
        />
      </Group>
      <Group>category example</Group>
      <AddPropertyModal
        opened={isOpen.addProperty}
        onClose={close}
        onSubmit={handlePropertySubmit}
        isAdding={isAddingProperty}
      />
    </Group>
  );
}

function useHomePage() {
  const { onSuccess } = useNotification();
  const [{ isOpen }, { open, close }] = useModal();

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

  const { mutateAsync: addProperty, isLoading: isAddingProperty } = useMutation(
    propertyMutation.fnc,
    {
      onSuccess: () => {
        onSuccess()("property");
        close();
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
    isOpen,
    open,
    close,
    categories,
    isAddingCategory,
    handleCategorySubmit,
    isAddingProperty,
    handlePropertySubmit,
  };
}
