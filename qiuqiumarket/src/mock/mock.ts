import Mock from "mockjs";
/* import banner from "./banner.json";
import floors from "./floors.json"; */
const banner = require("./banner.json")
const floors = require("./floors.json")

Mock.mock("mock/banner",{code:200,data:banner})
Mock.mock("mock/floor",{code:200,data:floors})