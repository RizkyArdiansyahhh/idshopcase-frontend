"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const filterProductSchema = z.object({
  category: z.array(z.string()).default([]),
});

type FilterProductType = z.input<typeof filterProductSchema>;

const categories = [
  { id: "custom_case", label: "Custom Case" },
  { id: "keychain", label: "Keychain" },
  { id: "pop_socket", label: "Pop Socket" },
  { id: "phone_charm", label: "Phone Charm" },
];

export const FilterProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FilterProductType>({
    resolver: zodResolver(filterProductSchema),
    defaultValues: {
      category: searchParams.getAll("category"),
    },
  });

  const category = useWatch({
    control: form.control,
    name: "category",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("category");
    category?.forEach((c) => params.append("category", c));
    const next = `?${params.toString()}`;
    const current = window.location.search;
    if (next !== current) {
      router.push(next, { scroll: false });
    }
  }, [category, router]);

  const handleResetFilter = () => {
    form.reset({
      category: [],
    });
  };
  return (
    <div className="border p-3 rounded-md">
      <p className="font-semibold text-base lg:text-xl">Filter</p>
      <Separator className="mb-2"></Separator>

      <Form {...form}>
        <FieldSet className="gap-1">
          <FieldLegend
            variant="label"
            className="mb-1 font-semibold text-sm  lg:text-base"
          >
            Kategori
          </FieldLegend>
          <FieldGroup className="gap-1 pl-2 lg:pl-5">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                const values = field.value ?? [];

                return (
                  <>
                    {categories.map((item) => {
                      const checked = values.includes(item.id);

                      return (
                        <Field key={item.id} orientation="horizontal">
                          <FieldLabel
                            htmlFor={item.id}
                            className="font-normal text-xs lg:text-sm"
                          >
                            {item.label}
                          </FieldLabel>
                          <Checkbox
                            id={item.id}
                            checked={checked}
                            onCheckedChange={(isChecked) => {
                              if (isChecked) {
                                field.onChange([...values, item.id]);
                              } else {
                                field.onChange(
                                  values.filter((v) => v !== item.id),
                                );
                              }
                            }}
                          />
                        </Field>
                      );
                    })}
                  </>
                );
              }}
            />
          </FieldGroup>

          <Button className="mt-3" onClick={handleResetFilter}>
            Reset
          </Button>
        </FieldSet>
      </Form>
    </div>
  );
};
