import { body } from 'express-validator';

const USER_ROLES = ['ADMIN', 'OPERATOR', 'USER'];

// role이 USER_ROLES 중 하나인지 확인
const isOneOfUserRoles = role => USER_ROLES.includes(role);

// roles Array에 포함 된 모든 role이 USER_ROLES 중 하나인지 확인
const areAllUserRoles = roles => roles.reduce((result, role) => result && isOneOfUserRoles(role), true);

const validation = [
  body('name')
    .notEmpty().bail()
    .isString().bail(),
  body('position')
    .notEmpty().bail()
    .isString().bail(),
  body('roles')
    .notEmpty().bail()
    .isArray().bail()
    .custom(areAllUserRoles).bail()
];

export default validation;