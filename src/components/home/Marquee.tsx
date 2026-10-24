import { IMarquee } from "@/types/marquee-links-type";
import Link from "next/link";
import MarqueeText from "react-marquee-text";

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const marqueeLinks: IMarquee[] = data;
  const unitBn: Record<string, string> = {
    litre: "লিটার",
    piece: "পিস",
    kg: "কেজি",
    dozen: "ডজন",
  };

  return (
    <div className="border-b border-gray-200 py-2 bg-white overflow-hidden">
      <MarqueeText direction="right" duration={20}>
        <div className="flex gap-6 text-[13px] md:text-[14px] items-center">
          {marqueeLinks.map((marqueeLink) => (
            <div key={marqueeLink.id} className="flex items-center gap-1.5 whitespace-nowrap">
              <Link href={`/details/${marqueeLink.id}`} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <span className="text-base">{marqueeLink.image}</span>
                <span className="font-medium text-gray-800">{marqueeLink.nameBn}</span>
                <span className="text-gray-600">
                  {marqueeLink.today.toLocaleString("bn-BD")} টাকা/
                  {unitBn[marqueeLink.unit]}{" "}
                  <span
                    className={`inline-flex items-center font-semibold ml-1 ${
                      marqueeLink.today > marqueeLink.yesterday
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {marqueeLink.today > marqueeLink.yesterday ? "▲" : "▼"}{" "}
                    {(
                      ((marqueeLink.today - marqueeLink.yesterday) /
                        marqueeLink.yesterday) *
                      100
                    ).toLocaleString("bn-BD", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                    %
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;