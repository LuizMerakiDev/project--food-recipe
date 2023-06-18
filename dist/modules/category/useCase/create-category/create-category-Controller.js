"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/modules/category/useCase/create-category/create-category-Controller.ts
var create_category_Controller_exports = {};
__export(create_category_Controller_exports, {
  CreateCategoryController: () => CreateCategoryController
});
module.exports = __toCommonJS(create_category_Controller_exports);
var import_tsyringe2 = require("tsyringe");

// src/modules/category/useCase/create-category/create-category-useCase.ts
var import_tsyringe = require("tsyringe");

// src/shared/Errors/AppError.ts
var AppError = class {
  constructor(message, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/shared/provider/Validation.ts
var Validation = class {
  static validateRequiredFields(obj, requiredFields) {
    const missingFields = Object.keys(requiredFields).filter((field) => !obj[field]);
    if (missingFields.length > 0) {
      const missingFieldsMessages = missingFields.map(
        (field) => requiredFields[field]
      );
      throw new AppError(`Missing required fields: ${missingFieldsMessages.join(", ")}`);
    }
  }
};

// src/modules/category/useCase/create-category/create-category-useCase.ts
var CreateCategoryUseCase = class {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }
  async execute({ name }) {
    const requiredFields = {
      name: "Name is required!"
    };
    Validation.validateRequiredFields({ name }, requiredFields);
    const resultCategory = await this.categoryRepository.create({ name });
    return resultCategory;
  }
};
CreateCategoryUseCase = __decorateClass([
  (0, import_tsyringe.injectable)(),
  __decorateParam(0, (0, import_tsyringe.inject)("KnexCategoryRepository"))
], CreateCategoryUseCase);

// src/modules/category/useCase/create-category/create-category-Controller.ts
var CreateCategoryController = class {
  async handle(request, response) {
    const { name } = request.body;
    const createCategoryUseCase = import_tsyringe2.container.resolve(CreateCategoryUseCase);
    try {
      const resultCategory = await createCategoryUseCase.execute({ name });
      return response.status(201).json({ resultCategory });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
      } else {
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateCategoryController
});
