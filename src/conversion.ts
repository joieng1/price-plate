import { UnitTypeEnum } from './types/unitTypes';

export const conversionFactors: { [key in UnitTypeEnum]?: { [key in UnitTypeEnum]?: number } } = {
  [UnitTypeEnum.G]: {
    [UnitTypeEnum.KG]: 0.001,
    [UnitTypeEnum.LB]: 0.00220462,
    [UnitTypeEnum.OZ]: 0.035274,
  },
  [UnitTypeEnum.KG]: {
    [UnitTypeEnum.G]: 1000,
    [UnitTypeEnum.LB]: 2.20462,
    [UnitTypeEnum.OZ]: 35.274,
  },
  [UnitTypeEnum.LB]: {
    [UnitTypeEnum.G]: 453.592,
    [UnitTypeEnum.KG]: 0.453592,
    [UnitTypeEnum.OZ]: 16,
  },
  [UnitTypeEnum.OZ]: {
    [UnitTypeEnum.G]: 28.3495,
    [UnitTypeEnum.KG]: 0.0283495,
    [UnitTypeEnum.LB]: 0.0625,
  },
  [UnitTypeEnum.TSP]: {
    [UnitTypeEnum.TBSP]: 0.333333,
    [UnitTypeEnum.CUP]: 0.0208333,
    [UnitTypeEnum.QUART]: 0.00520833,
    [UnitTypeEnum.GAL]: 0.00130208,
    [UnitTypeEnum.FL_OZ]: 0.166667,
  },
  [UnitTypeEnum.TBSP]: {
    [UnitTypeEnum.TSP]: 3,
    [UnitTypeEnum.CUP]: 0.0625,
    [UnitTypeEnum.QUART]: 0.015625,
    [UnitTypeEnum.GAL]: 0.00390625,
    [UnitTypeEnum.FL_OZ]: 0.5,
  },
  [UnitTypeEnum.CUP]: {
    [UnitTypeEnum.TSP]: 48,
    [UnitTypeEnum.TBSP]: 16,
    [UnitTypeEnum.QUART]: 0.25,
    [UnitTypeEnum.GAL]: 0.0625,
    [UnitTypeEnum.FL_OZ]: 8,
  },
  [UnitTypeEnum.QUART]: {
    [UnitTypeEnum.TSP]: 192,
    [UnitTypeEnum.TBSP]: 64,
    [UnitTypeEnum.CUP]: 4,
    [UnitTypeEnum.GAL]: 0.25,
    [UnitTypeEnum.FL_OZ]: 32,
  },
  [UnitTypeEnum.GAL]: {
    [UnitTypeEnum.TSP]: 768,
    [UnitTypeEnum.TBSP]: 256,
    [UnitTypeEnum.CUP]: 16,
    [UnitTypeEnum.QUART]: 4,
    [UnitTypeEnum.FL_OZ]: 128,
  },
  [UnitTypeEnum.FL_OZ]: {
    [UnitTypeEnum.TSP]: 6,
    [UnitTypeEnum.TBSP]: 2,
    [UnitTypeEnum.CUP]: 0.125,
    [UnitTypeEnum.QUART]: 0.03125,
    [UnitTypeEnum.GAL]: 0.0078125,
  },
};

export function convertUnit(
  ingredient: {
    unitType: UnitTypeEnum;
    pricePerUnit: number;
  },
  desiredUnitType: UnitTypeEnum,
): { convertedUnitType: UnitTypeEnum; convertedPricePerUnit: number } {
  const { unitType, pricePerUnit } = ingredient;

  if(unitType === UnitTypeEnum.UNIT) {
    throw new Error(`Conversion for unitless quantity is not supported.`);
  }
  if (unitType === desiredUnitType) {
    return { convertedUnitType: desiredUnitType, convertedPricePerUnit: pricePerUnit };
  }

  const factor = conversionFactors[unitType]?.[desiredUnitType];
  if (!factor) {
    throw new Error(`Conversion from ${unitType} to ${desiredUnitType} is not supported.`);
  }

  const convertedPrice = pricePerUnit / factor;
  console.log(`Result: ${convertedPrice}/${desiredUnitType}`)
  return { convertedUnitType: desiredUnitType, convertedPricePerUnit: convertedPrice};
}


