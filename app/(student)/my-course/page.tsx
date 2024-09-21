import { Metadata } from "next";
import React from "react";
import Layout from "../../components/front/Layout";
import Card from "./../../components/Card";
export const metadata: Metadata = {
  title: "Coursey | My Course",
  description: "all your courses will be displayed here",
};
const array = [
  {
    image: "/images/course.jpg",
    title: "Mastering JavaScript for Web Development",
    price: "$49.99",
    href: "images/profile.jpg",
    authorName: "John Doe",
    authorImage: "/images/profile.jpg",
    authorLink: "images/profile.jpg",
    categoryName: "Web Development",
    categoryLink: "https://example.com/categories/web-development",
  },
  {
    image: "/images/course.jpg",
    title: "Introduction to Data Science with Python",
    price: "$59.99",
    href: "images/profile.jpg",
    authorName: "Jane Smith",
    authorImage: "/images/profile.jpg",
    authorLink: "images/profile.jpg",
    categoryName: "Data Science",
    categoryLink: "https://example.com/categories/data-science",
  },
  {
    image: "/images/course.jpg",
    title: "UI/UX Design for Beginners",
    price: "$39.99",
    href: "images/profile.jpg",
    authorName: "Alex Johnson",
    authorImage: "/images/profile.jpg",
    authorLink: "images/profile.jpg",
    categoryName: "Design",
    categoryLink: "https://example.com/categories/design",
  },
  {
    image: "/images/course.jpg",
    title: "Advanced Machine Learning with TensorFlow",
    price: "$79.99",
    href: "images/profile.jpg",
    authorName: "Emily Davis",
    authorImage: "/images/profile.jpg",
    authorLink: "images/profile.jpg",
    categoryName: "Artificial Intelligence",
    categoryLink: "https://example.com/categories/artificial-intelligence",
  },
  {
    image: "/images/course.jpg",
    title: "Digital Marketing Strategies for 2024",
    price: "$29.99",
    href: "images/profile.jpg",
    authorName: "Michael Brown",
    authorImage: "/images/profile.jpg",
    authorLink: "images/profile.jpg",
    categoryName: "Marketing",
    categoryLink: "https://example.com/categories/marketing",
  },
];
const page = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="font-bold text-2xl mb-5">My Course</h1>
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
          {array.map((arr: any) => {
            return <Card {...arr} />;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default page;
