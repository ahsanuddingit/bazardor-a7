import ProductSection from "@/components/shared/ProductSection";
import { IMarquee } from "@/types/marquee-links-type";
import { notFound } from "next/navigation";

interface ParamsProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryPage = async ({ params }: ParamsProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`,
  );
  const data: IMarquee[] = await res.json();

  const signleCategory = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories`,
  );
  const getSignleCategory = await signleCategory.json();

  const currentCategory = getSignleCategory.find(
    (c: { icon: string; id: string; nameBn: string; slug: string }) =>
      c.id === categoryId,
  );

  if (!currentCategory) {
    notFound();
  }

  return (
    <div className="bg-[#e1e8e163]">
      <div className=" min-h-screen max-w-7xl mx-auto px-4 mt-10">
        <div className="flex gap-4 bg-white border border-gray-200 rounded-[15px] px-3 py-3">
          <span className="text-[35px] ">{currentCategory.icon}</span>
          <div>
            <h1 className="font-bold text-[18px] ">{currentCategory.nameBn}</h1>
            <p className="text-[15px] text-gray-600">{`${data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
          </div>
        </div>
        <div>
          <ProductSection data={data}></ProductSection>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
