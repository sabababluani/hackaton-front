import { useState } from "react";
import { Search, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";

interface FormInputsPropsInterface {
  searchQuery: string;
  image: FileList;
}

export const SearchBar = () => {
  const { register, handleSubmit, reset } = useForm<FormInputsPropsInterface>();

  const onHandleSubmit = async (value: FormInputsPropsInterface) => {
    const data = new FormData();
    data.append("searchQuery", value.searchQuery);
    data.append("file", value.image[0]);

    for (const [key, val] of data.entries()) {
      console.log(`${key}:`, val);
    }

    try {
      await axios.post(
        "https://hackathon-back-crmr.onrender.com/dishes/search",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      reset();
    } catch (error) {
      alert("შეცდომა ძებნისას, გთხოვთ სცადოთ თავიდან");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onHandleSubmit)} className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="მოძებნე კერძები, მაგალითად: 'ხინკალი', 'ხაჭაპური'..."
              {...register("searchQuery", {
                required: "მოთხოვნილია ძებნის ველი",
              })}
              className="w-full pl-12 pr-4 py-4 text-lg bg-transparent border-none outline-none placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-2 mr-2">
            <div>
              <button
                type="button"
                onClick={() => document.getElementById("fileUpload")?.click()}
                className="p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <ImageIcon className="w-6 h-6 text-gray-500" />
              </button>
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                {...register("image", {
                  required: "მოთხოვნილია ფაილის ატვირთვა",
                })}
                style={{ display: "none" }}
              />
            </div>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl"
            >
              მოძებნა
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
