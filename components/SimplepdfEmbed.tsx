"use client";
function SimplePdfEmbed() {
  return (
    <embed
      width={"100%"}
      height={"900px"}
      type="application/pdf"
      src="/REBELCAR.pdf#toolbar=0"
      style={{ objectFit: "cover" }}
      onScroll={() => {
        console.debug("resize occured");
      }}
    />
  );
}

export default SimplePdfEmbed;
