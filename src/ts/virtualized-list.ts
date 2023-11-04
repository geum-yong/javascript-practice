const listContainer = document.getElementById("virtualizedList");
let listBox;

const {
  width: listContainerWidth,
  height: listContainerHeight,
  itemSize,
  itemCount,
  overscanCount,
} = listContainer.dataset;
const data = Array.from(
  { length: Number(itemCount) },
  (_, index) => `Item ${index}`,
);
const visibleItems = Math.ceil(Number(listContainerHeight) / Number(itemSize));

const setInitContainerSize = () => {
  listContainer.style.width = `${listContainerWidth}px`;
  listContainer.style.height = `${listContainerHeight}px`;
  listContainer.style.overflow = "auto";
  listContainer.style.backgroundColor = "#fff";
  listContainer.style.position = "relative";

  listBox = document.createElement("div");
  listBox.style.height = `${Number(itemCount) * Number(itemSize)}px`;
  listContainer.appendChild(listBox);
};

const setListData = () => {
  const { scrollTop } = listContainer;

  const start = Math.floor(scrollTop / Number(itemSize));
  const end = Math.min(
    start +
      visibleItems +
      (Number(itemCount) > Number(overscanCount) ? Number(overscanCount) : 0),
    Number(itemCount),
  );

  listBox.innerHTML = "";
  for (let i = start; i < end; i++) {
    const listItem = document.createElement("div");
    listItem.style.width = "100%";
    listItem.style.height = `${itemSize}px`;
    listItem.style.padding = "8px 16px";
    listItem.style.display = "flex";
    listItem.style.alignItems = "center";
    listItem.style.position = "absolute";
    listItem.style.top = `${i * Number(itemSize)}px`;
    listItem.style.left = "0";

    listItem.addEventListener("mouseenter", onMouseEnterItem);
    listItem.addEventListener("mouseleave", onMouseOutItem);

    listItem.innerText = data[i];
    listBox.appendChild(listItem);
  }
};

const onMouseEnterItem = (e: MouseEvent) => {
  const item = e.target as HTMLDivElement;
  item.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
  item.style.cursor = "pointer";
};

const onMouseOutItem = (e: MouseEvent) => {
  const item = e.target as HTMLDivElement;
  item.style.backgroundColor = "#fff";
};

window.onload = () => {
  listContainer.addEventListener("scroll", setListData);
  setInitContainerSize();
  setListData();
};
