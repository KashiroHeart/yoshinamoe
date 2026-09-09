import {
  setupTenjiUI
}
from "/src/tenji-ui.js";

setupTenjiUI({
  modes: {
    "6": [
      { id: "k2t", label: "かな→点字" },
      { id: "t2k", label: "点字→かな" },
    ],
    "8": [
      { id: "k2kt", label: "漢字かな→漢点字" },
      { id: "kt2k", label: "漢点字→漢字" },
      { id: "k2kt2", label: "漢字→漢点字（始終点符号なし）" },
      { id: "forcefix", label: "始終点総当たり補完" },
    ],
  },
  runButton: true,
});
