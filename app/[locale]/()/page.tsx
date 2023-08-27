"use client";

import { CategoryWrapper } from "@/app/_components/categories/category-wrapper";
import {
  CategoryFormValues,
  NewCategoryModal,
} from "@/app/_components/categories/new-category-modal";
import { categoryMutation } from "@/domain/mutations/category-mutation";
import { categoryQuery } from "@/domain/queries/categories-query";
import { useNotification } from "@/hooks/use-notification";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Category } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const {
    isModalOpen,
    openModal,
    closeModal,
    categories,
    handleSubmit,
    isAdding,
  } = useHomePage();

  return (
    <Group h="100%" align="start">
      <Group>
        <CategoryWrapper categories={categories} onOpen={openModal} />
        <NewCategoryModal
          opened={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isAdding={isAdding}
        />
      </Group>
      <Group>category example</Group>
    </Group>
  );
}

function useHomePage() {
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const { onSuccess } = useNotification("category");

  const { data: categories, refetch } = useQuery<Category[]>(categoryQuery.key);
  const { mutateAsync: addCategory, isLoading: isAdding } = useMutation(
    categoryMutation.fnc,
    {
      onSuccess: () => {
        onSuccess();
        closeModal();
        refetch();
      },
    }
  );

  const handleSubmit = async (values: CategoryFormValues) => {
    await addCategory(values);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    categories,
    handleSubmit,
    isAdding,
  };
}
