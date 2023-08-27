"use client";

import { CategoryWrapper } from "@/app/_components/categories/category-wrapper";
import { categoryQuery } from "@/domain/queries/categories-query";
import { Group } from "@mantine/core";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { categories } = useHomePage();

  return (
    <Group h="100%" align="start" sx={{ border: "1px solid #ff000022" }}>
      <Group>
        <CategoryWrapper categories={categories} />
      </Group>
      <Group>category example</Group>
    </Group>
  );
}

function useHomePage() {
  const { data: categories } = useQuery<Category[]>(categoryQuery.key);

  return { categories };
}
