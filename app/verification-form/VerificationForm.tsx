"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { useGetCategoriesSelect } from "@/hooks/verification/useGetCategoriesSelect";
import { useGetSubCategoriesSelect } from "@/hooks/verification/useGetSubCategoriesSelect";

export default function VerificationPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  // Address fields
  const [houseDetails, setHouseDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Category / Subcategory
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesSelect();

  const {
    data: subCategories,
    isLoading: subCategoriesLoading,
  } = useGetSubCategoriesSelect(categoryId); // dependent fetch

  // Aadhaar & Avatar
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // Avatar preview
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Aadhaar upload
  const handleAadhaar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAadhaarFile(file);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("fullName", fullName);
    fd.append("phone", phone);
    fd.append("houseDetails", houseDetails);
    fd.append("city", city);
    fd.append("state", state);
    fd.append("pincode", pincode);
    fd.append("categoryId", categoryId);
    fd.append("subCategoryId", subCategoryId);

    if (avatar) fd.append("avatar", avatar);
    if (aadhaarFile) fd.append("aadhaar", aadhaarFile);

    try {
      const res = await api.post("/workers/verification/submit", fd);
      if (!res.data) throw new Error("Verification failed");

      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Verification Form</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            
            {/* AVATAR ON TOP */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview} className="object-cover" />
                <AvatarFallback className="bg-gray-200 text-xl">
                  U
                </AvatarFallback>
              </Avatar>

              <Label className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Upload Avatar
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  className="hidden"
                />
              </Label>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <Label>Select Category</Label>
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  setSubCategoryId(""); // reset subcategory
                }}
                disabled={categoriesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      categoriesLoading
                        ? "Loading categories..."
                        : "Select category"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subcategory */}
            <div className="space-y-1">
              <Label>Select Subcategory</Label>
              <Select
                value={subCategoryId}
                onValueChange={setSubCategoryId}
                disabled={!categoryId || subCategoriesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      !categoryId
                        ? "Select category first"
                        : subCategoriesLoading
                        ? "Loading..."
                        : "Select subcategory"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {subCategories?.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Address Section */}
            <div className="space-y-1">
              <Label className="font-semibold">Address</Label>

              <Input
                placeholder="House / Street Details"
                value={houseDetails}
                onChange={(e) => setHouseDetails(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <Input
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <Input
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            {/* Aadhaar Upload */}
            <div className="space-y-1">
              <Label className="font-semibold">Aadhaar Verification</Label>

              <Label className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 inline-block">
                Upload Aadhaar
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleAadhaar}
                  className="hidden"
                />
              </Label>

              {aadhaarFile && (
                <p className="text-sm text-green-600">
                  Selected: {aadhaarFile.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Submit for Verification
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
