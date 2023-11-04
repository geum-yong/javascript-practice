const tabsBox = document.getElementById("basicTabsBox");
const tabs = document.querySelectorAll("#basicTabsBox .basic-tab");
const tabContents = document.querySelectorAll(".basic-tab-contents");
let selectedIndex = 0;
let indexX = 0;

const setTabBottomBar = () => {
  const tabBottomBar = document.createElement("div");
  tabBottomBar.classList.add("bottom-bar");
  tabBottomBar.style.width = `${tabs[0].clientWidth}px`;
  tabsBox.appendChild(tabBottomBar);
};

const selectTab = (e: MouseEvent) => {
  const selectedTab = e.target as HTMLDivElement;

  if (
    !selectedTab.classList.contains("basic-tab") ||
    selectedTab.classList.contains("selected")
  )
    return;

  const tabBottomBar = document.querySelector(
    "#basicTabsBox .bottom-bar",
  ) as HTMLDivElement;

  tabs.forEach((tab, i) => {
    if (selectedTab === tab) {
      tab.classList.add("selected");
      selectedIndex = i;
      tabBottomBar.style.width = `${tab.clientWidth}px`;
    } else {
      tab.classList.remove("selected");
    }
  });

  tabContents.forEach((content, i) => {
    if (selectedIndex === i) {
      (content as HTMLDivElement).style.display = "block";
    } else {
      (content as HTMLDivElement).style.display = "none";
    }
  });

  let selectedX = 0;
  for (let i = 0; i < selectedIndex; i++) {
    selectedX += tabs[i].clientWidth;
  }

  tabBottomBar.style.transform = `translateX(${selectedX}px)`;
  indexX = selectedX;
};

setTabBottomBar();
tabsBox.addEventListener("click", selectTab);
