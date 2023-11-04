const accordionContainer = document.getElementById("accordionBox");

const toggleAccordion = (e: MouseEvent) => {
  const selectAccordion = e.target as HTMLDivElement;

  if (
    !selectAccordion.classList.contains("accordion-title-box") ||
    selectAccordion.classList.contains("disabled")
  )
    return;

  const accordion = selectAccordion.parentElement.parentElement;

  if (accordion.classList.contains("open")) {
    accordion.classList.remove("open");
    accordion.style.height = "40px";
  } else {
    accordion.classList.add("open");
    accordion.style.height = `${
      selectAccordion.parentElement.clientHeight + 16
    }px`;
  }
};

accordionContainer.addEventListener("click", toggleAccordion);
