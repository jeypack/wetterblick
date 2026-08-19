import AccordionItem from "./AccordionItem";

export default function Accordion({data, itemRefs, openIndex, onClick}) {
  return (
    <>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={index === openIndex}
          onClick={() => onClick(index)}
          ref={(el) => (itemRefs.current[index] = el)}
        />
      ))}
    </>
  );
}
