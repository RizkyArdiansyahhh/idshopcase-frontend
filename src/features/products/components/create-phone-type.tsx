import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreatePhoneType } from "../api/create-phone-type";

type CreatePhoneTypeProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
};

export function CreatePhoneType({ form }: CreatePhoneTypeProps) {
  // 🔥 ambil function createVariant dari hook API
  const { mutate: createPhoneType, isPending } = useCreatePhoneType();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            name="modelPhoneType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  type="text"
                  placeholder="Brand Handphone"
                  {...field}
                  value={field.value || ""}
                />
              </FormItem>
            )}
          />
          <FormField
            name="namePhoneType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Input
                  type="text"
                  placeholder="Tipe Handphone"
                  {...field}
                  value={field.value || ""}
                />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="h-full"
            disabled={isPending}
            onClick={() => {
              const values = form.getValues();
              createPhoneType({
                brand: values.modelPhoneType,
                model: values.namePhoneType,
              });

              form.reset({
                ...form.getValues(),
                modelPhoneType: "",
                namePhoneType: "",
              });
            }}
          >
            {isPending ? <Spinner /> : "Tambah"}
          </Button>
        </div>
      </div>
    </div>
  );
}
