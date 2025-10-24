import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react"; // perhatikan import
import { UseUpdateAddress } from "@/features/address/api/update-address";
import { QueryClientWrapper } from "@/test-utils";
import { api } from "@/lib/axios";
import { FormAddressSchemaType } from "@/features/address/components/address";

jest.mock("@/lib/axios");
const mockedApi = api as jest.Mocked<typeof api>;

describe("UseUpdateAddress", () => {
  it("updates address successfully", async () => {
    const fakeResponse = { id: 1, recipient_name: "Rizky" };
    const data: FormAddressSchemaType = {
      recipient_name: "rendi",
      phone: "081234567890",
      province: "Jawa Barat",
      city: "Bogor",
      district: "Bendungan Hilir",
      sub_district: "G",
      postal_code: "16623",
    };

    mockedApi.patch.mockResolvedValueOnce({ data: fakeResponse });

    const { result } = renderHook(() => UseUpdateAddress(), {
      wrapper: QueryClientWrapper,
    });

    await act(async () => {
      result.current.mutate({ id: 1, data });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedApi.patch).toHaveBeenCalledWith(
      `/addresses/1`,
      data,
      expect.any(Object)
    );
  });
});
