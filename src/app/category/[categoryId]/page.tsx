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
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
  );
  const data: IMarquee[] = await res.json();

  const signleCategory = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories`
  );
  const getSignleCategory = await signleCategory.json();

  const currentCategory = getSignleCategory.find(
    (c: { icon: string; id: string; nameBn: string; slug: string }) =>
      c.id === categoryId
  );

  if (!currentCategory) {
    notFound();
  }

  return (
    <div className="bg-[#f3f7f3] min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <span className="text-3xl md:text-4xl bg-gray-50 p-3 rounded-xl border border-gray-100">
            {currentCategory.icon}
          </span>
          <div>
            <h1 className="font-bold text-lg md:text-xl text-gray-900">
              {currentCategory.nameBn}
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-0.5">
              {`${data.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন`}
            </p>
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