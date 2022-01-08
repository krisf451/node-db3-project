const e = require("express");
const db = require("../../data/db-config");

const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.params;
    const possibleId = await db("schemes").where("scheme_id", scheme_id);
    if (possibleId) {
      next();
    } else {
      next({
        status: 404,
        message: `scheme with scheme_id ${scheme_id} not found`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const validateScheme = (req, res, next) => {
  try {
    const { scheme_name } = req.body;
    if (
      scheme_name === undefined ||
      scheme_name === "" ||
      typeof scheme_name !== "string"
    ) {
      next({ status: 400, message: "invalid schem_name" });
    }
  } catch (err) {
    next(err);
  }
};

const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body;
    if (
      instructions === undefined ||
      instructions === "" ||
      typeof instructions !== "string" ||
      step_number < 1 ||
      Number.isInteger(step_number) === false
    ) {
      next({ status: 400, message: "invalid step" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
