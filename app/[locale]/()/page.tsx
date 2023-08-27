"use client";

import { CategoryWrapper } from "@/app/_components/categories/category-wrapper";
import {
  CategoryFormValues,
  NewCategoryModal,
} from "@/app/_components/categories/new-category-modal";
import { categoryQuery } from "@/domain/queries/categories-query";
import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { isModalOpen, openModal, closeModal, categories, handleSubmit } =
    useHomePage();

  return (
    <Group h="100%" align="start" sx={{ border: "1px solid #ff000022" }}>
      <Group>
        <CategoryWrapper categories={categories} onOpen={openModal} />
        <NewCategoryModal
          opened={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </Group>
      <Group>category example</Group>
    </Group>
  );
}

function useHomePage() {
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const { data: categories } = useQuery<Category[]>(categoryQuery.key);

  const handleSubmit = async (values: CategoryFormValues) => {
    console.log(values);
  };

  return { isModalOpen, openModal, closeModal, categories, handleSubmit };
}
