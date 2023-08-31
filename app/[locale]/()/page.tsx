"use client";

import { AddPropertyModal } from "@/app/_components/add-property-modal";
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

export default function HomePage() {
  const { isOpen, open, close, categories, handleSubmit, isAdding } =
    useHomePage();

  return (
    <Group h="100%" align="start">
      <Group>
        <CategoryWrapper categories={categories} onOpen={open} />
        <NewCategoryModal
          opened={isOpen.addCategory}
          onClose={close}
          onSubmit={handleSubmit}
          isAdding={isAdding}
        />
      </Group>
      <Group>category example</Group>
      <AddPropertyModal opened={isOpen.addProperty} onClose={close} />
    </Group>
  );
}

function useHomePage() {
  const { onSuccess } = useNotification("category");
  const [{ isOpen }, { open, close }] = useModal();

  const { data: categories, refetch } = useQuery<Category[]>(categoryQuery.key);
  const { mutateAsync: addCategory, isLoading: isAdding } = useMutation(
    categoryMutation.fnc,
    {
      onSuccess: () => {
        onSuccess();
        close();
        refetch();
      },
    }
  );

  const handleSubmit = async (values: CategoryFormValues) => {
    await addCategory(values);
  };

  return {
    isOpen,
    open,
    close,
    categories,
    handleSubmit,
    isAdding,
  };
}
