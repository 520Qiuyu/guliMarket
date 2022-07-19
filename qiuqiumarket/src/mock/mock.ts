import Mock from "mockjs";
/* import banner from "./banner.json";
import floors from "./floors.json"; */
const banner = require("./banner.json")
const floors = require("./floors.json")
const centerBannerList = require("./centerBannerList.json")

Mock.mock("mock/banner",{code:200,data:banner})
Mock.mock("mock/floor",{code:200,data:floors})
Mock.mock("mock/centerBannerList",{code:200,data:centerBannerList})
