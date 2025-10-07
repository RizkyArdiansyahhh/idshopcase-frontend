import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const addAddressPage = () => {
  return (
    <>
      <div>
        <FieldSet>
          <FieldLegend className="font-bold">Alamat Baru</FieldLegend>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Input placeholder="Nama Lengkap" required type="text"></Input>
              </Field>
              <Field>
                <Input placeholder="No. Handphone" required type="tel"></Input>
              </Field>
              <Field>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riau">Riau</SelectItem>
                    <SelectItem value="jambi">Jambi</SelectItem>
                    <SelectItem value="sumatera barat">
                      Sumatera Barat
                    </SelectItem>
                    <SelectItem value="sumatera utara">
                      Sumatera Utara
                    </SelectItem>
                    <SelectItem value="bengkulu">Bengkulu</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kabupaten/Kota" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riau">Bengkalis</SelectItem>
                    <SelectItem value="jambi">Kota Pekanbaru</SelectItem>
                    <SelectItem value="sumatera barat">
                      Kuantan Singingi
                    </SelectItem>
                    <SelectItem value="sumatera utara">
                      Indragiri Hulu
                    </SelectItem>
                    <SelectItem value="bengkulu">Indragiri Hilir</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riau">Binawidya</SelectItem>
                    <SelectItem value="jambi">Bukit Raya</SelectItem>
                    <SelectItem value="sumatera barat">Kulim</SelectItem>
                    <SelectItem value="sumatera utara">Lima Puluh</SelectItem>
                    <SelectItem value="bengkulu">Payung Sekaki</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kelurahan/Desa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riau">Binawidya</SelectItem>
                    <SelectItem value="jambi">Delima</SelectItem>
                    <SelectItem value="sumatera barat">Tobek Godang</SelectItem>
                    <SelectItem value="sumatera utara">Sungai Sibam</SelectItem>
                    <SelectItem value="bengkulu">Simpang Baru</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kode Pos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bengkulu">28295</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="grid grid-cols-1">
              <Field>
                <Input placeholder="Detail Lainnya (nama Jalan, Blok/Unit no., Patokan"></Input>
              </Field>
            </div>
            <Field orientation="horizontal">
              <Checkbox id="default-address" data-slot="field-content" />
              <FieldLabel
                htmlFor="default-address"
                className="font-normal text-muted-foreground/70  "
              >
                Atur Sebagai Alamat Utama
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldGroup>
          <Field orientation="horizontal" className="justify-end">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button" className="text-foreground">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </div>
    </>
  );
};

export default addAddressPage;
