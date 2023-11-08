import { Feature } from "@turf/helpers";
import { FC } from "react";
import React from "react";
import "./Map.scss";

const MarkersImage: FC<{ src: string }> = ({ src }) => {
  return (
    <img
      width={36}
      height={36}
      alt={"hotel"}
      src={src}
      className="hotelMarker"
    />
  );
};

const CustomMarker: FC<{ element: Feature }> = ({ element }) => {
  const kinds = element?.properties?.kinds;
  if (kinds.includes("religion")) {
    return (
      <MarkersImage src="https://static.thenounproject.com/png/158909-200.png" />
    );
  }
  if (kinds.includes("museums")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613357532827798/Museum.png?ex=651ce246&is=651b90c6&hm=2f0b03bfd459aa366835e82261f0ed9af2ab12399c68e735302194ceee3b7432&=&width=150&height=195" />
    );
  }
  if (kinds.includes("natural_springs")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613220337127445/Nature.png?ex=651ce225&is=651b90a5&hm=11c5f55f8202ee8c2f5589283f85ecf8b0832855326225c10742c77d0ebd7f8b&=&width=150&height=195" />
    );
  }
  if (kinds.includes("shops")) {
    return (
      <MarkersImage src="https://cdn.discordapp.com/attachments/1039155840592121946/1158614181822615632/Shop.png?ex=651ce30a&is=651b918a&hm=6ad772a120b4f452cc3f6812049e47075f10fff43b1cebdf8beff7f918da4404" />
    );
  }
  if (kinds.includes("architecture")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613357037883453/Architecture.png?ex=651ce246&is=651b90c6&hm=786a8607a1aa5ae9195df4f13f6ab77f720549a95dfbbcb198de36e14da3baf0&=&width=150&height=195" />
    );
  }
  if (kinds.includes("theatres_and_entertainments")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613219867365456/Theater.png?ex=651ce225&is=651b90a5&hm=fcd02ea4d929a5af8da230359396254651636546894f7b57fd28fa81f89a681b&=&width=150&height=195" />
    );
  }
  if (kinds.includes("foods")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613220081287260/Food.png?ex=651ce225&is=651b90a5&hm=3484b7d53c2813d435bcfa56deda80e67f745bbf958a2d6d756db6642182fd1e&=&width=150&height=195" />
    );
  }
  if (kinds.includes("banks")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613357327302718/Bank.png?ex=651ce246&is=651b90c6&hm=71d121c537cbbca6a48ae85ab1fdc1692f68806e558b4bc81aaba26642c5fe42&=&width=150&height=195" />
    );
  }
  if (kinds.includes("transport")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613357750915082/Transport.png?ex=651ce246&is=651b90c6&hm=a4d7565b7f0bbc66dc43fcb7443b735e5b1fd67707b4d2fe291f2d22dc3435f5&=&width=150&height=195" />
    );
  }
  if (kinds.includes("beaches")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613219104002088/Beach.png?ex=651ce225&is=651b90a5&hm=643dfb01781ed522e380dc79ee714b75cff1062b6b9fb215c01fdac8996d2d1b&=&width=150&height=195" />
    );
  }
  if (kinds.includes("bridges")) {
    return (
      <MarkersImage src="https://media.discordapp.net/attachments/1039155840592121946/1158613219406004277/Bridge.png?ex=651ce225&is=651b90a5&hm=4552e24e745256c0e342d574cca4f168fc8913eafa29ea203caaf3e92f5b4c96&=&width=150&height=195" />
    );
  } else {
    return (
      <MarkersImage src="https://images-ext-2.discordapp.net/external/E1myNIG4k9PFEDvf0YyKxLwLvtz9uOkJCAkuCwojj6k/https/cdn-icons-png.flaticon.com/512/10175/10175378.png?width=1024&height=1024" />
    );
  }
};

export default CustomMarker;
