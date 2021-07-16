const itemModel = require("../../models/itemModel");

class ItemsController {
  constructor() {
    this.itemTable ="items",
    this.itemReviewTable="items_rating"
    this.categoryTable = "categories"
    this.items_mapping = "items_mapping"
  }

  addNewItem(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {``
      try {
        let request = req.body;
       
        if (!request.item_name)
          return resolve({
            success: false,
            message: "Missing Mandatory Field",
          });
        let response = await itemModel.saveitemDetails(request,that.itemTable);
           this.additemCat(request,response)
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

    additemCat(request,response){
    let that = this;
    return new Promise(async (resolve, reject) => {``
      try {
      
      let categories = request.item_category.split(',')
      categories.forEach(e => {
        let bdy = {
          item_id :response.data.insertId,
          cat_id : e
        }
        let response1 =  itemModel.saveitemDetails(bdy,that.items_mapping)
        return resolve(response1);
      });
      } catch (error) {
        reject(error);
      }
    });
  }

  updateItem(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
       
        if (!request.item_id)
          return resolve({
            success: false,
            message: "Missing Mandatory Field",
          });
        let columns = [
          "item_name",
          "item_cost",
          "item_discount",
          "item_description",
          "item_mob_smallimg",
          "item_mob_largeimg",
        ];
        let data = [
          request.item_name,
          request.item_cost,
          request.item_discount,
          request.item_description,
          request.item_mob_smallimg,
          request.item_mob_largeimg,
        ];
        let condition = `item_id = ${request.item_id}`;

        let response = await itemModel.updateitemDetails(
          columns,
          data,
          condition,
          that.itemTable
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteitem(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
       
        let condition = `item_id = ${request.item_id}`;
        let response = await itemModel.deleteItem(condition,that.itemTable);
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  addNewItemReview(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
      
        if (!request.item_id)
          return resolve({
            success: false,
            message: "Missing Mandatory Field",
          });
        let response = await itemModel.saveitemDetails(request,that.itemReviewTable);
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  updateItemReview(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
       
        if (!request.item_id)
          return resolve({
            success: false,
            message: "Missing Mandatory Field",
          });
        let columns = ["item_id", "review", "rating", "review_name"];
        let data = [
          request.item_id,
          request.review,
          request.rating,
          request.review_name,
        ];
        let condition = `id = ${request.item_id}`;
        let response = await itemModel.updateitemDetails(
          columns,
          data,
          condition,
          that.itemReviewTable
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteitemReview(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
        let condition = `id = ${request.id}`;
       
        let response = await itemModel.deleteItem(condition,that.itemReviewTable);
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteitemReview(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
        let condition = `id = ${request.id}`;
       
        let response = await itemModel.deleteItem(condition,that.itemReviewTable);
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  addNewCategory(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
        let response = await itemModel.saveitemDetails(request,that.categoryTable);
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
  updateCategory(req) {
    
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
        // console.log(request)
       
        if (!request.id)
          return resolve({
            success: false,
            message: "Missing Mandatory Field",
          });
        let columns = ["category_name"];
        let data = [
          request.category_name
        ];
        let condition = `id = ${request.id}`;
        let response = await itemModel.updateitemDetails(
          columns,
          data,
          condition,
          that.categoryTable
        );
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteCategory(req) {
    let that = this;
    return new Promise(async (resolve, reject) => {
      try {
        let request = req.body;
        let condition = `id = ${request.id}`;
       
        let response = await itemModel.deleteItem(condition,that.categoryTable);
        return resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
  
module.exports = new ItemsController();
