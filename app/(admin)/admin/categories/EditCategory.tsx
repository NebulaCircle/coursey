"use client";
import Modal from "@/app/components/Modal";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchServer } from "@/hooks/useFetch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import ImageUpload from "@/app/components/ImageUpload";
import { updateCategory } from "@/actions/categoriesAction";

// Define the schema for category validation
const categorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Category name must be at least 3 characters long" })
    .max(50, { message: "Category name must be less than 50 characters" }),
  thumbnail: z.string().min(1, { message: "Image is required" }).optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;
interface CategoryProps {
  name: string;
  slug: string;
}
interface EditCategoryProps {
  data: CategoryProps;
}
const EditCategory: React.FC<EditCategoryProps> = (props) => {
  const { slug, name } = props.data;
  const [imageUrl, setImageUrl] = useState("");

  const [show, setShow] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Import setValue to update form values
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    if (imageUrl) {
      setValue("thumbnail", imageUrl); // Set thumbnail value
    }
  }, [imageUrl, setValue]);
  const onSubmit = async (data: CategoryFormData) => {
    try {
      await updateCategory({ ...data, slug });

      router.refresh();
      toast.success("Category successfully updated");
      setShow(false);
    } catch (error) {
      toast.error("Category failed updated");
    }
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="text-sm inline-flex items-center  me-3 text-[#4955FD] gap-2 hover:underline"
      >
        <Pencil className="w-4" /> Edit
      </button>
      <Modal setShow={setShow} show={show} title="Edit Category">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <label htmlFor="name" className="mb-1 inline-block text-base">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              id="name"
              autoFocus
              required
              defaultValue={name}
              placeholder="Category Name"
              className="px-3 py-2 text-sm border ms-auto pr-4 bg-white/10 w-full rounded-md outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="">
            <label htmlFor="thumbnail" className="mb-1 inline-block text-base">
              Image
            </label>
            {/* Hidden input to store the thumbnail value */}
            {/* <input type="hidden" {...register("thumbnail")} /> */}
            <ImageUpload {...register("thumbnail")} name="thumbnail" />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 mt-4 bg-[#4955FD] hover:bg-[#4955FD]/90 text-white rounded-md"
            >
              Update
            </button>
            <button
              onClick={() => setShow(false)}
              type="button"
              className="px-4 py-2 mt-4 text-[#4955FD] border border-[#4955FD] rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditCategory;
