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
    listItem.classList.add("list-item");
    listItem.style.height = `${itemSize}px`;
    listItem.style.top = `${i * Number(itemSize)}px`;

    listItem.innerText = data[i];
    listBox.appendChild(listItem);
  }
};

window.onload = () => {
  listContainer.addEventListener("scroll", setListData);
  setInitContainerSize();
  setListData();
};
