import { useFieldArray, Control, useWatch } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash } from "lucide-react";
import { MdRemove } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { TooltipActions } from "./tooltip-actions";
import { CustomImageInputPLaceholder } from "@/components/shared/custom-input-image";
// import { useRef } from "react";
import { Switch } from "@/components/ui/switch";
import React from "react";

interface VariantFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  index: number;
  removeVariant: (index: number) => void;
  isDisabled?: boolean;
  inputRefs: React.RefObject<(HTMLInputElement | null)[][]>;
}

const VariantField = ({
  control,
  index,
  removeVariant,
  isDisabled,
  inputRefs,
}: VariantFieldProps) => {
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    name: `variantOptions.${index}.valueVariant`,
  });

  const isAddedImage = useWatch({
    control,
    name: `variantOptions.${index}.isAddedImage`,
  });

  console.log(inputRefs.current);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-1 ">
        <TooltipActions
          icon={<Trash />}
          variant={"destructive"}
          isDisabled={isDisabled}
          action={() => removeVariant(index)}
        >
          <p>Hapus variasi</p>
        </TooltipActions>
        <div className="border rounded-md flex-1">
          <div className="flex flex-row gap-2 justify-between items-center pr-2">
            <FormField
              name={`variantOptions.${index}.nameVariant`}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="border-none focus-visible:ring-0 shadow-none"
                    {...field}
                    placeholder="Masukkan Nama Variasi"
                    disabled={isDisabled}
                  ></Input>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant={"default"}
              size={"icon-sm"}
              className="rounded-full"
              disabled={isDisabled}
              onClick={() =>
                appendValue({
                  label: "",
                })
              }
            >
              <PlusIcon />
            </Button>
          </div>

          <Separator></Separator>
          <div className="p-2">
            {valueFields?.map((_, i) => {
              if (!inputRefs.current[index]) inputRefs.current[index] = [];
              if (inputRefs.current[index][i] === undefined)
                inputRefs.current[index][i] = null;
              return (
                <div
                  key={valueFields[i].id}
                  className="w-full my-2 flex flex-row items-stretch gap-2"
                >
                  <div className="w-2/3 flex flex-row items-center gap-2">
                    <TooltipActions
                      icon={<MdRemove />}
                      variant={"destructive"}
                      action={() => removeValue(i)}
                      isDisabled={isDisabled}
                    >
                      <p>Hapus Label</p>
                    </TooltipActions>
                    <FormField
                      name={`variantOptions.${index}.valueVariant.${i}.label`}
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <Input
                            type="text"
                            disabled={isDisabled}
                            placeholder={`Label ${i + 1}`}
                            {...field}
                          ></Input>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* {isAddedImage && inputRefs.current[index][i] && (
                    <div className="w-1/3">
                      <FormField
                        name={`variantOptions.${index}.valueVariant.${i}.image`}
                        control={control}
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              ref={(el) => {
                                inputRefs.current[index][i] = el;
                              }}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const fileUrls = URL.createObjectURL(file);
                                  field.onChange(fileUrls);
                                }
                              }}
                            ></Input>
                            <CustomImageInputPLaceholder
                              inputRefPlaceholder={inputRefs.current[index][i]}
                              imageUrl={field.value}
                            />
                          </FormItem>
                        )}
                      />
                    </div>
                  )} */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <FormField
        name={`variantOptions.${index}.isAddedImage`}
        control={control}
        render={({ field }) => (
          <FormItem className="mb-7">
            <div className="flex flex-row justify-between">
              <div>
                <FormLabel>Tambah Gambar Ke Variasi</FormLabel>
                <FormDescription className="text-xs">
                  Semua Gambar Harus diupload apabila diaktifkan
                </FormDescription>
              </div>
              <Switch
                checked={field.value || false}
                onCheckedChange={field.onChange}
              ></Switch>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default VariantField;
