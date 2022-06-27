import { DataService } from "../config/dataService/dataService";
const helperFunction = {};
helperFunction.warehouseList = async () =>{
    try {
        return await DataService.get("warehouse-list");
      } catch (error) {
        console.log("error");
      }
}

export { helperFunction };