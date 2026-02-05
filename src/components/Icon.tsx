import { ReactSVG } from "react-svg";

interface IconProps {
  src: string;
  width?: number;
}

export default function Icon(props: IconProps) {
  return (
    <ReactSVG
      src={props.src}
      beforeInjection={(svg) => {
        svg.setAttribute("width", `${props.width ?? 22}`);

        const color = "var(--foreground)";
        // Set a baseline for elements that use currentColor.
        svg.style.color = color;

        // Force fill/stroke to theme variable (including on the <svg> tag).
        svg.setAttribute("fill", color);
        svg.setAttribute("stroke", color);

        // Update all inner shapes too.
        const nodes = svg.querySelectorAll<SVGElement>("*");
        nodes.forEach((node) => {
          // Only override if the attribute exists or if you want to force everything.
          // Here we force everything to match theme:
          node.setAttribute("fill", color);
          node.setAttribute("stroke", color);

          // Optional: if some icons rely on inline styles instead of attributes.
          (node as SVGElement).style.setProperty("fill", color);
          (node as SVGElement).style.setProperty("stroke", color);
        });
      }}
    />
  );
}
