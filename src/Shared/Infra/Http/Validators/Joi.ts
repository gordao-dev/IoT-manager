import { Joi } from 'celebrate';
import offsetPaginationConfig from '../../../Config/offsetPaginationConfig';

export const OptionalAnyString = Joi.string().lowercase();
export const RequiredAnyString = OptionalAnyString.required();

export const OptionalNumber = Joi.string();
export const RequiredNumber = OptionalNumber.required();

export const OptionalLimit = Joi.number().min(offsetPaginationConfig.minPage);
export const RequiredLimit = OptionalLimit.required;

export const OptionalPage = Joi.number().min(offsetPaginationConfig.minPage);
export const RequiredPage = OptionalPage.required;
